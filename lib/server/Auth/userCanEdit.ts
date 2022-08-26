const userCanEdit = async (quizId: string, userId: string) => {
  // Get the quiz by id from mongoDB
  const quiz = await prisma.quiz.findUnique({
    where: {
      id: quizId,
    },
    select: {
      creatorId: true,
    },
  });

  // Check if the user is the creator of the quiz
  if (quiz?.creatorId === userId) {
    // Return true
    return true;
  }

  // Return false
  return false;
};

export default userCanEdit;