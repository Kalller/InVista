const SERVER_URL = 'http://localhost:3001';

// question apis

const getAllQuestions = async () => {
  const response = await fetch(SERVER_URL + '/api/questions', /*{
    credentials: 'include',
  }*/);
  if (response.ok) {
    const questions = await response.json();
    return questions;
  } else {
    const errDetails = await response.text();
    throw errDetails;
  }
};

const getQuestionById = async (questionId) => {
  const response = await fetch(SERVER_URL + `/api/questions/${questionId}`, {
    credentials: 'include',
  });
  if (response.ok) {
    const question = await response.json();
    return question;
  } else {
    const errDetails = await response.text();
    throw errDetails;
  }
}



const getSubmissionsByQuestionAndUsername = async (questionId) => {
  const response = await fetch(SERVER_URL + `/api/questions/${questionId}/submissions`, {
    credentials: 'include',
  });
  if (response.ok) {
    const submissions = await response.json();
    return submissions;
  } else {
    const errDetails = await response.text();
    throw errDetails;
  }
};

const getSubmissionsForReviews = async () => {
  const response = await fetch(SERVER_URL + `/api/questions//submissions`, {
    credentials: 'include',
  });
  if (response.ok) {
    const submissions = await response.json();
    return submissions;
  } else {
    const errDetails = await response.text();
    throw errDetails;
  }
};


const insertSubmission = async (questionId, author, code, notes, status) => {
  const response = await fetch(SERVER_URL + '/api/questions/submissions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      questionId,
      author,
      code,
      notes,
      status,
    }),
    credentials: 'include',
  });

  if (response.ok) {
    const submission = await response.json();
    return submission;
  } else {
    const errDetails = await response.text();
    throw errDetails;
  }
};




const questionAPI = { getAllQuestions, getSubmissionsByQuestionAndUsername, getQuestionById, getSubmissionsForReviews, insertSubmission };
export default questionAPI;