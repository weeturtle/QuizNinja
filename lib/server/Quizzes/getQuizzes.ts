import { NextApiHandler } from 'next';
import { sampleQuizzes } from '../../../tests/sampleData';

const getQuizzes: NextApiHandler = async (req, res) => {
  res.status(200).json(sampleQuizzes);
};

export default getQuizzes;