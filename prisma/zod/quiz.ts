import * as z from 'zod';
import { QuestionType, CompleteSubject, RelatedSubjectModel, RelatedQuestionModel, CompleteUser, RelatedUserModel } from './index';

export const QuizModel = z.object({
  id: z.string(),
  name: z.string(),
  subjectId: z.string().nullish(),
  creatorId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

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
export const RelatedQuizModel: z.ZodSchema<CompleteQuiz> = z.lazy(() => QuizModel.extend({
  questions: RelatedQuestionModel.array(),
  subject: RelatedSubjectModel.nullish(),
  creator: RelatedUserModel,
}));
