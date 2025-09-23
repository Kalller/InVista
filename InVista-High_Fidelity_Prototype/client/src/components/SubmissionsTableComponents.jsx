import { useState, useEffect } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Row, Col, Button, Form, Dropdown, Container, Table, Badge, DropdownToggle, DropdownMenu, OverlayTrigger, Tooltip, Pagination } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);


function SubmissionsTable(props) {


    const [sortedByTitle, setSortedByTitle] = useState('');
    const [sortedByDifficulty, setSortedByDifficulty] = useState('');
    const [sortedByStatus, setSortedByStatus] = useState('');
    const [sortedByDate, setSortedByDate] = useState('desc');

    const [sortedByCompany, setSortedByCompany] = useState('');
    const [sortedByType, setSortedByType] = useState('');



    const [filteredByDifficulty, setFilteredByDifficulty] = useState([]);
    const [filteredByStatus, setFilteredByStatus] = useState([]);

    const [filteredByCompany, setFilteredByCompany] = useState([]);
    const [filteredByType, setFilteredByType] = useState([]);


    const [searchText, setSearchText] = useState('');
    const [searchFilterText, setSearchFilterText] = useState('');

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);




    const paginate = (pageNumber) => setCurrentPage(pageNumber);

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

    const sortedSubmissions = [...props.submissions].filter(submission => {
        // Logica per mostrare tutti i risultati quando searchText è vuoto
        //        if (!searchText) return true; // Mostra tutti i risultati se la search bar è vuota

        const filterByDifficultyCondition = filteredByDifficulty.length !== 0 ? filteredByDifficulty.includes(submission.difficulty.toLowerCase()) : true;
        const filterByStatusCondition = filteredByStatus.length !== 0 ? filteredByStatus.includes(submission.status) : true;
        const filterByTextCondition = searchText !== '' ? (submission.title.toLowerCase().includes(searchText.toLowerCase())) : true;
        const filterByCompanyCondition = filteredByCompany.length !== 0 ? filteredByCompany.includes(submission.company) : true;
        const filterByTypeCondition = filteredByType.length !== 0 ? filteredByType.includes(submission.type) : true;
        return filterByDifficultyCondition && filterByStatusCondition && filterByTextCondition && filterByCompanyCondition && filterByTypeCondition;
    });

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;


    const totalPages = Math.ceil(sortedSubmissions.length / itemsPerPage);





    if (sortedByTitle === 'asc')
        sortedSubmissions.sort((a, b) => a.title.localeCompare(b.title));
    else if (sortedByTitle === 'desc')
        sortedSubmissions.sort((a, b) => b.title.localeCompare(a.title));

    const difficultyOrder = { easy: 1, medium: 2, hard: 3 };

    if (sortedByDifficulty === 'asc')
        sortedSubmissions.sort((a, b) => difficultyOrder[a.difficulty.toLowerCase()] - difficultyOrder[b.difficulty.toLowerCase()]);
    else if (sortedByDifficulty === 'desc')
        sortedSubmissions.sort((a, b) => difficultyOrder[b.difficulty.toLowerCase()] - difficultyOrder[a.difficulty.toLowerCase()]);

    if (sortedByStatus === 'asc')
        sortedSubmissions.sort((a, b) => a.status - b.status)
    else if (sortedByStatus === 'desc')
        sortedSubmissions.sort((a, b) => b.status - a.status)

    if (sortedByDate === 'asc')
        sortedSubmissions.sort((a, b) => a.timestamp.localeCompare(b.timestamp));
    else if (sortedByDate === 'desc')
        sortedSubmissions.sort((a, b) => b.timestamp.localeCompare(a.timestamp));



    if (sortedByCompany === 'asc')
        sortedSubmissions.sort((a, b) => a.company.localeCompare(b.company))
    else if (sortedByCompany === 'desc')
        sortedSubmissions.sort((a, b) => b.company.localeCompare(a.company))

    if (sortedByType === 'asc')
        sortedSubmissions.sort((a, b) => a.type.localeCompare(b.type))
    else if (sortedByType === 'desc')
        sortedSubmissions.sort((a, b) => b.type.localeCompare(a.type))

    const sortByTitle = () => {
        setSortedByTitle((oldOrder) => oldOrder === 'asc' ? 'desc' : oldOrder === 'desc' ? '' : 'asc');
        // Reset degli altri stati di ordinamento
        setSortedByDifficulty('');
        setSortedByDate('');
        setSortedByStatus('');
        setSortedByType('');
        setSortedByCompany('');
    };

    const sortByDifficulty = () => {
        setSortedByDifficulty((oldOrder) => oldOrder === 'asc' ? 'desc' : oldOrder === 'desc' ? '' : 'asc');
        // Reset degli altri stati di ordinamento
        setSortedByTitle('');
        setSortedByDate('');
        setSortedByStatus('');
        setSortedByType('');
        setSortedByCompany('');
    };

    const sortByStatus = () => {
        setSortedByStatus((oldOrder) => oldOrder === 'asc' ? 'desc' : oldOrder === 'desc' ? '' : 'asc');
        // Reset degli altri stati di ordinamento
        setSortedByTitle('');
        setSortedByDate('');
        setSortedByDifficulty('');
        setSortedByType('');
        setSortedByCompany('');
    };

    const sortByDate = () => {
        setSortedByDate((oldOrder) => oldOrder === 'asc' ? 'desc' : oldOrder === 'desc' ? '' : 'asc');
        // Reset degli altri stati di ordinamento
        setSortedByTitle('');
        setSortedByDifficulty('');
        setSortedByStatus('');
        setSortedByType('');
        setSortedByCompany('');
    };


    const sortByCompany = () => {
        setSortedByCompany((oldOrder) => oldOrder === 'asc' ? 'desc' : oldOrder === 'desc' ? '' : 'asc');
        // Reset degli altri stati di ordinamento
        setSortedByDifficulty('');
        setSortedByDate('');
        setSortedByStatus('');
        setSortedByTitle('');
        setSortedByType('');
    };
    const sortByType = () => {
        setSortedByType((oldOrder) => oldOrder === 'asc' ? 'desc' : oldOrder === 'desc' ? '' : 'asc');
        // Reset degli altri stati di ordinamento
        setSortedByDifficulty('');
        setSortedByDate('');
        setSortedByStatus('');
        setSortedByTitle('');
        setSortedByCompany('');
    };

    const filterByDifficulty = (difficulty) => {
        setFilteredByDifficulty((prevDifficulties) => {
            if (!prevDifficulties.includes(difficulty)) {
                return [...prevDifficulties, difficulty];
            } else {
                return prevDifficulties.filter(item => item !== difficulty);
            }

        });
    }
    const filterByStatus = (status) => {

        setFilteredByStatus((prevStatuses) => {
            if (!prevStatuses.includes(status)) {
                return [...prevStatuses, status];
            } else {
                return prevStatuses.filter(item => item !== status);
            }

        });
    }

    const filterByCompany = (company) => {
        setFilteredByCompany((prevComapnies) => {
            if (!prevComapnies.includes(company)) {
                return [...prevComapnies, company];
            } else {
                return prevComapnies.filter(item => item !== company);
            }

        });
    }
    const filterByType = (type) => {
        setFilteredByType((prevTypes) => {
            if (!prevTypes.includes(type)) {
                return [...prevTypes, type];
            } else {
                return prevTypes.filter(item => item !== type);
            }

        });
    }

    const removeDifficultyFilter = (difficulty) => {
        setFilteredByDifficulty(filteredByDifficulty.filter(x => x !== difficulty))
    }

    const removeStatusFilter = (status) => {
        setFilteredByStatus(filteredByStatus.filter(x => x !== status))
    }
    const removeCompanyFilter = (company) => {
        setFilteredByCompany(filteredByCompany.filter(x => x !== company))
    }
    const removeTypeFilter = (type) => {
        setFilteredByType(filteredByType.filter(x => x !== type))
    }

    return (



        < >              
                <Row className="row_filters">
                <Col className="col_filters search_bar">
                    <Form>
                        <Form.Group>
                            <Form.Control
                                type="search"
                                placeholder="Search submissions"
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
                
                <Col  className="col_filters">
                    <Dropdown autoClose="outside">
                        <Dropdown.Toggle id="dropdown-custom" align={{ lg: 'start' }} className="main-button">
                            Difficulty
                        </Dropdown.Toggle>




                        <Dropdown.Menu>

                            {[...new Set(props.submissions.map(submission => submission.difficulty.toLowerCase()))].map((x, i) => (
                                <Dropdown.Item key={i} onClick={() => filterByDifficulty(x)}>
                                   
                                        <Row className="dropdown_item_row">
                                            <Col className="dropdown_item_col">
                                                {x === 'easy' && <p className="d-inline text-success">Easy</p>}
                                                {x === 'medium' && <p className="d-inline text-warning">Medium</p>}
                                                {x === 'hard' && <p className="d-inline text-danger">Hard</p>}
                                            </Col>
                                            <Col className="dropdown_item_col">
                                                {filteredByDifficulty.includes(x) && <i className="bi bi-check-lg filters-check" />}
                                            </Col>
                                        </Row>
                                   
                                </Dropdown.Item>
                            ))}

                        </Dropdown.Menu>

                    </Dropdown>
                </Col>

                <Col   className="col_filters">
                    <Dropdown autoClose="outside" >
                        <Dropdown.Toggle id="dropdown-custom" className="main-button">
                            Status
                        </Dropdown.Toggle>

                        <Dropdown.Menu>

                            {[...new Set(props.submissions.map(submission => submission.status))].map((x, i) => (
                                <Dropdown.Item key={i} onClick={() => filterByStatus(x)}>
                                    
                                        <Row className="dropdown_item_row">
                                            <Col className="dropdown_item_col">
                                                {x === 2 && <p className="d-inline text-success">Success</p>}
                                                {x === 0 && <p className="d-inline text-primary">Uncompleted</p>}
                                                {x === 1 && <p className="d-inline text-danger">Failed</p>}
                                            </Col>
                                            <Col className="dropdown_item_col">
                                                {filteredByStatus.includes(x) && <i className="bi bi-check-lg filters-check" />}
                                            </Col>
                                        </Row>
                              
                                </Dropdown.Item>
                            ))}

                        </Dropdown.Menu>

                    </Dropdown>
                </Col>

                <Col  className="col_filters" >
                    <Dropdown autoClose="outside" >
                        <Dropdown.Toggle id="dropdown-custom" className="main-button">
                            Company
                        </Dropdown.Toggle>

                        <Dropdown.Menu>

                            {[...new Set(props.submissions.map(submission => submission.company))].map((x, i) => (
                                <Dropdown.Item key={i} onClick={() => filterByCompany(x)}>
                                  
                                        <Row className="dropdown_item_row">
                                            <Col className="dropdown_item_col">
                                                <p className="d-inline ">{x}</p>
                                            </Col>
                                            <Col className="dropdown_item_col">
                                                {filteredByCompany.includes(x) && <i className="bi bi-check-lg filters-check" />}
                                            </Col>
                                        </Row>
                                    
                                </Dropdown.Item>
                            ))}

                        </Dropdown.Menu>

                    </Dropdown>
                </Col>

                <Col   className="col_filters last_button">
                    <Dropdown autoClose="outside" >
                        <Dropdown.Toggle id="dropdown-custom" className="main-button">
                            Type
                        </Dropdown.Toggle>

                        <Dropdown.Menu>

                            {[...new Set(props.submissions.map(submission => submission.type))].map((x, i) => (
                                <Dropdown.Item key={i} onClick={() => filterByType(x)}>
                                
                                        <Row className="dropdown_item_row">
                                            <Col className="dropdown_item_col">
                                                <p className="d-inline">{x}</p>
                                            </Col>
                                            <Col className="dropdown_item_col ">
                                                {filteredByType.includes(x) && <i className="bi bi-check-lg filters-check" />}
                                            </Col>
                                        </Row>
                                   
                                </Dropdown.Item>
                            ))}

                        </Dropdown.Menu>

                    </Dropdown>
                </Col>

                 </Row>
                 

            {(filteredByCompany.length !== 0 || filteredByType.length !== 0 || filteredByDifficulty.length !== 0 || filteredByStatus.length !== 0 || searchText !== '') &&
                <Row  className="row_filters_badges">
                    <Col className="col_filters_badges badges" >
                        <Row className="filters_badges_row" >

                            {filteredByDifficulty.map((x, i) => (
                               
                                    <Badge  key={i} bg="secondary" pill className="filter-button custom-badge">
                                        <Row className="align-items-center text-center g-0"> 
                                            <Col xs="auto" className="pe-1">
                                            {x === 'easy' && <>Easy</>}
                                                {x === 'medium' && <>Medium</>}
                                                {x === 'hard' && <>Hard</>}
                                            </Col>
                                            <Col xs="auto">
                                                <i className="bi bi-x-lg" onClick={() => removeDifficultyFilter(x)}></i>
                                            </Col>
                                        </Row>
                                    </Badge>
                                
                            ))}
                            {filteredByStatus.map((x, i) => (
                               
                                    <Badge  key={i} bg="secondary" pill className="filter-button custom-badge">
                                        <Row className="align-items-center text-center">
                                            <Col xs="auto" className="pe-2">
                                                {x === 2 && "Success"}
                                                {x === 0 && "Uncompleted"}
                                                {x === 1 && "Failed"}
                                            </Col>
                                            <Col xs="auto">
                                                <i className="bi bi-x-lg" onClick={() => removeStatusFilter(x)}></i>
                                            </Col>
                                        </Row>
                                    </Badge>
                                
                            ))}
                            {filteredByCompany.map((x, i) => (
                            
                                    <Badge   key={i} bg="secondary" pill className="filter-button custom-badge">
                                        <Row className="align-items-center text-center">
                                            <Col xs="auto" className="pe-2">
                                                {x}

                                            </Col>
                                            <Col xs="auto">
                                                <i className="bi bi-x-lg" onClick={() => removeCompanyFilter(x)}></i>
                                            </Col>
                                        </Row>
                                    </Badge>
                           
                            ))}
                            {filteredByType.map((x, i) => (
                              
                                    <Badge  key={i} bg="secondary" pill className="filter-button custom-badge">
                                        <Row className="align-items-center text-center">
                                            <Col xs="auto" className="pe-2">
                                                {x}

                                            </Col>
                                            <Col xs="auto">
                                                <i className="bi bi-x-lg" onClick={() => removeTypeFilter(x)}></i>
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
                    <Col className="col_filters_badges px-0" >
                        <Button variant="secondary" className="float-end" onClick={() => { setFilteredByType([]); setFilteredByCompany([]); setFilteredByDifficulty([]); setFilteredByStatus([]); setSearchText(''); setSearchFilterText(''); }}><i class="bi bi-trash3"></i> Reset</Button>
                    </Col>
                </Row>
            }

            <Row className="submissions_row_table">


       
                <Table className="container_table" >
                    <thead>
                        <tr >
                            <th className='table-header-center' onClick={sortByDate}>
                                Date
                                <span className="float-end">
                                    <i className={sortedByDate === 'asc' ? "bi bi-arrow-up-short" : sortedByDate === 'desc' ? "bi bi-arrow-down-short" : "bi bi-arrows-vertical"}></i>
                                </span>
                            </th>

                            <th className='questions-title-header' onClick={sortByTitle}>
                                <div className='float-start'>Title</div>
                                <span className="float-end">
                                    <i className={sortedByTitle === 'asc' ? "bi bi-arrow-up-short" : sortedByTitle === 'desc' ? "bi bi-arrow-down-short" : "bi bi-arrows-vertical"}></i>
                                </span>
                            </th>
                            <th className='table-header-center' onClick={sortByCompany}>
                                Company
                                <span className="float-end">
                                    <i className={sortedByCompany === 'asc' ? "bi bi-arrow-up-short" : sortedByCompany === 'desc' ? "bi bi-arrow-down-short" : "bi bi-arrows-vertical"}></i>
                                </span>
                            </th>
                            <th className='table-header-center' onClick={sortByType}>
                                Type
                                <span className="float-end">
                                    <i className={sortedByType === 'asc' ? "bi bi-arrow-up-short" : sortedByType === 'desc' ? "bi bi-arrow-down-short" : "bi bi-arrows-vertical"}></i>
                                </span>
                            </th>

                            <th className='table-header-center' onClick={sortByDifficulty}>
                                Difficulty
                                <span className="float-end">
                                    <i className={sortedByDifficulty === 'asc' ? "bi bi-arrow-up-short" : sortedByDifficulty === 'desc' ? "bi bi-arrow-down-short" : "bi bi-arrows-vertical"}></i>
                                </span>
                            </th>

                            <th className='table-header-center' onClick={sortByStatus}>
                                Status
                                <span className="float-end">
                                    <i className={sortedByStatus === 'asc' ? "bi bi-arrow-up-short" : sortedByStatus === 'desc' ? "bi bi-arrow-down-short" : "bi bi-arrows-vertical"}></i>
                                </span>
                            </th>
                        </tr>
                    </thead>




                    <tbody >

                        {sortedSubmissions.slice(indexOfFirstItem, indexOfLastItem).map((submission, i) => (
                            <SubmissionRow submissions={submission} key={i} />
                        ))}
                    </tbody>
                    {sortedSubmissions.length == 0 && (
                        <tbody>
                            <tr>
                                <td colSpan="6" style={{ backgroundColor: 'white', textAlign: 'center' }}>
                                    <div style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        height: '350px',
                                    }}>
                                        <i className="bi bi-exclamation-circle" style={{ fontSize: '2rem', marginBottom: '1rem' }}></i>
                                        <span>No matching submissions found</span>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    )}
                </Table>
                
            </Row>

            <Pagination className="justify-content-center">
                {[...Array(totalPages).keys()].map(number => (
                    <Pagination.Item key={number + 1} active={number + 1 === currentPage} onClick={() => paginate(number + 1)}>
                        {number + 1}
                    </Pagination.Item>
                ))}
            </Pagination>



        </>


    );
}

function SubmissionRow(props) {
    const navigate = useNavigate(); // Hook to navigate

    // Function to handle click event
    const handleClick = () => {
        navigate(`/reviews/${props.submissions.question_id}/submissions/${props.submissions.id}`);

    };

    return (
        <tr onClick={handleClick}>
            <SubmissionData submissions={props.submissions} />
        </tr>
    );
}

function SubmissionData(props) {

    const getStatusIcon = (status) => {
        if (status === 2) {
            return <i className="bi bi-check text-success status-icon"></i>;
        } else if (status === 1) {
            return <i className="bi bi-x text-danger status-icon "></i>;
        } else if (status === 0) {
            return <i className="bi bi-clock text-primary status-icon-clock"></i>;
        }
        return null;
    };
    const getDifficultyBadge = (difficulty) => {
        if (difficulty === 'easy') {
            return <Badge bg={"success"}>Easy</Badge>
        } else if (difficulty === 'hard') {
            return <Badge bg={"danger"}>Hard</Badge>
        } else if (difficulty === 'medium') {
            return <Badge bg={"warning"}>Medium</Badge>
        }
        return null;
    };

    const renderTooltip = (submission) => (
        <Tooltip id="button-tooltip" {...props} className="custom-tooltip">
            <Container fluid> {/* Usa `fluid` per evitare spaziature inutili */}
                <Row className="gx-1"> {/* Riduci o elimina lo spazio tra le colonne */}
                    <Col lg={6} className="d-flex align-items-center justify-content-center"> {/* Imposta le colonne su `auto` per adattarsi al contenuto */}
                        <Badge pill bg="info" text="dark" className="m-1 custom-badge">
                            {submission.company}
                        </Badge>
                    </Col>
                    <Col lg={6} className="d-flex align-items-center justify-content-center">
                        <Badge pill bg="warning" text="dark" className="m-1 custom-badge">
                            {submission.type}
                        </Badge>
                    </Col>

                </Row>
            </Container>
        </Tooltip>


    );
    const renderTooltipStatus = (status) => (

        <Tooltip id="button-tooltip" {...props} className="custom-tooltip">
            <Container>
                {status == 2 && <Row className="align-items-center">

                    <Col>

                        Success
                    </Col>
                </Row>}
                {status == 1 && <Row className="align-items-center">

                    <Col>
                        Failed
                    </Col>
                </Row>}
                {status == 0 && <Row className="align-items-center">

                    <Col>
                        Uncompleted
                    </Col>
                </Row>}
            </Container>
        </Tooltip>
    );
    return (

        <>
            <td className='table-center-data'>{props.submissions.timestamp}</td>
            <td className='title-table-data'>{props.submissions.title} </td>

            <td className='table-center-data'> {props.submissions.company}  </td>
            <td className='table-center-data'> {props.submissions.type}  </td>

            <td className='table-center-data'>{getDifficultyBadge(props.submissions.difficulty.toLowerCase())}</td>

            <td className='table-center-data'>
                <OverlayTrigger
                    placement="right"
                    delay={{ show: 150, hide: 150 }}
                    overlay={renderTooltipStatus(props.submissions.status)}
                >{getStatusIcon(props.submissions.status)}
                </OverlayTrigger>
            </td>


        </>
    );
}

export default SubmissionsTable;
