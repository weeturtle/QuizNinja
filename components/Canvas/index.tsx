import p5 from 'p5';
import { FC, useEffect, useRef } from 'react';

const Canvas: FC = () => {
  const canvasRef = useRef<HTMLDivElement>(null);


  const sketch = (p: p5) => {
    p.setup = () => {
      p.createCanvas(400, 400);
    };

    p.draw = () => {
      p.background(220);
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