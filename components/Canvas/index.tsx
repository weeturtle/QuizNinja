import p5 from 'p5';
import { FC, useEffect, useRef } from 'react';
import GameObjectCollection from '../../p5/lib/GameObjectCollection';
import GameState, { GameStates } from '../../p5/GameState';
import SetupGame from '../../p5/SetUpGame';
import inGame from '../../p5/InGame';
import Questions from '../../p5/Questions';
import { QuestionType } from '../../prisma/zod';

// The game canvas component displays the game canvas and handles the game state
// questions - the array of questions to be used in the game
// setInGame - the function to set the game state
// setScore - the function to set the score
interface GameCanvasProps {
  questions: QuestionType[];
  setInGame: (inGame: boolean) => void;
  setScore: (score: number) => void;
}

const GameCanvas: FC<GameCanvasProps> = ({ questions: quizQuestions, setInGame, setScore }) => {
  // The canvas ref is used to link the div to the p5 instance
  const canvasRef = useRef<HTMLDivElement>(null);

  // The sketch function is run when the p5 instance is first created
  const sketch = (p: p5) => {

    // The initial collection of game objects is empty
    const gameObjects = new GameObjectCollection();

    // The question handler is created with the questions parsed from the props
    const questions = new Questions(quizQuestions);
    
    // The initial game state is set to the new game state
    const gameState = new GameState();

    // The setup function is run once when the p5 instance has been established
    p.setup = () => {
      // The dimensions of the canvas are set to a percentage of the window size
      p.createCanvas((window.innerWidth * 0.8), (window.innerHeight * 0.9));
    };
    
    // The draw function is run every frame
    p.draw = () => {
      // The background is set to brown
      p.background(89, 36, 12);

      // The game state is checked to determine which game state function to run
      switch(gameState.state) {
      case GameStates.NEW_GAME:
        // The setup game function is run to set up the game objects
        SetupGame(gameObjects);
        // The game state is set to the in game state
        gameState.state = GameStates.IN_GAME;
        break;
        
      case GameStates.IN_GAME:
        // The in game function is run to update the game objects
        inGame(p, gameObjects, gameState, questions);
        break;
      
      case GameStates.GAME_OVER:
        // The game over function is run to display the game over screen
        setScore(gameObjects.query('score').next().value?.object.score);
        setInGame(false);
      }
    };
  };

  // The useEffect hook is used to create the p5 instance
  // on mount and destroy it on unmount
  useEffect(() => {
    // Only one p5 instance can be created per canvas
    let p5Canvas: p5;

    // If the canvas ref is available
    if (canvasRef.current) {
      // Create a new p5 instance and link it to the canvas ref
      p5Canvas = new p5(sketch, canvasRef.current);
    }

    // When the component is unmounted
    // the p5 instance is destroyed
    return () => {
      p5Canvas && p5Canvas.remove();
    };
  }, []);

  // The div containing the canvas is returned
  return <div ref={canvasRef} />;
};

export default GameCanvas;