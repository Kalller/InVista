
import { useState, useEffect } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Row, Col, Container, Card, Button } from 'react-bootstrap';
import { Bar, Line } from 'react-chartjs-2';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import CustomTabPanel from './CustomTabPanel'; // Import the TabPanel component you just created
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import SubmissionsTable from "./SubmissionsTableComponents.jsx";
import logo from '../images/faro-2.png';


import questionAPI from '../../apis/questionAPI.js';
import Stats from './Stats.jsx';


function Reviews(props) {
    const [submissions, setSubmissions] = useState([]);
    const [activeTab, setActiveTab] = useState(0); // State to track the active tab

    useEffect(() => {
        const getSubmissions = async () => {
            try {
                const submissionsData = await questionAPI.getSubmissionsForReviews();
                const allQuestions = await questionAPI.getAllQuestions();
                // Map through each submission to enrich it with question details from props.questions
                const enrichedSubmissions = submissionsData.map(submission => {
                    // Find the question in props.questions that matches this submission's question_id
                    const questionDetails = allQuestions.find(question => question.id === submission.question_id);
                    // Return a new object that merges the details from both the question and the submission
                    return { ...questionDetails, ...submission };
                });

                setSubmissions(enrichedSubmissions);
            } catch (e) {
                console.error(e);
            }
        };

        getSubmissions();
    }, []);

    const handleChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    return (
        <>
            <Row className="justify-content-center dark-background">
                <Col xs={8} className="dark-background">
                    <RecommendedStudies list={submissions.filter(item => item.status === 1)} />
                </Col>
            </Row>

            <Row className="justify-content-center padding-top">
                <Col xs={8} className="reviews_col">
                    <div className="header-page text-white fs-1 mb-1">
                        <i className="bi bi-clipboard-data"></i>
                        Your Progress
                    </div>
                   <hr className='separator'></hr>
                    <Tabs
                        value={activeTab}
                        onChange={handleChange}
                    > 
                        <Tab label="Submissions" />
                        <Tab label="Statistics" />
                    </Tabs>
                    
                    
                    <CustomTabPanel value={activeTab} index={0}>
                        <SubmissionsTable submissions={submissions}></SubmissionsTable>
                    </CustomTabPanel>
                    <CustomTabPanel value={activeTab} index={1}>
                        <Stats submissions={submissions}></Stats>
                    </CustomTabPanel>
                </Col>
            </Row>
        </>
    );
}


function RecommendedStudies(props) {
    const list = [{ 'id': 1, 'title': '"How to print on JS console" by Mozilla Developer' }, { 'id': 2, 'title': 'The Roman Empire Engineering by Wikipedia' }, { 'id': 3, 'title': 'Puzzle Interviews by Indeed.com' }]


    const [swiperInstance, setSwiperInstance] = useState(null);
    const [isPlaying, setIsPlaying] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        // calling slideNext every 2 seconds
        const intervalId = setInterval(() => {
            if (isPlaying && swiperInstance) {
                swiperInstance.slideNext();
                setCurrentIndex((prevIndex) => (prevIndex + 1) % list.length)
            }
        }, 3000);

        const restartId = setInterval(() => {
            if (!isPlaying && swiperInstance) {
                setIsPlaying(true)
            }
        }, 10000)

        // Pulisci l'intervallo quando il componente viene smontato
        return () => {
            clearInterval(intervalId);
            clearInterval(restartId)
        }
    }, [isPlaying, swiperInstance]);

    const handleSliding = (direction) => {
        setIsPlaying(false)

        if (direction === "prev") {
            swiperInstance.slidePrev()
            setCurrentIndex((prevIndex) => prevIndex > 0 ? prevIndex - 1 : list.length - 1)

        } else if (direction === "next") {
            swiperInstance.slideNext()
            setCurrentIndex((prevIndex) => (prevIndex + 1) % list.length)
        }
    }

    const selectStudy = (id) => {
        switch (id) {
            case 1:
                window.location.href = "https://developer.mozilla.org/en-US/docs/Web/API/console/log_static"
                break;
            case 2:
                window.location.href = "https://en.wikipedia.org/wiki/Ancient_Roman_engineering"
                break;
            case 3:
                window.location.href = "https://www.indeed.com/career-advice/interviewing/puzzle-interview-questions"
                break;
            default:
                window.location.href = "http://localhost:5173/questions"

                break;
        }
    }

    return (<div className='recommended-section'>
        <div className='bubble'>
            <div className='bubble-message'> I analysed your recent submissions and I think you should study these topics:
            </div>

            <Row>
                <Col xs={3} />
                <Col xs={6}>
                    <Swiper
                        onSwiper={(swiper) => setSwiperInstance(swiper)}
                        slidesPerView={1}
                        spaceBetween={10}
                        loop={true}
                    >
                        {list.map((x, index) => (
                            <SwiperSlide key={index}>
                                <Button variant="recommended-question" className="recommended-question" onClick={() => selectStudy(x.id)}>{x.title}</Button>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </Col>
                <Col xs={3} />
            </Row>
            <Row className="slider-controller">
                <Col className='justify-content-center' xs={4}>
                    <i className="bi bi-caret-left-fill slider-arrow" onClick={() => handleSliding("prev")}></i>
                    {currentIndex + 1}/{list.length}
                    <i className="bi bi-caret-right-fill slider-arrow" onClick={() => handleSliding("next")}></i>
                </Col>
            </Row>
        </div>
        <Row className='justify-content-center'>
            <Col xs={6} className="avatar-container d-flex justify-content-center">
                <img src={logo} className="avatar-IMG" alt="Avatar" />
            </Col>
        </Row>
    </div>)
}



export default Reviews;
