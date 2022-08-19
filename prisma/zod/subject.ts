import * as z from 'zod';
import { CompleteQuiz, RelatedQuizModel } from './index';

export const SubjectModel = z.object({
  id: z.string(),
  name: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export interface CompleteSubject extends z.infer<typeof SubjectModel> {
  quizzes: CompleteQuiz[]
}

/**
 * RelatedSubjectModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedSubjectModel: z.ZodSchema<CompleteSubject> = z.lazy(() => SubjectModel.extend({
  quizzes: RelatedQuizModel.array(),
}));
