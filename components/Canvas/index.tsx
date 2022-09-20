import p5 from 'p5';
import { FC, useEffect, useRef } from 'react';
import GameObjectCollection from '../../p5/lib/GameObjectCollection';
import GameState, { GameStates } from '../../p5/GameState';
import SetupGame from '../../p5/SetUpGame';
import inGame from '../../p5/InGame';
import Questions from '../../p5/Questions';
import { QuestionType } from '../../prisma/zod';

interface GameCanvasProps {
  questions: QuestionType[];
  setInGame: (inGame: boolean) => void;
  setScore: (score: number) => void;
}

const GameCanvas: FC<GameCanvasProps> = ({ questions: quizQuestions, setInGame, setScore }) => {
  const canvasRef = useRef<HTMLDivElement>(null);

  const sketch = (p: p5) => {

    const gameObjects = new GameObjectCollection();
    const questions = new Questions(quizQuestions);
    const gameState = new GameState();

    p.setup = () => {
      p.createCanvas((window.innerWidth * 0.8), (window.innerHeight * 0.9));
    };
    
    p.draw = () => {
      p.background(89, 36, 12);

      switch(gameState.state) {
      case GameStates.NEW_GAME:
        SetupGame(gameObjects);
        gameState.state = GameStates.IN_GAME;
        break;
        
      case GameStates.IN_GAME:
        inGame(p, gameObjects, gameState, questions);
        break;
      
      case GameStates.GAME_OVER:
        setScore(gameObjects.query('score').next().value?.object.score);
        setInGame(false);
      }
    };
  };

  useEffect(() => {
    let p5Canvas: p5;

    if (canvasRef.current) {
      p5Canvas = new p5(sketch, canvasRef.current);
    }

    return () => {
      p5Canvas && p5Canvas.remove();
    };
  }, []);

  
  return <div ref={canvasRef} />;

};

export default GameCanvas;