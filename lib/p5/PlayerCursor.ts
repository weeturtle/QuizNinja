import p5 from 'p5';
import GameObject from './GameObject';

class PlayerCursor extends GameObject {
  radius: number;
  colour: p5.Color;

  constructor(
    position: p5.Vector,
    velocity: p5.Vector,
    radius: number,
    colour: p5.Color
  ) {
    super(position, velocity);
    this.radius = radius;
    this.colour = colour;
  }

  update(p: p5) {
    this.position = p.createVector(p.mouseX, p.mouseY);
  }

  render(p: p5) {
    p.fill(this.colour);
    p.ellipse(this.position.x, this.position.x, this.radius);
  }
}


export default PlayerCursor;