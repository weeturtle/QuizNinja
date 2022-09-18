import p5 from 'p5';
import { CollisionObject } from '../lib/GameObject';
import Vector from '../Vector';

// Class which represents a floor object
// Inherits from the CollisionObject class
class Floor extends CollisionObject {
  constructor () {
    // Call the super constructor
    // Positions the floor at the bottom of the screen
    // Has a bounding box around it
    super(new Vector(0, 830), new Vector(0, 0), {
      x: 0,
      y: 0,
      width: 1650,
      height: 120
    });
  }

  update() {
    // Does nothing for now
  }

  render(p: p5) {
    p.push();

    // Sets the fill colour to orange
    p.fill(46, 18, 6);
    // Draws a rectangle at the floor's position
    // Covers the whole width of the screen
    p.rect(this.position.x, this.position.y, 1650, 120);
    
    p.pop();
  }
}

export default Floor;