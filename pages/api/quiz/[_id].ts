import { NextApiHandler } from 'next';
import deleteQuiz from '../../../lib/server/Quiz/deleteQuiz';
import getQuiz from '../../../lib/server/Quiz/getQuiz';

// This is the handler for the quiz requests that require a quiz id
const QuizId: NextApiHandler = async (req, res) => {
  switch (req.method) {
  case 'GET':
    return getQuiz(req, res);
  case 'DELETE':
    return deleteQuiz(req, res);
  default:
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
};

export default QuizId;
