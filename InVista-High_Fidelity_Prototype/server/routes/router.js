const express = require('express');
const auth = require('./controllers/auth.js');
const questions = require('./controllers/questions.js')
const router = express.Router();

/*session routes*/
router.post('/sessions', auth.login);
router.get('/sessions/current', auth.getCurrentSession);
router.delete('/sessions/current', auth.isLoggedIn, auth.logout);

/*question routes */
//router.get('/questions', auth.isLoggedIn, questions.getAllQuestions);
router.get('/questions', questions.getAllQuestions);
router.get('/questions/:questionId', questions.getQuestionById);


/* submission routes */
router.get('/questions/:questionId/submissions/', questions.getSubmissionsByQuestionAndUsername);
router.get('/questions//submissions/', questions.getSubmissionsForReviews);

router.post('/questions/submissions', questions.insertSubmission);

module.exports = router;