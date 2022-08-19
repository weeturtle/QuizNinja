import { NextApiHandler } from 'next';
import { getAllQuizzes } from '../../../prisma/quizzes';

// Function that runs when /api/quizzes is called
// Takes a request and a response parameter
// Request is the object containing information about the request like the method
// Response is the object that is used to send data back to the client
const Quizzes: NextApiHandler = async (req, res) => {
  // Depending on the method, call the appropriate function
  switch (req.method) {
  case 'GET': {
    // Calls the function to fetch the quizzes from mongoDB
    const quizzes = await getAllQuizzes();
    return res.status(200).json(quizzes);
  }
  default:
    // If the method is not supported, return a 405 error
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
};

export default Quizzes;