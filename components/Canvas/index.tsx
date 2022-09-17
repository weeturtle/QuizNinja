import p5 from 'p5';
import { FC, useEffect, useRef } from 'react';
import GameObjectCollection from '../../p5/lib/GameObjectCollection';
import GameState from '../../p5/GameState';
import SetupGame from '../../p5/SetUpGame';

const Canvas: FC = () => {
  const canvasRef = useRef<HTMLDivElement>(null);


  const sketch = (p: p5) => {

    let gameObjects = new GameObjectCollection();
    let gameState = GameState.NEW_GAME;

    p.setup = () => {
      p.createCanvas(1200, 800);
    };

    
    p.draw = () => {
      p.background(0);

      switch(gameState) {
      case GameState.NEW_GAME:
        SetupGame(p, gameObjects);
        gameState = GameState.IN_GAME;
        break;
        
      case GameState.IN_GAME:
        gameObjects.update(p);
        gameObjects.render(p);
        break;
      
      case GameState.GAME_OVER:
        gameObjects = new GameObjectCollection();
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

  
  return (
    <div ref={canvasRef} />
  );

};

export default Canvas;