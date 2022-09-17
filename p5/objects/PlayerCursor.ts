import p5 from 'p5';
import { CollisionObject } from '../lib/GameObject';

class PlayerCursor extends CollisionObject {
  radius: number;
  colour: p5.Color;

  constructor(
    radius: number,
    colour: p5.Color
  ) {
    super();
    this.radius = radius;
    this.colour = colour;
  }

  update(p: p5) {
    this.position.x = p.mouseX;
    this.position.y = p.mouseY;
  }

  render(p: p5) {
    p.push();

    p.fill(this.colour);
    p.ellipse(this.position.x, this.position.y, this.radius);

    p.pop();
  }
}


export default PlayerCursor;