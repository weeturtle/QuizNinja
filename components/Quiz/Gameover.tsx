import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';
import calculateScore, { calculateScoreReturn } from '../../lib/frontend/calculateScore';
import { QuestionType } from '../../prisma/zod';
import GameoverContainer from './GameoverContainer';

// Takes the score for the quiz and the total possible score
interface GameoverProps {
  score: number;
  questions: QuestionType[];
}

// Returns a gameover component which displays the game over screen
const Gameover: FC<GameoverProps> = ({ score, questions }) => {  
  // Creates a router object to change the url
  const router = useRouter();

  // Creates a state variable for the score breakdown
  const [scoreDetails, setScoreDetails] = useState<calculateScoreReturn | null>();

  // Calculates the score breakdown when the component is rendered
  useEffect(() => {
    setScoreDetails(calculateScore(score, questions));
  }, []);

  // Function to handle the return to quizzes button click
  const returnToQuizzes = () => {
    router.push('/quizzes');
  };



  // Calculates the score for the quiz as a percentage
  // States the score and the total possible score
  return (
    <GameoverContainer>
      <h1>Game Over</h1>
      <p>You scored {scoreDetails?.percentage}%</p>
      <p>Your score is {scoreDetails?.score}</p>
      <button onClick={returnToQuizzes}>
        Return to quizzes
      </button>
    </GameoverContainer>
  );
};

export default Gameover;