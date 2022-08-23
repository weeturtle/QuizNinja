import { NextApiHandler } from 'next';
import decodeToken from '../../../lib/frontend/decodeToken';
import getToken from '../../../lib/frontend/getToken';
import { deleteQuiz, getQuizById } from '../../../prisma/quizzes';
import { QuizModel } from '../../../prisma/zod';

// This is the handler for the quiz requests that require a quiz id
const QuizId: NextApiHandler = async (req, res) => {
  switch (req.method) {
  case 'GET': {
    const { id: rawId } = req.query;
    const id = QuizModel.shape.id.parse(rawId);

    const quiz = await getQuizById(id);

    if (quiz) {
      return res.status(200).json(quiz);
    }
    return res.status(404).json({ message: 'Quiz not found' });
  }

  case 'DELETE': {
    const { id: rawId } = req.query;
    const id = QuizModel.shape.id.parse(rawId);
    console.log(id);

    const token = getToken(req);
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const { userId } = decodeToken(token);

    const quiz = await deleteQuiz(id, userId);
    if (quiz) {
      return res.status(200).json(quiz);
    }
    return res.status(404).json({ message: 'Quiz not found' });
  }

  default:
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
};

export default QuizId;
