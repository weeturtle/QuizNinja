import { Quiz } from '../types/Quiz';
import prisma from './prisma';
import { CompleteQuiz } from './zod';

export const getAllQuizzes = async () => {
  const quizzes = await prisma.quiz.findMany();
  console.table(quizzes);
  return quizzes;
};

export const addQuiz = async (quiz: CompleteQuiz) => {
  Quiz.parse(quiz);

  const { name, subjectId, questions, creatorId } = quiz;

  const newQuiz = await prisma.quiz.create({
    data: {
      name,
      subjectId,
      questions,
      creatorId
    }
  });

  return newQuiz;
};

export const getQuizById = async (id: string) => {
  const quiz = await prisma.quiz.findFirst({
    where: {
      id,
    }
  });

  return quiz;
};

export const deleteQuiz = async (id: string) => {
  const quiz = await prisma.quiz.delete({
    where: {
      id,
    }
  });

  return quiz;
};

export const updateQuiz = async (quiz: CompleteQuiz) => {
  Quiz.parse(quiz);

  const { name, subjectId, questions, creatorId } = quiz;

  const updatedQuiz = await prisma.quiz.update({
    where: {
      id: quiz.id,
    },
    data: {
      name,
      subjectId,
      questions,
      creatorId
    }
  });

  return updatedQuiz;
};