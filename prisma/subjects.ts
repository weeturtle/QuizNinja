import prisma from './prisma';
import { SubjectModel } from './zod';

// Fetches all of the subjects from the database
export const getAllSubjects = async () => {
  // Returns an array of all the subjects
  const subjects = await prisma.subject.findMany();
  return subjects;
};

export const createSubject = async (subjectName: string) => {
  // Validates the subject name
  const name = SubjectModel.shape.name.parse(subjectName);
  
  // Creates a new subject in the database
  const subject = await prisma.subject.create({
    data: {
      name,
    },
  });

  // Returns the new subject
  return subject;
};