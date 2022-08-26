import { NextApiHandler } from 'next';
import decodeToken from '../../../lib/frontend/decodeToken';
import getToken from '../../../lib/frontend/getToken';
import { addQuiz, updateQuiz } from '../../../prisma/quizzes';

// This is the handler for the quiz requests that use the request body
const Quiz: NextApiHandler = async (req, res) => {
  switch (req.method) {
  case 'POST': {
    // Creates a new quiz with information from the request body
    const user = await addQuiz(req.body);

    // Returns the quiz
    return res.status(200).json(user);
  }
  case 'PUT': {
    // Extracts the quiz id from the url
    const token = getToken(req);

    // If the token is not present, return a 401 error
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Extracts the user id from the token
    const { userId } = decodeToken(token);

    // Updates the quiz with information from the request body
    const quiz = await updateQuiz(req.body, userId);

    // Returns the quiz
    if (quiz) {
      return res.status(200).json(quiz);
    }
    // Returns a 404 error if the quiz does not exist
    return res.status(404).json({ message: 'Quiz not found' });

  }
  default:
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
};

export default Quiz;