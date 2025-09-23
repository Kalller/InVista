import React, { useEffect, useState } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Button, Col, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

import logo from '../assets/logo.svg'


function Navigation(props) {

  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(false)
  const [link, setLink] = useState('')

  useEffect(() => {
    // Function for handling the navbar animation
    function handleNavbarAnimation() {
      var tabsNewAnim = document.getElementById('navbarSupportedContent');
      var activeItemNewAnim = tabsNewAnim.querySelector('.active');
      var activeWidthNewAnimHeight = activeItemNewAnim.clientHeight;
      var activeWidthNewAnimWidth = activeItemNewAnim.clientWidth;
      var itemPosNewAnimTop = activeItemNewAnim.offsetTop;
      var itemPosNewAnimLeft = activeItemNewAnim.offsetLeft;

      var horiSelector = document.querySelector(".hori-selector");
      horiSelector.style.top = itemPosNewAnimTop + "px";
      horiSelector.style.left = itemPosNewAnimLeft + "px";
      horiSelector.style.height = activeWidthNewAnimHeight + "px";
      horiSelector.style.width = activeWidthNewAnimWidth + "px";

      tabsNewAnim.addEventListener("click", function (event) {
        
        if (event.target.closest("a")) {

          
          tabsNewAnim.querySelectorAll('li').forEach(function (item) {
            item.classList.remove("active");

          });
          event.target.closest("li").classList.add("active");

          
          
          var activeWidthNewAnimHeight = event.target.closest("li").clientHeight;
          var activeWidthNewAnimWidth = event.target.closest("li").clientWidth;
          var itemPosNewAnimTop = event.target.closest("li").offsetTop;
          var itemPosNewAnimLeft = event.target.closest("li").offsetLeft;
          horiSelector.style.top = itemPosNewAnimTop + "px";
          horiSelector.style.left = itemPosNewAnimLeft + "px";
          horiSelector.style.height = activeWidthNewAnimHeight + "px";
          horiSelector.style.width = activeWidthNewAnimWidth + "px";
          

         
        }
      });
    }

    // Add a delay before executing handleNavbarAnimation to ensure that DOM elements are fully rendered
    const delay = setTimeout(() => {
      handleNavbarAnimation();
      clearTimeout(delay);
    }, 500);

    window.addEventListener('resize', () => {
      setTimeout(() => handleNavbarAnimation(), 500);
    });

    return () => window.removeEventListener('resize', handleNavbarAnimation);
  }, []);

  return (
    <Row>
      <Col md={2}></Col>
      <Col md={8}>
        <nav className="navbar navbar-expand-lg navbar-mainbg">
          <a className="navbar-brand navbar-logo no-hover">
            <img src={logo} alt="Logo" />
            InVista
          </a>
          <ExitConfirmationModal
        show={showModal}
        onHide={()=>setShowModal(false)}
        onConfirm={()=>{
          navigate(link);
          setShowModal(false);
          props.setCantLeave(false);
        }}
        onCancel={()=>setShowModal(false)}
      />
          <div className="collapse navbar-collapse d-flex justify-content-end" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
              <div className="hori-selector">
                <div className="left"></div>
                <div className="right"></div>
              </div>
              <li className="nav-item d-flex justify-content-center active" onClick={() =>{
                if (!props.cantLeave){
                
                navigate('/questions')
              }else{
                setShowModal(true);
                setLink('/questions')
              }
                }}>
                <Link className="nav-link active" >
                  <i className="bi bi-journal-code" ></i>
                  Questions
                </Link>
              </li>
              <li className="nav-item"  onClick={() =>{
                if (!props.cantLeave){
                  navigate('/reviews')
                }else{
                  setShowModal(true);
                  setLink('/reviews')
                }
              }}>
                <Link className="nav-link active" >
                <i className="bi bi-clipboard-data"></i>
                  Reviews
                </Link>
              </li>
              <span className="nav-item disabled">
                <Link className="nav-link disabled">
                  <i className="bi bi-person-circle"></i>
                </Link>
              </span>
            </ul>
          </div>
        </nav>
      </Col>
      <Col md={2}></Col>
    </Row>
  );
}


function NotFoundLayout() {
  return (
    <Row className="below-nav">
      <h2>This is not the route you are looking for!</h2>
      <Link to="/">
        <Button variant="primary">Go Home!</Button>
      </Link>
    </Row>
  );
}

function LoginLayout(props) {
  return (
    <Row className="vh-100">
      <Col className="below-nav">
        <LoginForm login={props.login} />
      </Col>
    </Row>
  );
}
import Modal from 'react-bootstrap/Modal';

function ExitConfirmationModal({ show, onHide, onConfirm, onCancel }) {
  return (
    <Modal show={show} onHide={onHide} centered>

      <Modal.Body className='text-center fs-4'>
        <p>Do you really want to leave this page?</p>
        <p> You will lose your progress!</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onCancel}>
          No
        </Button>
        <Button variant="primary" onClick={onConfirm}>
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

function SubmitConfirmationModal({ show, onHide, onConfirm, onCancel }) {
  return (
    <Modal show={show} onHide={onHide} centered>

      <Modal.Body className='text-center fs-4'>
        <p>You are Submitting without running your answer.</p>
        <p> This will set your Submission to an Uncompleted status.</p>
        <p> Do you still want to submit?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onCancel}>
          No
        </Button>
        <Button variant="primary" onClick={onConfirm}>
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}


const Footer = () => {
  return (

    <div className="bg-transparent text-white">
      <hr className='footer-separator'></hr>
      <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 mt-4 mx-4 ">
        <p className="col-md-4 mb-0 text-body-secondary">&copy; 2023 | InVista Project</p>

        <a className="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto ">
          <img src={logo} alt="Logo" className='footer-icon' />
        </a>

        <Link className="nav col-md-4 d-flex mb-3  mb-md-0 align-items-center justify-content-end text-white text-decoration-none">

          <i className="bi bi-github fs-2"></i>
          <pre className='fs-6 d-flex mb-3 mb-md-0 '>After All's Repository</pre>

        </Link>
      </footer>
    </div>
  );
};

export default Footer;


export { Navigation, NotFoundLayout, LoginLayout, ExitConfirmationModal, Footer, SubmitConfirmationModal };
