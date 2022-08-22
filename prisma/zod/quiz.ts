import * as z from 'zod';
import { CompleteSubject, RelatedSubjectModel, CompleteUser, RelatedUserModel } from './index';

// Defines the type of an answer
// Must contain an answer and a boolean indicating if it is correct
export const CompleteAnswer = z.object({
  answer: z.string(),
  isCorrect: z.boolean(),
});

export type AnswerType = z.infer<typeof CompleteAnswer>;

// Defines the type of a question
// Must contain a question and an array of answers
export const CompleteQuestion = z.object({
  question: z.string(),
  answers: z.array(CompleteAnswer).min(2).max(4),
});

export type QuestionType = z.infer<typeof CompleteQuestion>;

// Defines the module that is returns when a quiz is fetched from the database
export const QuizModel = z.object({
  id: z.string(),
  name: z.string(),
  private: z.boolean(),
  subjectId: z.string().nullish(),
  creatorId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  questions: z.array(CompleteQuestion),
});

// Defines the type of a new quiz
// Automates validation of the quiz
export const NewQuizModel = z.object({
  name: z.string(),
  private: z.boolean(),
  subjectId: z.string().nullish(),
  creatorId: z.string(),
  questions: z.array(CompleteQuestion),
});

// Exports the types of the models
export type QuizModel = z.infer<typeof QuizModel>;
export type NewQuizModel = z.infer<typeof NewQuizModel>;

// When a quiz is fetched from the database, it is converted to this type 
export interface CompleteQuiz extends z.infer<typeof QuizModel> {
  questions: QuestionType[]
  subject?: CompleteSubject | null
  creator: CompleteUser
}

/**
 * RelatedQuizModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */

export const RelatedQuestionModel: z.ZodSchema<QuestionType> = z.lazy(() => CompleteQuestion.extend({
  answers: CompleteAnswer.array(),
}));

export const RelatedQuizModel: z.ZodSchema<CompleteQuiz> = z.lazy(() => QuizModel.extend({
  questions: RelatedQuestionModel.array(),
  subject: RelatedSubjectModel.nullish(),
  creator: RelatedUserModel,
}));
