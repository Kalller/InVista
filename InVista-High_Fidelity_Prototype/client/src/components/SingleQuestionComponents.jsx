import React, { useState, useEffect } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Col, Dropdown, Row, Button } from 'react-bootstrap';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { Tabs, Tab } from '@mui/material';
import questionAPI from "../../apis/questionAPI";
import AceEditor from 'react-ace';
import { ExitConfirmationModal, SubmitConfirmationModal } from './UtilityComponents.jsx';
import Spinner from 'react-bootstrap/Spinner';
import CustomTabPanel from './CustomTabPanel.jsx';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-monokai';
import 'bootstrap/dist/css/bootstrap.min.css';

import BugReportForm from "./ReportComponent.jsx"; // Import BugReportForm


function QuestionButtons(props) {
  const [showExitConfirmation, setShowExitConfirmation] = useState(false);
  const [showSubmitConfirmation, setShowSubmitConfirmation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();


  const failResponsesCoding = [
    "Oh no, that's not quite right. Try again!",
    "Hmm, seems like there's a mistake. Give it another shot.",
    "Not quite there. Keep working on it!",
    "Nice try, but not the correct output. Give it another go.",
    "Oops, that's not the expected result. Try a different approach.",
  ];

  const failResponsesCaseStudies = [
    "Not quite the city we're looking for. Try again!",
    "Interesting guess, but that's not the correct city. Give it another try.",
    "Close, but not the right answer. Keep thinking!",
    "Hmm, that's not it. Try to identify the city based on the clues provided.",
    "Nice attempt, but not the correct historical city. Try again.",
  ];

  const failResponsesRiddles = [
    "Nice try, but that's not the right answer. Give it another shot!",
    "Interesting guess, but it's not the correct solution to the riddle. Try again.",
    "Hmm, that's not quite the silent messenger we're looking for. Think again!",
    "Not the right answer, but don't give up. Keep pondering the riddle.",
    "Oops, that's not the correct interpretation. Try to unravel the mystery.",
  ];

  const failResponsesGeneric = [
    "Oops, that's not the correct answer. Give it another try!",
    "Nice attempt, but it seems you missed the mark. Try again.",
    "Not quite there. Keep thinking, you'll get it!",
    "Hmm, that's an interesting response, but it's not the right one. Try another.",
    "It looks like we're not there yet. Keep working on it!",
  ];

  const getRandomFailResponse = (failResponses) => {
    const randomIndex = Math.floor(Math.random() * failResponses.length);
    return failResponses[randomIndex];
  };

  const handleShowExitConfirmation = () => {
    setShowExitConfirmation(true);
  };

  const handleCloseExitConfirmation = () => {
    setShowExitConfirmation(false);
  };



  const handleCloseSubmitModal = () => {
    setShowSubmitConfirmation(false);
  }

  const handleRUN = () => {
    //MOCKING RESULT
    let capturedOutput = '';
    const code = props.code.toLowerCase().replace(/^\s+|\s+$/g, '');;
    props.setRunned(true);
    switch (props.questionType) {
      case 'Coding':
        try {
          console.log()
          const originalLog = console.log;
          console.log = function (...value) {
            capturedOutput += value.join(' ') + '\n';
            return originalLog.apply(console, value);
          };
          const result = eval(props.code);

          console.log = originalLog;
          if (
            capturedOutput.trim().toLowerCase() === "hello world!" && props.questionID == 1
          ) {

            capturedOutput = capturedOutput.trim() + "\nGOOD JOB, THIS IS THE CORRECT CODE! YOU PASSED THE INTERVIEW QUESTION!\n";
            props.setStatus(2)
          } else if (props.questionID == 1) {
            capturedOutput =
              capturedOutput.trim() +
              `\n___________\n${getRandomFailResponse(failResponsesCoding)}\n`;
            props.setStatus(1);
          }
          else {
            capturedOutput =
              capturedOutput.trim() +
              `${getRandomFailResponse(failResponsesGeneric)}\n`;
            props.setStatus(1);
          }
          props.setOutput(capturedOutput.trim() || String(result).trim());
        } catch (error) {
          props.setOutput(`Error: ${error.message}`);

        }
        break;
      case 'Case Studies':

        if (
          code === "rome" && props.questionID == 2
        ) {
          capturedOutput = "GOOD JOB, YOU PASSED THE INTERVIEW QUESTION!\n";
          props.setStatus(2)
        } else if (props.questionID == 2) {
          capturedOutput =
            `${getRandomFailResponse(failResponsesCaseStudies)}\n`;
          props.setStatus(1);
        }
        else {
          capturedOutput =
            `${getRandomFailResponse(failResponsesGeneric)}\n`;
          props.setStatus(1);
        }
        props.setOutput(capturedOutput)
        break;
      case 'Riddles':
        if (
          code === "knowledge" && props.questionID == 3
        ) {
          capturedOutput = "GOOD JOB, YOU PASSED THE INTERVIEW QUESTION!\n";
          props.setStatus(2)
        } else if (props.questionID == 3) {
          capturedOutput =
            `${getRandomFailResponse(failResponsesRiddles)}\n`;
          props.setStatus(1);
        }
        else {
          capturedOutput =
            `${getRandomFailResponse(failResponsesGeneric)}\n`;
          props.setStatus(1);
        }
        props.setOutput(capturedOutput)
        break;
      default:
        break;
    }


  };

  const handleSubmitModal = async () => {
    console.log(props.runned)
    if (props.runned) {
      handleSUBMIT();

    } else {
      setShowSubmitConfirmation(true);
    }




  }

  const handleSUBMIT = async () => {
    try {
      setIsSubmitting(true);
      // Simulate submitting the form for 1 second
      setTimeout(async () => {
        const submission = await questionAPI.insertSubmission(props.questionID, 'invista', props.code, props.notes, props.status);
        props.setSubmittable(false);
        props.setCantLeave(false);
        props.setSubmitted(true);
        props.setRunned(false);
        setIsSubmitting(false); // Stop the spinner, whether successful or not
        console.log('Submission inserted successfully:', submission);
      }, 700);
    } catch (error) {

      console.error('Error inserting submission:', error);
    }
  };

  return (
    <Row className=" question-buttons py-2 mb-2">
      <div className="col-sm text-start">
        <Link className='btn main-button single-page-btn subclass' onClick={() => {

          if (!props.cantLeave) {
            navigate(-1);
          } else {
            handleShowExitConfirmation();
          }
        }}>
          <i class="bi bi-arrow-left-square-fill"></i>
          Back to
          {props.isQuestionPage ? " Questions" : " Reviews"}
        </Link>
      </div>
      <div className="col-sm text-center ">
        <Button onClick={handleRUN} className={`btn btn-dark action-btn me-1 ${!props.runnable && 'disabled'}`}>
          <i className="bi bi-play-fill "></i>
          RUN
        </Button>

        <Button onClick={handleSubmitModal} className={`btn action-btn ms-1 ${!props.submitted ? 'btn-dark' : 'btn-success'}  ${!props.submittable && 'disabled'}`}>
          <i className="bi bi-cloud-arrow-up-fill "></i>
          SUBMIT
        </Button>
        {isSubmitting && (
          <Spinner className="ms-2 align-top" animation="border" role="status" />
        )}
      </div>
      <div className="col-sm text-end">
        <BugReportForm />
      </div>

      <ExitConfirmationModal
        show={showExitConfirmation}
        onHide={handleCloseExitConfirmation}
        onConfirm={() => {
          navigate(-1)
          props.setCantLeave(false)
        }}
        onCancel={handleCloseExitConfirmation}
      />
      <SubmitConfirmationModal
        show={showSubmitConfirmation}
        onHide={handleCloseSubmitModal}
        onConfirm={() => {
          handleSUBMIT();
          handleCloseSubmitModal();
          props.setCantLeave(false);
        }}
        onCancel={handleCloseSubmitModal}
      />
    </Row>



  );
}


function LeftBox(props) {

  const question = props.question;
  const submissions = props.submissions;

  const [selectedButton, setSelectedButton] = useState('Description');
  const [selectedPastSubmission, setSelectedPastSubmission] = useState(!props.isQuestionPage && (submissions) ? submissions.find(submission => submission.id == props.subID) : null);
  const [showSubmissions, setShowSubmissions] = useState(selectedPastSubmission ? false : true);
  const [playGroundNotes, setplayGroundNotes] = useState(selectedPastSubmission ? (selectedPastSubmission.code ? 'PlayGround' : 'Notes') : 'PlayGround');




  const handlePastSubmissionClick = (submission) => {
    let icon;

    if (submission.status === 0) {
      icon = <i className="bi bi-clock text-primary ps-1" />;
    } else if (submission.status === 1) {
      icon = <i className="bi bi-x-circle text-danger ps-1" />;
    } else if (submission.status === 2) {
      icon = <i className="bi bi-check-circle text-success ps-1" />;
    }

    setplayGroundNotes(submission.code ? 'PlayGround' : 'Notes')
    const submissionWithIcon = { ...submission, icon };
    setSelectedPastSubmission(submissionWithIcon);
    setShowSubmissions(false);
  };
  const handleBackSubmissions = () => {
    setShowSubmissions(true)
    setplayGroundNotes('Notes')
  }

  const handlePlayGroundNotes = (buttonName) => {
    setplayGroundNotes(buttonName)
  }

  return (
    <div className='card question-box '>
      <div className='card-header'>
      <Tabs
          value={0}
          TabIndicatorProps={{
            style: {
              backgroundColor: "#3f50b5"
            }
          }}
        >
          
          <Tab label={<div style={{ color: "#3f50b5" }}><i class="bi bi-blockquote-left"></i>Description</div>} disabled />
        </Tabs>
        <CustomTabPanel value={0} index={0}/>


      </div>
      <div className='card-body '>
        {question && selectedButton == 'Description' ? (
          <>
            <h1 className='mb-2 question-title'>{question.id + "." + question.title}</h1>
            <span className="badge bg-primary  mx-1 rounded-pill">{question.company}</span>
            <span className="badge bg-secondary mx-1 rounded-pill">{question.type}</span>
            <span className={`badge mx-1 rounded-pill ${question.difficulty === 'Easy' ? 'bg-success' : (question.difficulty === 'Medium' ? 'bg-warning' : 'bg-danger')}`}>
              {question.difficulty}
            </span>

            <p className='mt-3'>
              <a>{question.description}</a>
            </p>
          </>

        ) : (
          submissions && selectedButton == 'Submissions' ? (
            showSubmissions ?
              <>
                <ol className="list-group list-group-numbered ">
                  {submissions.map((submission, index) => (
                    <Button key={index} className="list-group-item question-submission-list btn-outline-light d-flex justify-content-between align-items-start" onClick={() => handlePastSubmissionClick(submission)}>
                      <div className="ms-2 me-auto">
                        <div className="fw-bold ">
                          {submission.timestamp}
                          {submission.status === 0 ? <i className="bi bi-clock text-primary ps-1" /> : <></>}
                          {submission.status === 1 ? <i class="bi bi-x-circle text-danger ps-1"></i> : <></>}
                          {submission.status === 2 ? <i class="bi bi-check-circletext-success ps-1"></i> : <></>}

                        </div>
                      </div>
                      {submission.code ? <span className="badge bg-secondary mx-1 rounded-pill">PlayGround</span> : <></>}
                      {submission.notes ? <span className="badge bg-secondary mx-1 rounded-pill">Notes</span> : <></>}
                    </Button>
                  ))}
                </ol>
              </>
              :
              <Row className='align-items-center'>
                <Button
                  type="button"
                  className={`btn btn-light btn-sm col-auto me-auto`}
                  onClick={() => handleBackSubmissions()}
                >
                  <i className="bi bi-card-list"></i> All Submissions
                </Button>

                <div className='col-auto me-auto fs-6 '>
                  {selectedPastSubmission.timestamp}
                  {selectedPastSubmission.icon}
                </div>

                {selectedPastSubmission.code && <Button
                  type="button"
                  className={`btn btn-light ${playGroundNotes === 'PlayGround' ? 'active' : ''} ${!selectedPastSubmission.notes && 'disabled'} btn-sm col-auto`}
                  onClick={() => handlePlayGroundNotes('PlayGround')}
                >
                  {props.questionType === 'Coding' ? 'Code' : 'Answer'}
                </Button>}
                {selectedPastSubmission.notes &&
                  <Button
                    type="button"
                    className={`btn btn-light ${playGroundNotes === 'Notes' ? 'active' : ''} ${!selectedPastSubmission.code && 'disabled'} me-1 btn-sm col-auto `}
                    onClick={() => handlePlayGroundNotes('Notes')}
                  >
                    Notes
                  </Button>}


                <hr className="mt-1"></hr>

                {playGroundNotes == 'Notes' ?
                  <text>{selectedPastSubmission.notes}</text>
                  :
                  <pre style={{ whiteSpace: 'pre-wrap' }}>{selectedPastSubmission.code}</pre>
                }
              </Row>
          ) : (
            <p>Loading...</p>
          )
        )}
      </div>
    </div>
  );
}

function RightBox(props) {
  const [selectedButton, setSelectedButton] = useState('PlayGround');
  const [selectedPastSubmission, setSelectedPastSubmission] = useState(props.submissions ? props.submissions.find(submission => submission.id == props.subID) : null);

  const [editorKey, setEditorKey] = useState(Date.now());
  const [notes, setNotes] = useState(!props.isQuestionPage && selectedPastSubmission.notes ? selectedPastSubmission.notes : '');
  const [code, setCode] = useState({
    'JS': (!props.isQuestionPage ? selectedPastSubmission.code : '//write your code here'),
    'Python': (!props.isQuestionPage ? selectedPastSubmission.code : '#write your code here')
  });
  const [answer, setAnswer] = useState('')
  const [language, setLanguage] = useState('JS');
  const [isConsoleVisible, setIsConsoleVisible] = useState(false);
  const [activeTab, setActiveTab] = useState(0); // State to track the active tab



const handleButtonClick = (event, newValue) => {
  console.log(newValue); // Debugging line
  if (newValue === 0) {
    setSelectedButton('PlayGround');
  } else {
    setSelectedButton('Notes');
  }
  setEditorKey(Date.now());
  setActiveTab(newValue);
};


  const handleButtonLanguage = (buttonName) => {
    setLanguage(buttonName);
  };

  const handleNotesChange = (event) => {
    const newNotes = event.target.value;
    setNotes(newNotes);
    props.setNotes(newNotes);
    props.setSubmittable(true);
    props.setCantLeave(true);
    props.setSubmitted(false);
  };

  const handleAnswerChange = (event) => {
    const newAnswer = event.target.value;
    setAnswer(newAnswer);
    props.setCode(newAnswer);
    props.setRunnable(true);
    props.setSubmittable(true);
    props.setCantLeave(true);
    props.setSubmitted(false);
  };

  const handleCodeChange = (newCode) => {
    setCode((prevCode) => {
      const updatedCode = {
        ...prevCode,
        [language]: newCode
      };
      props.setCode(updatedCode[language]);
      props.setRunnable(true);
      props.setSubmittable(true);
      props.setCantLeave(true);
      props.setSubmitted(false);

      return updatedCode;
    });
  };

  const handleConsoleClick = (console) => {
    setIsConsoleVisible(console)
  }

  useEffect(() => {
    setIsConsoleVisible(true);

  }, [props.output]);

  return (
    <div className='card question-box'>
      <div className='card-header'>

      <Tabs
  value={activeTab}
  onChange={handleButtonClick}
  TabIndicatorProps={{
    style: {
      backgroundColor: "#3f50b5"
    }
  }}
>
  {props.questionType === 'Coding' ?
    <Tab label={<div style={{ color: "#3f50b5" }}><i className="bi bi-code-slash"></i>Code</div>} />
    :
    <Tab label={<div style={{ color: "#3f50b5" }}><i className="bi bi-pen"></i>Answer</div>} />
  }
  <Tab label={<div style={{ color: "#3f50b5" }}><i className="bi bi-sticky"></i>Notes</div>} />
</Tabs>

        <CustomTabPanel value={activeTab} index={0}>
        </CustomTabPanel>
        <CustomTabPanel value={activeTab} index={1}>

        </CustomTabPanel>



      </div>
      <div className='card-body'>
        {selectedButton === 'PlayGround' ? (
          <>
            {props.questionType === 'Coding' ?
              <>
                <Dropdown className='pb-2'>
                  <Dropdown.Toggle  className="main-button single-page-btn text-end">
                    <text className='float-start'>{language}</text>
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => handleButtonLanguage('JS')}>
                      JS {language === 'JS' && <i className="bi bi-check2 text-success"></i>}
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handleButtonLanguage('Python')} disabled>
                      Python {language === 'Python' && <i className="bi bi-check2 text-success "></i>}
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handleButtonLanguage('Python')} disabled>
                      C {language === 'Python' && <i className="bi bi-check2 text-success "></i>}
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handleButtonLanguage('Python')} disabled>
                      C++ {language === 'Python' && <i className="bi bi-check2 text-success "></i>}
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handleButtonLanguage('Python')} disabled>
                      Java {language === 'Python' && <i className="bi bi-check2 text-success "></i>}
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <AceEditor
                  key={editorKey}
                  mode={language === 'JS' ? 'javascript' : 'python'}
                  theme="monokai"
                  onChange={handleCodeChange}
                  name="editor"
                  fontSize='1.35vw'
                  showPrintMargin={true}
                  showGutter={true}
                  highlightActiveLine={true}
                  
                  value={code[language]}
                  width="100%"
                  height={isConsoleVisible ? "60.8%" : "80.8%"}
                />
              </> :
              <textarea
                style={{ width: '100%', height: isConsoleVisible ? '68%' : '88%', fontSize: '1.35vw', resize: 'none' }}
                className="form-control"
                rows='8'
                height='inerit'

                placeholder="Write your answer here..."
                value={answer}
                onChange={handleAnswerChange}
              ></textarea>

            }
            <div className='console' style={isConsoleVisible ? { height: '27%', overflowY:'auto' } : {}}>
              <div onClick={() => handleConsoleClick(!isConsoleVisible)}>
                INVISTA OUTPUT
                <i className={`bi ${isConsoleVisible ? "bi-chevron-down" : "bi-chevron-up"} float-end`}></i>
              </div>
              <hr className=" mt-1"></hr>
              {isConsoleVisible && (
                <>

                  <pre style={{ whiteSpace: 'pre-wrap' }} >{props.output}</pre>

                </>)}
            </div>
          </>
        ) : (
          <textarea
            style={{ width: '100%', height: '99%', fontSize: '1.35vw', resize: 'none' }}
            className="form-control"
            rows='10'
            placeholder="Write your notes here..."
            value={notes}
            onChange={handleNotesChange}
          ></textarea>
        )}
      </div>
    </div>
  );
}

function SingleQuestion(props) {
  const params = useParams();
  const location = useLocation();
  const currentURL = location.pathname;

  const [loading, setLoading] = useState(true);
  const [isQuestionPage, setisQuestionPage] = useState(currentURL.includes("/questions") ? true : false);
  const [subID] = useState(isQuestionPage ? null : params.subid);
  const [question, setQuestion] = useState(null);
  const [questionType, setQuestionType] = useState(null);
  const [submissions, setSubmissions] = useState(null);
  const [code, setCode] = useState('');
  const [notes, setNotes] = useState('');
  const [output, setOutput] = useState('');
  const [runnable, setRunnable] = useState(false);
  const [submittable, setSubmittable] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [runned, setRunned] = useState(false);
  const [status, setStatus] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedQuestion = await questionAPI.getQuestionById(params.id);
        const fetchedSubmissions = await questionAPI.getSubmissionsByQuestionAndUsername(params.id, props.user.username);

        setQuestion(fetchedQuestion);
        setQuestionType(fetchedQuestion.type);
        setSubmissions(fetchedSubmissions);
        setLoading(false);  // Imposta lo stato di caricamento a false quando i dati sono stati ottenuti
      } catch (error) {
        console.error('Error', error);
        setLoading(false);  // Gestisci il caso di errore impostando comunque lo stato di caricamento a false
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;  // Puoi personalizzare il messaggio di caricamento se necessario
  }

  return (
    <div className='mb-2'>
      <div className="mx-4">
        <QuestionButtons

          code={code}
          notes={notes}
          setOutput={setOutput}
          status={status}
          setStatus={setStatus}
          questionType={questionType}
          questionID={params.id}
          runnable={runnable}
          submittable={submittable}
          setCantLeave={props.setCantLeave}
          cantLeave={props.cantLeave}
          setSubmittable={setSubmittable}
          submitted={submitted}
          setSubmitted={setSubmitted}
          runned={runned}
          setRunned={setRunned}
          isQuestionPage={isQuestionPage}
        />
      </div>
      <Row className="mx-auto">
        <Col className="pe-1">
          <LeftBox
            isQuestionPage={isQuestionPage}
            question={question}
            submissions={submissions}
            user={props.user}
            subID={subID}
            questionType={questionType}
          />
        </Col>
        <Col className="ps-1">
          <RightBox
            questionType={questionType}
            setCode={setCode}
            setCantLeave={props.setCantLeave}
            cantLeave={props.cantLeave}
            setNotes={setNotes}
            submissions={submissions}
            subID={subID}
            output={output}
            isQuestionPage={isQuestionPage}
            setRunnable={setRunnable}
            setSubmittable={setSubmittable}
            setSubmitted={setSubmitted}
            setRunned={setRunned}
          />
        </Col>
      </Row>
    </div>
  );
}
export default SingleQuestion;
