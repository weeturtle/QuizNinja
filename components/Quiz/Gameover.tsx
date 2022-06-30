import { useRouter } from 'next/router';
import { FC } from 'react';
import calculateScore from '../../lib/frontend/calculateScore';
import GameoverContainer from './GameoverContainer';

// Takes the score for the quiz and the total possible score
interface GameoverProps {
  score: number;
  totalQuestions: number;
}

// Returns a gameover component which displays the game over screen
const Gameover: FC<GameoverProps> = ({ score, totalQuestions }) => {
  // Creates a router object to change the url
  const router = useRouter();

  // Function to handle the return to quizzes button click
  const returnToQuizzes = () => {
    router.push('/quizzes');
  };

  // Calculates the score for the quiz as a percentage
  // States the score and the total possible score
  return (
    <GameoverContainer>
      <h1>Game Over</h1>
      <p>You scored {calculateScore(score, totalQuestions).percentage}%</p>
      <p>Your score is {score} out of {totalQuestions}</p>
      <button onClick={returnToQuizzes}>
        Return to quizzes
      </button>
    </GameoverContainer>
  );
};

export default Gameover;