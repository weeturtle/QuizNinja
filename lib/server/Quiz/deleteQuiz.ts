import { ObjectId } from 'mongodb';
import { NextApiHandler } from 'next';
import { connectToDatabase } from '../mongodb';

const deleteQuiz: NextApiHandler = async (req, res) => {
  // Awaits a connection to the database to be made
  // db object returned from the connectToDatabase function
  const { db } = await connectToDatabase();

  // Extract queries from the request
  const queries = req.query;

  if (!queries.id) {
    return res.status(400).json({
      message: 'Missing id'
    });
  }

  // Gets the quizzes collection from the database
  const deletedQuiz = await db.collection('Quizzes')
    // Deletes the quiz with the matching id
    .deleteOne({ id: new ObjectId(queries.id as string) });

  // If no quiz is found and deleted, return a 404
  if (deletedQuiz.deletedCount === 0) {
    return res.status(404).json({
      message: 'Quiz not found'
    });
  }

  // Sends a success message back to the client
  return res.status(200).json({ 
    message: 'Quiz deleted'
  });
};

export default deleteQuiz;