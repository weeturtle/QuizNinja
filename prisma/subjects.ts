export const getAllSubjects = async () => {
  const subjects = await prisma.subject.findMany();
  return subjects;
};