const questionsDAO = require('../../db/dao/questionDAO.js');

//QUESTION SECTION

const getAllQuestions = async (req, res, next) => {
    try {
      const allQuestions = await questionsDAO.getAllQuestions();
      res.json(allQuestions);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  const getQuestionById = async (req, res, next) => {
    const questionId = parseInt(req.params.questionId, 10);
  
    try {
      const question = await questionsDAO.getQuestionById(questionId);
      if (question) {
        res.json(question);
      } else {
        res.status(404).json({ error: 'Question not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  

  //SUBMISSION SECTION
  const getSubmissionsByQuestionAndUsername = async (req, res, next) => {
    const questionId = parseInt(req.params.questionId, 10);
    const author = 'invista'
  
    try {
      const submissions = await questionsDAO.getSubmissionsByQuestionAndUsername(questionId, author);
      res.json(submissions);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  const getSubmissionsForReviews = async (req, res, next) => {
    
  
    try {
      const submissions = await questionsDAO.getAllSubmissions();
      res.json(submissions);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  const insertSubmission = async (req, res, next) => {
    const { questionId, code, notes, status } = req.body;
    const author = req.user.username; // Assuming you have user information available in req.user
  
    try {
      // Chiamata alla funzione DAO per inserire la submission
      const result = await questionsDAO.insertSubmission(questionId, author, code, notes, status);
  
      res.status(201).json({ id: result.id, timestamp: result.timestamp, message: 'Submission inserted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

module.exports = {
  getSubmissionsByQuestionAndUsername,getAllQuestions, getQuestionById, getSubmissionsForReviews, insertSubmission
};