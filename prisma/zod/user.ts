import * as z from 'zod';
import { CompleteQuiz, RelatedQuizModel } from './index';

// Defines the regular model of a user returned from the database
export const UserModel = z.object({
  id: z.string(),
  firstname: z.string(),
  lastname: z.string(),
  email: z.string(),
  password: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// Defines the lesser model used when creating a user
export const NewUserModel = UserModel.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// Defines the lesser model commonly used 
// Reduces unnecessary data when sending a user 
export const PartialUserModel = UserModel.omit({
  password: true,
  createdAt: true,
  updatedAt: true,
});

// Exports the types of the user models
export type PartialUserModel = z.infer<typeof PartialUserModel>;
export type NewUserModel = z.infer<typeof NewUserModel>;

// Defines the advanced type fetched using a connected query
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
