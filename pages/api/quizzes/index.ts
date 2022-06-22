import { NextApiHandler } from 'next';
import getQuizzes from '../../../lib/server/Quizzes/getQuizzes';


const Quizzes: NextApiHandler = async (req, res) => {
  switch (req.method) {
  case 'GET':
    return getQuizzes(req, res);
  default:
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
};

export default Quizzes;