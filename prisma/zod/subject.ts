import * as z from 'zod';
import { CompleteQuiz, RelatedQuizModel } from './index';

// Defines the type of a subject returned from the database
export const SubjectModel = z.object({
  id: z.string(),
  name: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// Removes the dates from the subject model
// Allows for the subject model to be used in the frontend
export const SubjectPartial = SubjectModel.omit({
  createdAt: true,
  updatedAt: true,
});

export type SubjectPartial = z.infer<typeof SubjectPartial>;

// Defines the type of a subject returned from the database
// This stops the serialising error
export const SubjectsPartial = z.array(SubjectPartial);

export type SubjectsPartial = z.infer<typeof SubjectsPartial>;

// Defines the advanced type fetched using a connected query
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
