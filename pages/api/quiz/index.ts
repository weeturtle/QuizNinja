import { NextApiHandler } from 'next';
import postQuiz from '../../../lib/server/Quiz/postQuiz';
import putQuiz from '../../../lib/server/Quiz/putQuiz';

const Quiz: NextApiHandler = async (req, res) => {
  switch (req.method) {
  case 'POST':
    return postQuiz(req, res);
  case 'PUT':
    return putQuiz(req, res);
  default:
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
};

export default Quiz;