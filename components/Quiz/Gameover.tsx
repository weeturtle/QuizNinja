import { useRouter } from 'next/router';
import { FC } from 'react';
import calculateScore from '../../lib/frontend/calculateScore';
import GameoverContainer from './GameoverContainer';

interface GameoverProps {
  score: number;
  totalQuestions: number;
}

const Gameover: FC<GameoverProps> = ({ score, totalQuestions }) => {
  const router = useRouter();

  const returnToQuizzes = () => {
    router.push('/quizzes');
  };

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