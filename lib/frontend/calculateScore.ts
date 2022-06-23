interface calculateScoreReturn {
  percentage: string;
  score: string;
}

const calculateScore = (score: number, questions: number): calculateScoreReturn => {
  const percentage = Math.floor((score / questions) * 100);
  const scoreText = `${score}/${questions}`;

  return {
    percentage: String(percentage),
    score: scoreText
  };
};

export default calculateScore;