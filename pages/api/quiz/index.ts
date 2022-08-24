import { NextApiHandler } from 'next';
import decodeToken from '../../../lib/frontend/decodeToken';
import getToken from '../../../lib/frontend/getToken';
import { addQuiz, updateQuiz } from '../../../prisma/quizzes';

// This is the handler for the quiz requests that use the request body
const Quiz: NextApiHandler = async (req, res) => {
  switch (req.method) {
  case 'POST': {
    const user = await addQuiz(req.body);
    return res.status(200).json(user);
  }
  case 'PUT': {
    const token = getToken(req);
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const { userId } = decodeToken(token);

    const quiz = await updateQuiz(req.body, userId);

    if (quiz) {
      return res.status(200).json(quiz);
    }
    return res.status(404).json({ message: 'Quiz not found' });

  }
  default:
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
};

export default Quiz;