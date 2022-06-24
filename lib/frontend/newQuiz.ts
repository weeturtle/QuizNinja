import { Quiz } from '../../types/Quiz';
import validateQuiz from './validateQuiz';

// Function that takes a quiz as parameter and sends it to the server
const createQuiz = async (quiz: Quiz) => {
  // Checks if the quiz is valid
  validateQuiz(quiz);

  // Sends the quiz to the server
  const response = await fetch('/api/quiz', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(quiz),
  });

  // Checks if the server returned an error
  if (response.status !== 200) {
    throw new Error('Failed to create quiz');
  }


  return await response.json();
};

export default createQuiz;