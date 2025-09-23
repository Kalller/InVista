import React, {useState, useEffect} from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FiltersOptions, QuestionsList, RecommendedQuestions } from './QuestionsPageComponents';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';


function QuestionsLayout (props) {
    const {questions, update, loggedIn, user} = props;

    const [companies, setCompanies] = useState([]);
    const [types, setTypes] = useState([]);
  
    const [companiesFilter, setCompaniesFilter] = useState([]);
    const [difficultiesFilter, setDifficultiesFilter] = useState([])
    const [typesFilter, setTypesFilter] = useState([]);
    const [searchText, setSearchText] = useState('')
    
    const [questionsNumber, setQuestionsNumber] = useState(0);

    useEffect(() => {
        const companies_set = new Set(questions.map(x => x.company));
        const types_set = new Set(questions.map(x => x.type));
        
        setCompanies([...companies_set]);
        //setCompaniesFilter([...companies_set]);
        setCompaniesFilter([])

        setTypes([...types_set]);
        //setArgumentsFilter([...arguments_set]);
        setTypesFilter([])

        setQuestionsNumber(questions.length);
    }, [update])

    const questionsToBeRecommended = questions.filter( x => (x.company === 'Microsoft' || x.company === 'Google') && (x.id!==1 && x.id!==2 && x.id!==3))

    return (<>
        { loggedIn && <Row className="justify-content-center dark-background" xs={12}>
            <Col xs={8} className="dark-background">
                {/*<h4 className='light-text'>Recommended questions</h4>
                <SlidingMenu tabs={studies}/>*/}
                <RecommendedQuestions list={questionsToBeRecommended} user={user}/>
                {/*<hr className="separator"/>*/}
            </Col>
        </Row>}
            
            
            
            <Row className="justify-content-center padding-top">
                <Col  xs={8} className='pagelayout_col'>
                    <div className="header-page text-white fs-1 mb-1" >
                    <i className="bi bi-journal-code" ></i>
                        Interview Questions
                        </div>
                        <hr className='separator'></hr>
                    <FiltersOptions companies={companies} types={types}
                        difficultiesFilter={difficultiesFilter} setDifficultiesFilter={setDifficultiesFilter}
                        companiesFilter={companiesFilter} setCompaniesFilter={setCompaniesFilter}
                        typesFilter={typesFilter} setTypesFilter={setTypesFilter}
                        searchText={searchText} setSearchText={setSearchText}
                        questionsNumber={questionsNumber}
                    />
                </Col>
            </Row>
            
            <Row className="justify-content-center">
                <Col xs={8}>
                    <QuestionsList questions={questions} difficultiesFilter={difficultiesFilter} companiesFilter={companiesFilter} searchText={searchText} typesFilter={typesFilter}/>
                </Col>
            </Row>
            
        </>);
}

export { QuestionsLayout };
