import p5 from 'p5';
import { FC, useEffect, useRef } from 'react';
import GameObjectCollection from '../../lib/p5/GameObjectCollection';
import GameState from '../../lib/p5/GameState';
import PlayerCursor from '../../lib/p5/PlayerCursor';

const Canvas: FC = () => {
  const canvasRef = useRef<HTMLDivElement>(null);


  const sketch = (p: p5) => {

    const gameObjects = new GameObjectCollection();
    let gameState = GameState.NEW_GAME;

    p.setup = () => {
      p.createCanvas(400, 400);
    };
    
    p.draw = () => {
      switch(gameState) {
      case GameState.NEW_GAME:
        gameObjects.add(new PlayerCursor(p.createVector(0, 0), p.createVector(0, 0), 25, p.color(100, 20, 14)), 'player');
        gameState = GameState.IN_GAME;
        break;
        
      case GameState.IN_GAME:
        gameObjects.update(p);
        gameObjects.render(p);
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
  }, [canvasRef.current]);

  
  return (
    <div ref={canvasRef} />
  );

};

export default Canvas;