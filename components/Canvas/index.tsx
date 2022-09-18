import p5 from 'p5';
import { FC, useEffect, useRef, useState } from 'react';
import GameObjectCollection from '../../p5/lib/GameObjectCollection';
import GameState, { GameStates } from '../../p5/GameState';
import SetupGame from '../../p5/SetUpGame';
import inGame from '../../p5/InGame';

const Canvas: FC = () => {
  const canvasRef = useRef<HTMLDivElement>(null);

  const [displayGame, setDisplayGame] = useState(true);

  const sketch = (p: p5) => {

    const gameObjects = new GameObjectCollection();
    const gameState = new GameState();

    p.setup = () => {
      p.createCanvas(1650, 950);
    };
    
    p.draw = () => {
      p.background(89, 36, 12);

      switch(gameState.state) {
      case GameStates.NEW_GAME:
        SetupGame(gameObjects);
        gameState.state = GameStates.IN_GAME;
        break;
        
      case GameStates.IN_GAME:
        inGame(p, gameObjects, gameState);
        break;
      
      case GameStates.GAME_OVER:
        setDisplayGame(false);
      }
    };
  };

  useEffect(() => {
    let p5Canvas: p5;

    if (canvasRef.current) {
      p5Canvas = new p5(sketch, canvasRef.current);
    }

    return () => {
      p5Canvas.remove();
    };
  }, []);

  
  return displayGame ? (
    <div ref={canvasRef} />
  ) : null;

};

export default Canvas;