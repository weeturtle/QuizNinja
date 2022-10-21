import p5 from 'p5';
import { CollisionObject } from '../lib/GameObject';

// Class which represents a player cursor object
class PlayerCursor extends CollisionObject {
  // Stores the radius of the cursor
  radius: number;

  constructor() {
    super();
    // Sets the parameters to class attributes
    this.radius = 25;
  }

  // Function which updates the cursor's position
  update(p: p5) {
    // Updates the position of the cursor to the mouse position
    this.position.x = p.mouseX;
    this.position.y = p.mouseY;
  }

  // Function which renders the cursor
  render(p: p5) {
    p.push();
    // Sets the fill colour to the cursor colour
    p.fill('grey');
    // Draws a circle at the cursor position
    p.ellipse(this.position.x, this.position.y, this.radius);

    p.pop();
  }
}


export default PlayerCursor;