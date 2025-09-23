import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';

import { React } from 'react';
import { useEffect, useState } from 'react';

import { Navigation, NotFoundLayout, Footer } from './components/UtilityComponents'
import { QuestionsLayout } from './components/PageLayout'

import { Container, Col, Row, Alert } from 'react-bootstrap/'
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';

import { LoginForm } from './components/AuthComponent';
import SingleQuestion from './components/SingleQuestionComponents';
import Reviews from './components/ReviewsComponents'
import generalAPI from '../apis/generalAPI';
import questionAPI from '../apis/questionAPI';


// we need to pass the logout button to the nav, the other props are already there


function App() {



  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState([])
  const [update, setUpdate] = useState(true); // trigger an update
  const [questions, setQuestions] = useState([]);
  const [cantLeave, setCantLeave] = useState(false);
  const [link, setLink] = useState('')

  let username = "invista"; // Specific username for auto-login
  let password = "afterall"; // Specific password for auto-login
  const credentials = { username, password };

  //the dialogue message
  const [message, setMessage] = useState('');
  // If an error occurs, the error message will be shown in a toast.
  const handleErrors = (err) => {
    let msg = '';
    if (err.error) msg = err.error;
    else msg = "Unknown Error";
    //setMessage(msg);
  }
  
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await generalAPI.getUserInfo(); // we have the user info here 
        
        if (user) {

          setUser({
            username: user.username,
          });
          // setMessage({ msg: `Welcome, ${user.username}!`, type: 'success' });

          setLoggedIn(true);
        }
      } catch { (err) => { return null; } }


    }
    checkAuth();
  }, [loggedIn]);



  const handleLogin = async (credentials) => {
    try {
      const user = await generalAPI.logIn(credentials);
      setLoggedIn(true);

    } catch (err) {
      setMessage({ msg: err, type: 'danger' });
    }
  };

  handleLogin(credentials)



  const handleLogout = async () => {
    await generalAPI.logOut();
    setLoggedIn(false);
    // clean up everything
    setMessage('');
  };


  useEffect(() => {
    if (update) {
      questionAPI.getAllQuestions()
        .then(questions => {
          setQuestions(questions);
          setUpdate(false);
        })
        .catch(e => {
          handleErrors(e);
          setUpdate(false);
        });
    }
  }, [update]);


  return (
    <BrowserRouter>
      <Container fluid className="App p-0 overflow-hidden">
        <Navigation loggedIn={loggedIn} user={user} setCantLeave={setCantLeave} cantLeave={cantLeave} handleLogout={handleLogout} link={link} setLink={setLink}/>

        <Outlet />
        <Routes>
          <Route path="/" element={<Navigate to="/questions" />} />

          <Route path="questions/" element={<QuestionsLayout questions={questions} update={update} loggedIn={loggedIn} user={user} />} />
          <Route path="questions/:id" element={<SingleQuestion loggedIn={loggedIn} user={user} cantLeave={cantLeave} setCantLeave={setCantLeave} key="questions" />} />

          <Route path="reviews/" element={<Reviews questions={questions}/>} />
          <Route path="reviews/:id/submissions/:subid" element={<SingleQuestion loggedIn={loggedIn} cantLeave={cantLeave} user={user} setCantLeave={setCantLeave} key="reviews" />} />

          <Route path="login" element={<LoginForm login={handleLogin} />} />
          <Route path="*" element={<NotFoundLayout />} />
        </Routes>



        <Footer></Footer>

      </Container>

    </BrowserRouter>
  );

}

export default App;
