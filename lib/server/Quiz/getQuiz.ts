import { ObjectId } from 'mongodb';
import { NextApiHandler } from 'next';
import { connectToDatabase } from '../mongodb';

const getQuiz: NextApiHandler = async (req, res) => {
  // Awaits a connection to the database to be made
  // db object returned from the connectToDatabase function
  // This can be used to access the collections on the database
  const { db } = await connectToDatabase();

  // Extract queries from the request
  const queries = req.query;

  // If no id is provided, return an error
  if (!queries._id) {
    return res.status(400).json({ message: 'Missing id' });
  }

  // Gets the quizzes collection from the database
  const quizzesCollection = await db.collection('Quizzes')
    // Finds all the quizzes in the collection that match the quiz id
    .find({ _id: new ObjectId(queries._id as string) })
    // Returns them as an array
    .toArray();

  // If no quiz is found, return a 404
  if (quizzesCollection.length === 0) {
    return res.status(404).json({ message: 'Quiz not found' });
  }

  // Sends the quiz array back to the client as a JSON object
  // Sets the status code to 200 meaning successful
  res.status(200).json(quizzesCollection[0]);
};

export default getQuiz;