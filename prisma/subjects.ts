import prisma from './prisma';

// Fetches all of the subjects from the database
export const getAllSubjects = async () => {
  // Returns an array of all the subjects
  const subjects = await prisma.subject.findMany();
  return subjects;
};