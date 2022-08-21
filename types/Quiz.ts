import { z } from 'zod';

// Defines the type of an answer
// Must contain an answer and a boolean indicating if it is correct
export const Answer = z.object({
  answer: z.string(),
  isCorrect: z.boolean(),
});

export type AnswerType = z.infer<typeof Answer>;

// Defines the type of a question
// Must contain a question and an array of answers
export const Question = z.object({
  question: z.string(),
  answers: z.array(Answer).min(2).max(4),
});

export type QuestionType = z.infer<typeof Question>;

// Defines the type of a quiz
// Must contain a name and an array of questions
// May contain a subject
export const QuizId = z.object({
  id: z.string().length(24),
  name: z.string(),
  subject: z.string().optional(),
  questions: z.array(Question).min(1),
});

export type QuizIdType = z.infer<typeof QuizId>;


// Defines the type of a quiz collection
// Extends the Quiz type with an id property
export const Quiz = QuizId.omit({'id': true});

export type QuizType = z.infer<typeof Quiz>;
