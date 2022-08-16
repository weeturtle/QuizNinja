import { NextApiHandler } from 'next';
import { connectToDatabase } from '../mongodb';

// Function called when a GET request is made about the quizzes
const getQuizzes: NextApiHandler = async (req, res) => {
  // Awaits a connection to the database to be made
  // db object returned from the connectToDatabase function
  // This can be used to access the collections on the database
  const { db } = await connectToDatabase();
  
  // Extract queries from the request
  const queries = req.query;

  // Gets the quizzes collection from the database
  const quizzesCollection = await db.collection('Quizzes')
    // Finds all the quizzes in the collection that match the queries
    // If no Queries are provided, it will return all the quizzes
    .find(queries || {})
    // Returns them as an array
    .toArray();

  // Sends the quizzes array back to the client as a JSON object
  // Sets the status code to 200 meaning successful
  res.status(200).json(quizzesCollection);
};

export default getQuizzes;