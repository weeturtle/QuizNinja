import { Quiz } from '@prisma/client';
import { NextApiHandler } from 'next';
import decodeToken from '../../../lib/frontend/decodeToken';
import getToken from '../../../lib/frontend/getToken';
import { addQuiz, getAllQuizzes, getQuizzesBySubjectId } from '../../../prisma/quizzes';
import { SubjectModel } from '../../../prisma/zod';

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
    // Calls the function to add a quiz to mongoDB
    const quiz = await addQuiz({
      name: 'Subtraction',
      subjectId: '6302ab0a7c672c804a6e5d51',
      questions: [
        {
          question: 'What is 1 - 1?',
          answers: [
            {
              answer: '0',
              isCorrect: true
            },
            {
              answer: '1',
              isCorrect: false
            }
          ]
        }
      ],
      creatorId: '63028dde7c672c804a6e5d42',
      private: true
    });
    return res.status(200).json(quiz);
  }

  default:
    // If the method is not supported, return a 405 error
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
};

export default Quizzes;