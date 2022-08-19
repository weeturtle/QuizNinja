import { z } from 'zod';

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

export const RelatedQuestionModel: z.ZodSchema<QuestionType> = z.lazy(() => CompleteQuestion.extend({
  answers: CompleteAnswer.array(),
}));