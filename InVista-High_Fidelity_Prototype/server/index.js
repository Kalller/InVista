'use strict';
// main express related import
const express = require('express');
const dayjs = require('dayjs');
const http = require('http');
const router = require('./routes/router.js');
const session = require('express-session');

// init express
const app = new express();
const port = 3001;

// middlewares
const morgan = require('morgan');
const cors = require('cors');
const userDAO = require('./db/dao/userDAO.js');

const { check, validationResult, } = require('express-validator'); // validation middleware, if needed


// auth imports
const passport = require('passport');
const LocalStrategy = require('passport-local'); // skip the crypto part

const path = require('path');

// utility imports middleware and setup
const bodyParser = require("body-parser"); 

// Passport: set up local strategy, momentarely username
passport.use(new LocalStrategy(async function verify(username, password, cb) {
    try {
        console.log(username,password)
      const findUser = await userDAO.getUser(username, password);
      const user = { 
        id: findUser.id, 
        username: findUser.username, 
      }
      console.log('userfound',user) //don't remember if we need also the call for login module session
      if (!findUser)
        return cb(null, false, 'Incorrect username or password.');
  
      return cb(null, user);
    } catch {
      return cb(null, false, 'Incorrect username or password.');
    }
  }));
  
  passport.serializeUser(function (user, cb) {
    cb(null, user);
  });
  
  passport.deserializeUser(function (user, cb) { // this user all the data found in the select user in the db, needs to be cleaned up
    console.log(user)
    return cb(null, user);
    // if needed, we can do extra check here (e.g., double check that the user is still in the database, etc.)
  });
  

// set up middlewares
app.use(express.json());
app.use(morgan('dev'));
const corsOptions = {
  origin: 'http://localhost:5173',
  optionsSuccessStatus: 200,
  credentials: true
}
app.use(cors(corsOptions));

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (user, cb) {
  return cb(null, user);
});

app.use(session({ // may want to twee these, see documenntation 
  secret: "shhhhh... it's a secret!",
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, 
    maxAge: null 
  }
}));

app.use(passport.authenticate('session'));



/*** Utility Functions ***/
// This function is used to format express-validator errors as strings
const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
  return `${location}[${param}]: ${msg}`;
};


/* ROUTERS */
app.use('/api', router);

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

module.exports = { app, server };