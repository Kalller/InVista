
import { useState, useEffect } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Row, Col, Container,  Card, Button } from 'react-bootstrap';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import React from 'react';


import { Bar, Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import CustomTabPanel from './CustomTabPanel';

function Stats(props) {
    const [activeTab, setActiveTab] = React.useState(0); // State to track the active tab

    const handleChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    function summarizeQuestionsByField(data, field) {
        const summary = {};
        const categories = [];

        data.forEach(item => {
            const key = item[field];
            const { status } = item;

            if (!summary[key]) {
                summary[key] = { v: 0, x: 0, t: 0 };
                categories.push(key);
            }

            if (status === 2) {
                summary[key].v += 1;
            } else if (status === 1) {
                summary[key].x += 1;
            } else if (status === 0) {
                summary[key].t += 1;
            }
        });

        const giuste = { label: 'Correct', data: [], backgroundColor: 'rgba(75, 192, 192, 0.8)', borderColor: 'rgba(75, 192, 192, 1)' };
        const sbagliate = { label: 'Wrong', data: [], backgroundColor: 'rgba(255, 99, 132, 0.8)', borderColor: 'rgba(255, 99, 132, 1)' };
        const daCompletare = { label: 'To complete', data: [], backgroundColor: 'rgba(255, 206, 86, 0.8)', borderColor: 'rgba(255, 206, 86, 1)' };

        categories.forEach(category => {
            giuste.data.push(summary[category].v);
            sbagliate.data.push(summary[category].x);
            daCompletare.data.push(summary[category].t);
        });

        return {
            labels: categories,
            datasets: [giuste, sbagliate, daCompletare]
        };
    }

  
    const bar_data_company = {
        labels: ['Success', 'Failed', 'Uncompleted'],
        datasets: [
            {
                label: 'Microsoft',
                data: [12, 5, 3], // Sostituisci questi valori con i dati reali
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
            },
            {
                label: 'Google',
                data: [9, 7, 4], // Sostituisci questi valori con i dati reali
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
            },
        ],
    };

    const bar_options_company = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: "Results Per Company",
                font: {
                    size: 18
                }
            },
        },
    };


    const bar_data_type = {
        labels: ['Success', 'Failed', 'Uncompleted'],
        datasets: [
            {
                label: 'Coding',
                data: [12, 5, 3], // Sostituisci questi valori con i dati reali
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
            },
            {
                label: 'Case Studies',
                data: [9, 7, 4], // Sostituisci questi valori con i dati reali
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
            },
            {
                label: 'Riddles',
                data: [9, 7, 4], // Sostituisci questi valori con i dati reali
                backgroundColor: 'rgba(0, 255, 0, 0.2)',
                borderColor: 'rgba(0, 255, 0, 1)',
                borderWidth: 1,
            },
        ],
    };

    const bar_options_type = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: "Results Per Type",
               
                font: {
                    size: 18
                }
            },
        },
    };


    const line_data_company = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [
            {
                label: 'Google',
                data: [5, 8, 4, 6, 3, 4], // Esempio di "pochi esercizi" per Google
                fill: false,
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgba(255, 99, 132, 0.2)',
            },
            {
                label: 'Microsoft',
                data: [10, 15, 8, 12, 7, 9], // Esempio di "più esercizi di Google" per Microsoft
                fill: false,
                backgroundColor: 'rgb(54, 162, 235)',
                borderColor: 'rgba(54, 162, 235, 0.2)',
            },
        ],
    };

    const line_options_company = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
        plugins: {
            title: {
                display: true,
                text: "Questions Attempted Per Month",
                font: {
                    size: 18
                }
            },
            legend: {
                display: true,
                position: 'top',
                labels: {
                    boxWidth: 20,
                    padding: 20
                }
            },
            tooltip: {
                enabled: true,
                mode: 'index',
                intersect: false,
                callbacks: {
                    label: function (context) {
                        let label = context.dataset.label || '';
                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed.y !== null) {
                            label += context.parsed.y + ' questionss attempted';
                        }
                        return label;
                    }
                }
            }
        },
    };


    const line_data_type = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [
            {
                label: 'Riddles',
                data: [5, 8, 4, 6, 3, 4], // Esempio di "pochi esercizi" per Google
                fill: false,
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgba(255, 99, 132, 0.2)',
            },
            {
                label: 'Case Studies',
                data: [10, 15, 8, 12, 7, 9], // Esempio di "più esercizi di Google" per Microsoft
                fill: false,
                backgroundColor: 'rgb(54, 162, 235)',
                borderColor: 'rgba(54, 162, 235, 0.2)',
            },
            {
                label: 'Coding',
                data: [1, 2, 2, 1, 0, 2], // Esempio di "più esercizi di Google" per Microsoft
                fill: false,
                backgroundColor: 'rgba(0, 255, 0)',
                borderColor: 'rgba(0, 255, 0, 0.2)',
            },
        ],

    };

    const line_options_type = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
        plugins: {
            title: {
                display: true,
                text: "Questions Attempted Per Month",
                font: {
                    size: 18
                }
            },
            legend: {
                display: true,
                position: 'top',
                labels: {
                    boxWidth: 20,
                    padding: 20
                }
            },
            tooltip: {
                enabled: true,
                mode: 'index',
                intersect: false,
                callbacks: {
                    label: function (context) {
                        let label = context.dataset.label || '';
                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed.y !== null) {
                            label += context.parsed.y + ' questionss attempted';
                        }
                        return label;
                    }
                }
            }
        },
    };


 return (
        <Container className="stats_container">
             <hr className='separator'></hr>
            <Tabs value={activeTab} onChange={handleChange} aria-label="basic tabs example">
                <Tab label="Company" />
                <Tab label="Types" />
            </Tabs>
            <CustomTabPanel value={activeTab} index={0}>
                <Row className="stats_row">
                    <Col className="stats_col ">
                        <Bar
                            className="stats_bar"
                            data={bar_data_company}
                            options={bar_options_company}
                            width={500}
                            height={300}
                        />
                    </Col>
                    <Col className="stats_col">
                        <Line
                            className="stats_line"
                            options={line_options_company}
                            data={line_data_company}
                            height={180}
                        ></Line>
                    </Col>
                </Row>
            </CustomTabPanel>
            <CustomTabPanel value={activeTab} index={1}>
                <Row className="stats_row">
                    <Col className="stats_col">
                        <Bar
                            className="stats_bar"
                            data={bar_data_type}
                            options={bar_options_type}
                            width={500}
                            height={300}
                        />
                    </Col>
                    <Col className="stats_col">
                        <Line
                            className="stats_line"
                            options={line_options_type}
                            data={line_data_type}
                            height={180}
                        ></Line>
                    </Col>
                </Row>
            </CustomTabPanel>
        </Container>
    );
}

export default Stats;