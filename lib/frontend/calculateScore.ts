// States the object that will be returned by the function
// percentage: string - the integer percentage of the score given as a string
// score: string - the score out of maximum score given as a string 
interface calculateScoreReturn {
  percentage: string;
  score: string;
}

// Function that will calculate the score
const calculateScore = (score: number, questions: number): calculateScoreReturn => {
  // Divides the score by the number of questions
  // Multiplies the result by 100
  // Rounds the result to the nearest integer
  const percentage = Math.floor((score / questions) * 100);
  
  // Creates a string of the questions correct
  // Out of the total number of questions
  const scoreText = `${score}/${questions}`;

  // Returns the object with the percentage and score both as strings
  return {
    percentage: String(percentage),
    score: scoreText
  };
};

export default calculateScore;