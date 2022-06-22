import { ObjectId } from 'mongodb';
import { NextApiHandler } from 'next';
import validateQuiz from '../../frontend/validateQuiz';
import { connectToDatabase } from '../mongodb';

const putQuiz: NextApiHandler = async (req, res) => {
  // Awaits a connection to the database to be made
  // db object returned from the connectToDatabase function
  const { db } = await connectToDatabase();

  // Extract quiz from the request
  const quiz = req.body;

  try {
    // Validate the quiz before saving it to the database
    // This will throw an error if the quiz is invalid
    validateQuiz(quiz);

    // Update the quiz on the database
    // The quiz is found by its id and the new quiz is passed in
    const updateResult = await db.collection('Quizzes').updateOne({
      _id: new ObjectId(quiz._id)
    }, quiz);

    // If no quiz is found and updated, return a 404
    if (updateResult.modifiedCount === 0) {
      return res.status(404).json({
        message: 'Quiz not found'
      });
    }

    // Send a success message back to the client
    return res.status(200).json({
      message: 'Quiz updated successfully'
    });

  } catch (error) {

    // Send an error message back to the client
    let message = 'Error validating quiz';
    if (error instanceof Error) {
      message = error.message;
    }
    
    // If the quiz is invalid, return a 400 error
    return res.status(400).json({ message });
  }
};

export default putQuiz;
