import * as z from 'zod';
import { CompleteQuiz, RelatedQuizModel } from './index';

export const UserModel = z.object({
  id: z.string(),
  firstname: z.string(),
  lastname: z.string(),
  email: z.string(),
  password: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export interface CompleteUser extends z.infer<typeof UserModel> {
  quizzes: CompleteQuiz[]
}

/**
 * RelatedUserModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedUserModel: z.ZodSchema<CompleteUser> = z.lazy(() => UserModel.extend({
  quizzes: RelatedQuizModel.array(),
}));
