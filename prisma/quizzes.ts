import { NewQuizModel, QuizModel } from './zod';
import prisma from './prisma';
import { Quiz } from '@prisma/client';
import userCanEdit from '../lib/server/Auth/userCanEdit';

// Function called to find the user's own quizzes
export const getUsersPrivateQuizzes = async (userId: string): Promise<Quiz[]> => {
  // Finds the user's private quizzes
  const quizzes = await prisma.quiz.findMany({
    where: {
      creatorId: userId,
    },
  });

  console.table(quizzes);
  return quizzes;
};

// Function called to find all public quizzes
export const getPublicQuizzes = async (userId: string): Promise<Quiz[]> => {
  // Finds all of the public quizzes
  const quizzes = await prisma.quiz.findMany({
    where: {
      private: false,
    },
  });

  return quizzes.filter((quiz) => quiz.creatorId !== userId);
};

// Function that runs when /api/quizzes is called without a query string
export const getAllQuizzes = async (userId: string) => {
  // Get all of the quizzes from mongoDB
  const privateQuizzes = await getUsersPrivateQuizzes(userId);
  const publicQuizzes = await getPublicQuizzes(userId);
  
  // Combine the private and public quizzes
  // Private quizzes are always at the top of the array
  // Removes duplicates
  const quizzes = [...publicQuizzes, ...privateQuizzes];
  return quizzes;
};

// Function that runs when /api/quizzes is called with a query string
// Takes a subject id as a parameter
export const getQuizzesBySubjectId = async (userId: string, subjectId: string) => {
  // Gets all quizzes accessible to the user
  const allQuizzes = await getAllQuizzes(userId);

  // Filters the quizzes by the subject id
  const quizzes = allQuizzes.filter(quiz => quiz.subjectId === subjectId);
  return quizzes;
};

// Function that runs when /api/quizzes is called with a POST method
// Takes a quiz as a parameter
export const addQuiz = async (rawQuiz: NewQuizModel) => {
  // Convert the quiz to a Zod model
  // Validates the quiz against the Zod model
  const quiz = NewQuizModel.parse(
    rawQuiz
  );

  // Add the quiz to mongoDB
  // Stores the quiz that was added
  const newQuiz = await prisma.quiz.create({
    data: quiz
  });

  // Return the quiz that was added
  return newQuiz;
};

// Function that runs when /api/quiz/{id} is called
// Takes a quiz id as a parameter
export const getQuizById = async (id: string) => {
  // Get the quiz by id from mongoDB
  const quiz = await prisma.quiz.findFirst({
    where: {
      id,
    }
  });

  // Return the quiz
  return quiz;
};

// Function that runs when /api/quiz/{id} is called with a DELETE method
export const deleteQuiz = async (id: string, userId: string) => {
  // Check if the user is the creator of the quiz
  const hasRight = await userCanEdit(id, userId);
  
  // If the user is the creator of the quiz
  // Delete the quiz from mongoDB
  const quiz = hasRight && await prisma.quiz.delete({
    where: {
      id,
    }
  });

  // Return the quiz
  return quiz;
};

// Function that runs when /api/quiz/{id} is called with a PUT method
// Takes a quiz as a parameter
export const updateQuiz = async (rawQuiz: Quiz, userId: string) => {
  // Convert the quiz to a Zod model
  // Validates the quiz against the Zod model
  const quiz = QuizModel.parse({
    ...rawQuiz,
    updatedAt: new Date(rawQuiz.updatedAt),
    createdAt: new Date(rawQuiz.createdAt),
  });

  // Check if user has right to edit the quiz
  const hasRight = await userCanEdit(quiz.id, userId);

  // If the user does not have edit rights to the quiz
  if (!hasRight) return null;

  // Extracts the information from the quiz model
  // Not all of the information can be changed
  const { id, name, subjectId, questions } = quiz;

  // Update the quiz by id in mongoDB
  const updatedQuiz = await prisma.quiz.update({
    where: {
      id,
    },
    data: {
      name,
      subjectId,
      questions,
    }
  });

  // Return the quiz
  return updatedQuiz;
};