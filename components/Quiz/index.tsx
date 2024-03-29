import dynamic from 'next/dynamic';
import { FC, useState } from 'react';
import { PartialUserModel } from '../../prisma/zod';
import {  QuizType } from '../../types/Quiz';
import Gameover from './Gameover';

// Import and render the canvas component
// This is done dynamically to prevent the canvas from being rendered on the server
// This is because the canvas uses the window object which is not available on the server
const GameCanvas = dynamic(() => import('../Canvas/index'), { ssr: false });

// Defines the props for the Quiz game component
// Takes a quiz as a parameter
interface QuizProps {
  quiz: QuizType;
  user: PartialUserModel;
}

const QuizType: FC<QuizProps> = ({ quiz }) => {
  // Creates a state variable for whether the game is in progress
  const [inGame, setInGame] = useState(true);

  // Creates a state variable for the final score 
  // Current score is stored within a component in the game object collection
  const [score, setScore] = useState(0);

  return (
    <>
      { // If the game is in progress, render the canvas
        inGame && (
          <GameCanvas questions={quiz.questions} setInGame={setInGame} setScore={setScore} />
        )
      }
      { // Displays a game over screen after all of the questions
        !inGame && (
          <Gameover score={score} questions={quiz.questions} />
        )
      }
    </>
  );
};

export default QuizType;