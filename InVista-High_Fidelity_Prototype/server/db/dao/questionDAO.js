const db = require('../db');
const moment = require('moment');
// QUESTION SECTION

/**
 * Retrieve all questions without the description.
 * @returns {Promise} a Promise that resolves to an array of questions without descriptions
 * @throws the Promise rejects if any errors are encountered
 */
exports.getAllQuestions = () => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT id, title, difficulty, company, type FROM questions';

    db.all(sql, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

exports.getQuestionById = (questionId) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM questions WHERE id = ?';

    db.get(sql, [questionId], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
};
// SUBMISSION SECTION

/**
 * Retrieve submissions for a specific question and username.
 * @param {number} questionId - The ID of the question.
 * @param {string} author - The username of the author.
 * @returns {Promise} a Promise that resolves to an array of submissions for the specified question and username
 * @throws the Promise rejects if any errors are encountered
 */
exports.getSubmissionsByQuestionAndUsername = (questionId, author) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM submissions WHERE question_id = ? AND author = ?';

    db.all(sql, [questionId, author], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

exports.getAllSubmissions = () => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM submissions';

    db.all(sql, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};




/**
 * Insert a new submission into the database.
 * @param {number} questionId - The ID of the question associated with the submission.
 * @param {string} author - The username of the author submitting the code.
 * @param {string} code - The code submitted by the author.
 * @param {string} notes - Additional notes related to the submission (optional).
 * @param {number} status - The status of the submission.
 * @returns {Promise} a Promise that resolves when the insertion is successful
 * @throws the Promise rejects if any errors are encountered
 */
exports.insertSubmission = (questionId, author, code, notes, status) => {
  return new Promise((resolve, reject) => {
    const timestamp = moment().format('YYYY-MM-DD HH:mm'); // Get the current timestamp in the desired format
    const sql = 'INSERT INTO submissions (question_id, author, code, notes, timestamp, status) VALUES (?, ?, ?, ?, ?, ?)';
    const params = [questionId, author, code, notes, timestamp, status];

    db.run(sql, params, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve({ id: this.lastID, timestamp });
      }
    });
  });
};
