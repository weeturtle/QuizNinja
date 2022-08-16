import { NextApiHandler } from 'next';
import { connectToDatabase } from '../mongodb';
import validateQuiz from '../../frontend/validateQuiz';
import { ObjectId } from 'mongodb';

const postQuiz: NextApiHandler = async (req, res) => {
  // Connect to the database
  const { db } = await connectToDatabase();  

  // Extract the quiz from the request body
  const quiz = req.body;

  try {
    // Validate the quiz before saving it to the database
    // This will throw an error if the quiz is invalid
    validateQuiz(quiz);

    // Add the quiz to the database
    db.collection('Quizzes').insertOne({
      // Creates a unique id for the quiz
      _id: ObjectId,
      // Deconstructs the quiz objects
      ...quiz
    });

    // Send a response back to the client
    res.status(200).json({ message: 'Quiz added successfully' });
    
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

export default postQuiz;