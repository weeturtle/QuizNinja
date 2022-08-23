/* eslint-disable @typescript-eslint/no-explicit-any */

import { NewQuizModel, QuizModel } from '../../prisma/zod';

// Validates an object to make sure it is a valid quiz
// Throws an error if the quiz is invalid
// Returns the quiz as a quiz type if it is valid
const validateQuiz = (quiz: (QuizModel | NewQuizModel | any)): QuizModel | NewQuizModel => {

  // // Checks basic quiz properties
  // if (!quiz.name) {
  //   throw new Error('Quiz name is required');
  // }
  // if (!quiz.questions) {
  //   throw new Error('Quiz questions are required');
  // }
  // if (!quiz.questions.length) {
  //   throw new Error('Quiz questions are required');
  // }

  // // Checks each question in the quiz
  // quiz.questions.forEach((question: any, i: number) => {

  //   // Validates each question's properties
  //   if (!question.question) {
  //     throw new Error(`Question ${i} is empty`);
  //   }
  //   if (!question.answers) {
  //     throw new Error(`Question ${i} answers are required`);
  //   }
  //   if (question.answers.length < 2) {
  //     throw new Error(`Question ${i} must have at least 2 answers`);
  //   }

  //   // Checks each answer in the question
  //   question.answers.forEach((answer: any, j: number) => {
  //     if (!answer.answer) {
  //       throw new Error(`Question ${i} answer ${j} is empty`);
  //     }
  //     if (!('isCorrect' in answer)) {
  //       throw new Error(`Question ${i} answer ${j} must state if it is correct`);
  //     }
  //   });
  // });


  
  // if (quiz.id) {
  //   return quiz as QuizId;
  // }
  // return quiz as Quiz;
  
  if (quiz.id) {
    return QuizModel.parse(quiz);
  }
  return NewQuizModel.parse(quiz);

};

export default validateQuiz;