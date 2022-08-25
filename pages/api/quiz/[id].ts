import { NextApiHandler } from 'next';
import decodeToken from '../../../lib/frontend/decodeToken';
import getToken from '../../../lib/frontend/getToken';
import { deleteQuiz, getQuizById } from '../../../prisma/quizzes';
import { QuizModel } from '../../../prisma/zod';

// This is the API handler for the quiz requests that require a quiz id
const QuizId: NextApiHandler = async (req, res) => {
  switch (req.method) {
  case 'GET': {
    // Extracts the quiz id from the url
    const { id: rawId } = req.query;

    // Validates the quiz id
    const id = QuizModel.shape.id.parse(rawId);

    // Gets the quiz from the database
    const quiz = await getQuizById(id);

    // Checks if the quiz exists
    if (quiz) {
      // Returns the quiz
      return res.status(200).json(quiz);
    }

    // Returns a 404 error if the quiz does not exist
    return res.status(404).json({ message: 'Quiz not found' });
  }

  case 'DELETE': {
    // Extracts the quiz id from the url
    const { id: rawId } = req.query;

    // Validates the quiz id
    const id = QuizModel.shape.id.parse(rawId);

    // Gets the token from the cookies
    const token = getToken(req);

    // If the token is not present, return a 401 error
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Extracts the user id from the token
    const { userId } = decodeToken(token);

    // Deletes the quiz from the database
    const quiz = await deleteQuiz(id, userId);

    // If the quiz existed and was deleted, return a 200 response
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

export default QuizId;
