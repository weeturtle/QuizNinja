import { NewQuizModel, QuizModel } from './zod';
import prisma from './prisma';
import { Quiz } from '@prisma/client';

// Function that runs when /api/quizzes is called without a query string
export const getAllQuizzes = async () => {
  // Get all of the quizzes from mongoDB
  const quizzes = await prisma.quiz.findMany();
  return quizzes;
};

// Function that runs when /api/quizzes is called with a query string
// Takes a subject id as a parameter
export const getQuizzesBySubjectId = async (subjectId: string) => {
  // Get the quizzes by subject id from mongoDB
  const quizzes = await prisma.quiz.findMany({
    where: {
      subjectId
    }
  });
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
export const deleteQuiz = async (id: string) => {
  // Delete the quiz by id from mongoDB
  const quiz = await prisma.quiz.delete({
    where: {
      id,
    }
  });

  // Return the quiz
  return quiz;
};

// Function that runs when /api/quiz/{id} is called with a PUT method
// Takes a quiz as a parameter
export const updateQuiz = async (rawQuiz: Quiz) => {
  // Convert the quiz to a Zod model
  // Validates the quiz against the Zod model
  const quiz = QuizModel.parse(rawQuiz);

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