import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Form, Dropdown, Pagination, Badge, Table } from 'react-bootstrap';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useNavigate } from "react-router-dom";
import '../App.css';
import 'swiper/css';
import logo from '../images/faro-2.png';


function FiltersOptions(props) {
    const { companies, difficultiesFilter, setDifficultiesFilter, companiesFilter, setCompaniesFilter, searchText, setSearchText, questionsNumber, types, typesFilter, setTypesFilter } = props;
    const navigate = useNavigate();
    const difficulties = ['Easy', 'Medium', 'Hard'];
    const [searchFilterText, setSearchFilterText] = useState('');

    // the search filter is applied after 1 second
    useEffect(() => {
        const timer = setTimeout(() => {
            setSearchText(searchFilterText.trim());
        }, 1000);

        // Clear the timer if searchFilterText changes before 1 second pass
        return () => clearTimeout(timer);
    }, [searchFilterText]);

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            setSearchText(searchFilterText.trim()); // Imposta searchText solo quando premi Enter
        }
    };

    const handleDifficulty = (difficulty) => {
        if (difficultiesFilter.includes(difficulty))
            setDifficultiesFilter(difficultiesFilter.filter(x => x !== difficulty))
        else
            setDifficultiesFilter([...difficultiesFilter, difficulty])
    }

    const handleCompanyFilter = (company) => {
        if (companiesFilter.includes(company))
            setCompaniesFilter(companiesFilter.filter(x => x !== company))
        else
            setCompaniesFilter([...companiesFilter, company])
    }

    const handleTypeFilter = (type) => {
        if (typesFilter.includes(type))
            setTypesFilter(typesFilter.filter(x => x !== type))
        else
            setTypesFilter([...typesFilter, type])
    }

    const handleRandomQuestion = () => {
        const questionId = Math.floor(Math.random() * questionsNumber);
        navigate(`/questions/${questionId}`);
    }

    const removeCompanyFilter = (company) => {
        setCompaniesFilter(companiesFilter.filter(x => x !== company))
    }

    const removeTypeFilter = (type) => {
        setTypesFilter(typesFilter.filter(x => x !== type))
    }

    const removeDifficultyFilter = (difficulty) => {
        setDifficultiesFilter(difficultiesFilter.filter(x => x !== difficulty))
    }



    return (

        <>
            <Row className="row_filters" >

                <Col className="col_filters search_bar">
                    <Form>
                        <Form.Group>
                            <Form.Control
                                type="search"
                                placeholder="Search questions"
                                value={searchFilterText}
                                onChange={(ev) => {
                                    const newText = ev.target.value;
                                    setSearchFilterText(newText);
                                    if (newText.trim() === '') { // Se il testo è vuoto (o contiene solo spazi), mostra tutti i risultati
                                        setSearchText('');
                                    }
                                }}
                                onKeyDown={handleKeyDown}
                            />
                        </Form.Group>
                    </Form>
                </Col>


                <Col className="col_filters">
                    <Dropdown autoClose="outside" style={{ width: '100%' }}>
                        <Dropdown.Toggle id="dropdown-custom" align={{ lg: 'start' }} className="main-button">
                            Difficulty
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            {difficulties.map((x, i) => (
                                <Dropdown.Item key={i} onClick={() => handleDifficulty(x)}>
                                    <Row className="dropdown_item_row">
                                        <Col className="dropdown_item_col">
                                            {x === 'Easy' && <p className="d-inline text-success">{x}</p>}
                                            {x === 'Medium' && <p className="d-inline text-warning">{x}</p>}
                                            {x === 'Hard' && <p className="d-inline text-danger">{x}</p>}
                                        </Col>
                                        <Col className="dropdown_item_col">
                                            {difficultiesFilter.includes(x) && <i className="bi bi-check-lg filters-check" />}
                                        </Col>
                                    </Row>
                                </Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
                <Col className="col_filters">
                    <Dropdown autoClose="outside" >
                        <Dropdown.Toggle id="dropdown-custom" className="main-button">
                            Company
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            {companies.map((x, i) => (
                                <Dropdown.Item key={i} onClick={() => handleCompanyFilter(x)}>
                                    <Row className="dropdown_item_row">
                                        <Col className="dropdown_item_col">
                                            <p className="d-inline">{x}</p></Col>
                                        <Col className="dropdown_item_col">
                                            {companiesFilter.includes(x) && <i className="bi bi-check-lg filters-check" />}
                                        </Col>
                                    </Row>
                                </Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
                <Col className="col_filters">
                    <Dropdown autoClose="outside" >
                        <Dropdown.Toggle id="dropdown-custom" className="main-button">
                            Type
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            {types.map((x, i) => (
                                <Dropdown.Item key={i} onClick={() => handleTypeFilter(x)}>
                                    <Row className="dropdown_item_row">
                                        <Col className="dropdown_item_col">
                                            <p className="d-inline">{x}</p></Col>
                                        <Col className="dropdown_item_col">
                                            {typesFilter.includes(x) && <i className="bi bi-check-lg filters-check" />}
                                        </Col>
                                    </Row>
                                </Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
                <Col className="col_filters last_button" >
                    <Button className="rounded-pill d-flex main-button" onClick={handleRandomQuestion}><i className="bi bi-shuffle spaced" />Random</Button>
                </Col>
            </Row>

            {(companiesFilter.length !== 0 || typesFilter.length !== 0 || difficultiesFilter.length !== 0 || searchText !== '') &&
                <Row className="row_filters_badges">
                    <Col md={10} className="col_filters_badges">
                       
                        <Row className='tuta_gold'>

                            {companiesFilter.map((x, i) => (

                                <Badge key={i} bg="secondary" pill className="filter-button custom-badge">
                                    <Row className="align-items-center text-center g-0"> {/* g-0 rimuove lo spazio tra le colonne */}
                                        <Col xs="auto" className="pe-1">{x}</Col> {/* pe-1 riduce il padding a destra */}
                                        <Col xs="auto">
                                            <i className="bi bi-x-lg" onClick={() => removeCompanyFilter(x)}></i>
                                        </Col>
                                    </Row>
                                </Badge>

                            ))}
                            {typesFilter.map((x, i) => (

                                <Badge key={i} bg="secondary" pill className="filter-button custom-badge">
                                    <Row className="align-items-center text-center">
                                        <Col xs="auto" className="pe-2">{x}</Col>
                                        <Col xs="auto">
                                            <i className="bi bi-x-lg" onClick={() => removeTypeFilter(x)}></i>
                                        </Col>
                                    </Row>
                                </Badge>

                            ))}
                            {difficultiesFilter.map((x, i) => (

                                <Badge key={i} bg="secondary" pill className="filter-button custom-badge">
                                    <Row className="align-items-center text-center">
                                        <Col xs="auto" className="pe-2">{x}</Col>
                                        <Col xs="auto">
                                            <i className="bi bi-x-lg" onClick={() => removeDifficultyFilter(x)}></i>
                                        </Col>
                                    </Row>
                                </Badge>

                            ))}
                            {searchText !== '' &&

                                <Badge bg="secondary" pill className="filter-button custom-badge">
                                    <Row className="align-items-center text-center">
                                        <Col xs="auto" className="pe-2">{searchText}</Col>
                                        <Col xs="auto">
                                            <i className="bi bi-x-lg" onClick={() => { setSearchText(''); setSearchFilterText(''); }}></i>
                                        </Col>
                                    </Row>
                                </Badge>

                            }






                        </Row>
                    </Col>
                    {/*<Col md={2} className="d-flex justify-content-center align-items-center">*/}
                    <Col className="questions_col_filters_badges px-0">
                        <Button variant="secondary" className="float-end" onClick={() => { setCompaniesFilter([]); setTypesFilter([]); setDifficultiesFilter([]); setSearchText(''); setSearchFilterText(''); }}><i class="bi bi-trash3"></i> Reset</Button>
                    </Col>
                </Row>
            }



        </>)
}

function QuestionsList(props) {
    const { questions, difficultiesFilter, companiesFilter, searchText, typesFilter } = props;
    const navigate = useNavigate();

    const [sorted, setSorted] = useState('none');
    const [sortIconTitle, setSortIconTitle] = useState('↕');
    const [sortIconCompany, setSortIconCompany] = useState('↕');
    const [sortIconDifficulty, setSortIconDifficulty] = useState('↕');
    const [sortIconType, setSortIconType] = useState('↕');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    const sortByTitle = () => {
        if (sorted === 'upTitle') {
            setSorted('downTitle');
            setSortIconTitle('↓');
            setSortIconCompany('↕');
            setSortIconDifficulty('↕');
            setSortIconType('↕');
        } else if (sorted === 'downTitle') {
            setSorted('none');
            setSortIconTitle('↕');
        } else {
            setSorted('upTitle');
            setSortIconTitle('↑');
            setSortIconCompany('↕');
            setSortIconDifficulty('↕');
            setSortIconType('↕');
        }
    }

    const sortByCompany = () => {
        if (sorted === 'upCompany') {
            setSorted('downCompany');
            setSortIconCompany('↓');
            setSortIconTitle('↕');
            setSortIconDifficulty('↕');
            setSortIconType('↕');
        } else if (sorted === 'downCompany') {
            setSorted('none');
            setSortIconCompany('↕');
        } else {
            setSorted('upCompany');
            setSortIconCompany('↑');
            setSortIconTitle('↕');
            setSortIconDifficulty('↕');
            setSortIconType('↕');
        }
    }

    const sortByDifficulty = () => {
        if (sorted === 'upDifficulty') {
            setSorted('downDifficulty');
            setSortIconDifficulty('↓');
            setSortIconCompany('↕');
            setSortIconTitle('↕');
            setSortIconType('↕');
        } else if (sorted === 'downDifficulty') {
            setSorted('none');
            setSortIconDifficulty('↕');
        } else {
            setSorted('upDifficulty');
            setSortIconDifficulty('↑');
            setSortIconCompany('↕');
            setSortIconTitle('↕');
            setSortIconType('↕');
        }
    }

    const sortByType = () => {
        if (sorted === 'upType') {
            setSorted('downType');
            setSortIconType('↓');
            setSortIconCompany('↕');
            setSortIconTitle('↕');
            setSortIconDifficulty('↕');
        } else if (sorted === 'downType') {
            setSorted('none');
            setSortIconType('↕');
        } else {
            setSorted('upType');
            setSortIconType('↑');
            setSortIconCompany('↕');
            setSortIconTitle('↕');
            setSortIconDifficulty('↕');
        }
    }

    const selectQuestion = (questionId) => {
        navigate(`/questions/${questionId}`);
    }

    const difficultySort = (a, b) => {
        const difficultyOrder = { "Hard": 3, "Medium": 2, "Easy": 1 };
        const difficultyA = difficultyOrder[a.difficulty];
        const difficultyB = difficultyOrder[b.difficulty];

        if (difficultyA > difficultyB) {
            return 1;
        } else if (difficultyA < difficultyB) {
            return -1;
        } else {
            return 0;
        }
    }
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    useEffect(() => {
        // Whenever a filter state changes: reset the currentPage
        setCurrentPage(1);
    }, [difficultiesFilter, companiesFilter, typesFilter, searchText]);

    return (

        <>
            <Row className="questions_row_table">
                <>
                    <Table className="container_table">
                        <thead>
                        <tr>
                            <th onClick={sortByTitle} className="questions-title-header">
                                <text className='float-start'>Title</text> <span className="float-end">{
                                    sortIconTitle === '↑' ? <i className="bi bi-arrow-up-short"></i> :
                                        sortIconTitle === '↓' ? <i className="bi bi-arrow-down-short"></i> :
                                            <i className="bi bi-arrows-vertical"></i>}</span>
                            </th>
                            <th className='table-header-center' onClick={sortByCompany}>
                                Company
                                <span className="float-end">{
                                    sortIconCompany === '↑' ? <i className="bi bi-arrow-up-short"></i> :
                                        sortIconCompany === '↓' ? <i className="bi bi-arrow-down-short"></i> :
                                            <i className="bi bi-arrows-vertical"></i>}</span>
                            </th>
                            <th className='table-header-center' onClick={sortByType}>
                                Type <span className="float-end">{
                                    sortIconType === '↑' ? <i className="bi bi-arrow-up-short"></i> :
                                        sortIconType === '↓' ? <i className="bi bi-arrow-down-short"></i> :
                                            <i className="bi bi-arrows-vertical"></i>}</span>
                            </th>
                            <th className='table-header-center' onClick={sortByDifficulty}>
                                Difficulty <span className="float-end">{
                                    sortIconDifficulty === '↑' ? <i className="bi bi-arrow-up-short"></i> :
                                        sortIconDifficulty === '↓' ? <i className="bi bi-arrow-down-short"></i> :
                                            <i className="bi bi-arrows-vertical"></i>}</span>
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                            {questions
                                .filter((x) => {
                                    if ((difficultiesFilter.length !== 0 ? difficultiesFilter.includes(x.difficulty) : true) && (companiesFilter.length !== 0 ? companiesFilter.includes(x.company) : true) && (typesFilter.length !== 0 ? typesFilter.includes(x.type) : true) && x.title.toLowerCase().includes(searchText.toLowerCase()))
                                        return x;
                                })

                                .sort((a, b) => {
                                    if (sorted === 'downTitle')
                                        return b.title.toLowerCase().localeCompare(a.title.toLowerCase());
                                    else if (sorted === 'upTitle')
                                        return a.title.toLowerCase().localeCompare(b.title.toLowerCase());
                                    else if (sorted === 'downCompany')
                                        return b.company.toLowerCase().localeCompare(a.company.toLowerCase());
                                    else if (sorted === 'upCompany')
                                        return a.company.toLowerCase().localeCompare(b.company.toLowerCase());
                                    else if (sorted === 'downDifficulty')
                                        return difficultySort(b, a);
                                    else if (sorted === 'upDifficulty')
                                        return difficultySort(a, b);
                                    else if (sorted === 'downType')
                                        return b.type.toLowerCase().localeCompare(a.type.toLowerCase());
                                    else if (sorted === 'upType')
                                        return a.type.toLowerCase().localeCompare(b.type.toLowerCase());
                                })
                                .slice(indexOfFirstItem, indexOfLastItem)
                                .map((x) => (
                                    <tr key={x.id} className="questions_table_tr" onClick={() => selectQuestion(x.id)}>
                                        <td className="title-table-data">{x.title}</td>
                                        <td className="table-center-data">{x.company}</td>
                                        <td className="table-center-data">{x.type}</td>
                                        <td className="table-center-data">
                                            {x.difficulty === 'Easy' && <Badge bg={"success"}>{x.difficulty}</Badge>}
                                            {x.difficulty === 'Medium' && <Badge bg={"warning"}>{x.difficulty}</Badge>}
                                            {x.difficulty === 'Hard' && <Badge bg={"danger"}>{x.difficulty}</Badge>}
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                        {questions
                            .filter((x) => {
                                if ((companiesFilter.length !== 0 ? companiesFilter.includes(x.company) : true) && (difficultiesFilter.length !== 0 ? difficultiesFilter.includes(x.difficulty) : true) && (typesFilter.length !== 0 ? typesFilter.includes(x.type) : true) && x.title.toLowerCase().includes(searchText.toLowerCase()))
                                    return x;
                            })
                            .length == 0 && (
                                <tbody>
                                    <tr>
                                        <td colSpan="4" style={{ backgroundColor: 'white', textAlign: 'center' }}>
                                            <div style={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                height: '350px',
                                            }}>
                                                <i className="bi bi-exclamation-circle" style={{ fontSize: '2rem', marginBottom: '1rem' }}></i>
                                                <span>No matching questions found</span>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            )}
                    </Table>
                </>
            </Row>

            <Pagination className="justify-content-center">
                {[...Array(Math.ceil((questions
                    .filter((x) => {
                        if ((difficultiesFilter.length !== 0 ? difficultiesFilter.includes(x.difficulty) : true) && (companiesFilter.length !== 0 ? companiesFilter.includes(x.company) : true) && (typesFilter.length !== 0 ? typesFilter.includes(x.type) : true) && x.title.toLowerCase().includes(searchText.toLowerCase()))
                            return x;
                    })
                    .length) / itemsPerPage)).keys()].map(number => (
                        <Pagination.Item key={number + 1} active={number + 1 === currentPage} onClick={() => paginate(number + 1)}>
                            {number + 1}
                        </Pagination.Item>
                    ))}
            </Pagination>
        </>

    )
}


function RecommendedQuestions(props) {
    const { list, user } = props;
    const navigate = useNavigate();

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

    const selectQuestion = (questionId) => {
        navigate(`/questions/${questionId}`);
    }

    return (
        <div className='recommended-section align-items-center'>
            <div className='bubble'>
                <div className='bubble-message'> I suggest you to try with these questions!
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
                                    <Button variant="recommended-question" className="recommended-question" onClick={() => selectQuestion(x.id)}>{x.title}</Button>
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
        </div>
    )
}

export { FiltersOptions, QuestionsList, RecommendedQuestions };