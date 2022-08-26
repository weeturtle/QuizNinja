import { Quiz } from '@prisma/client';
import { NextApiHandler } from 'next';
import decodeToken from '../../../lib/frontend/decodeToken';
import getToken from '../../../lib/frontend/getToken';
import { addQuiz, getAllQuizzes, getQuizzesBySubjectId } from '../../../prisma/quizzes';
import { NewQuizModel, SubjectModel } from '../../../prisma/zod';

// Function that runs when /api/quizzes is called
// Takes a request and a response parameter
// Request is the object containing information about the request like the method
// Response is the object that is used to send data back to the client
const Quizzes: NextApiHandler = async (req, res) => {
  // Depending on the method, call the appropriate function
  switch (req.method) {
  case 'GET': {
    // Creates an empty array to store the quizzes
    let quizzes: Quiz[];

    // Gets the user's id from the token
    const { userId } = decodeToken(getToken(req) as string);

    // Extracts the subject id from the query string
    const { subjectId: rawSubjectId } = req.query;

    // If the subject id is not empty, get the quizzes by subject id
    if (rawSubjectId) {
      // Check the subject id is a string and convert it to that
      const subjectId = SubjectModel.shape.id.parse(rawSubjectId);

      // Get the quizzes by subject id
      quizzes = await getQuizzesBySubjectId(userId, subjectId);
    } else {
      // Get all of the quizzes
      quizzes = await getAllQuizzes(userId);
    }

    // Sorts the quizzes in order of private quizzes first
    // Then sorts the quizzes by the quiz name alphabetically
    const sortedQuizzes = quizzes.sort((a, b) => {
      if (a.private) {
        return -1;
      }
      if (b.private) {
        return 1;
      }
      return a.name < b.name ? -1 : 1;
    });

    console.table(sortedQuizzes);

    // Send the quizzes back to the client
    return res.status(200).json(sortedQuizzes);
  }
  
  case 'POST': {
    // Gets the user's id from the token
    const token = getToken(req);
    if (!token) return res.status(401).json({ error: 'Unauthorized' });

    // Fetches the user's id from the token
    const { userId } = decodeToken(token);

    // Calls the function to add a quiz to mongoDB
    const { name, subjectId, private: isPrivate, questions } = req.body;

    // Validates the quiz against the Zod model
    const newQuiz = NewQuizModel.parse({
      name,
      subjectId,
      private: isPrivate,
      questions,
      creatorId: userId
    });

    // Adds the quiz to mongoDB
    const quiz = await addQuiz(newQuiz);
    
    // Returns the new quiz to the client
    return res.status(200).json(quiz);
  }

  default:
    // If the method is not supported, return a 405 error
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
};

export default Quizzes;