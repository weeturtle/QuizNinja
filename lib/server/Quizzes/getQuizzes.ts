import { NextApiHandler } from 'next';
import { connectToDatabase } from '../mongodb';

// Function called when a GET request is made about the quizzes
const getQuizzes: NextApiHandler = async (req, res) => {
  // Awaits a connection to the database to be made
  // db object returned from the connectToDatabase function
  // This can be used to access the collections on the database
  const { db } = await connectToDatabase();
  
  // Gets the quizzes collection from the database
  const quizzesCollection = db.collection('quizzes')
    // Finds all the quizzes in the collection and returns them as an array
    .find()
    .toArray();
  
  // Sends the quizzes array back to the client as a JSON object
  // Sets the status code to 200 meaning successful
  res.status(200).json(quizzesCollection);
};

export default getQuizzes;