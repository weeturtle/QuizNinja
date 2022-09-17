import p5 from 'p5';
import GameObjectCollection from './GameObjectCollection';
import Vector from '../Vector';

// Class which represents a game object
// This class is extended or implemented by all other game objects
export abstract class GameObject {
  // Stores the current position and velocity of the game object
  // This is a vector which stores the x and y position
  // Stored as a public attribute so it can be accessed by other classes
  public position: Vector;
  public velocity: Vector;

  constructor(position?: Vector, velocity?: Vector) {
    // Sets the position and velocity to the parameters
    // If no parameters are passed, sets the position and velocity to 0
    this.position = position || new Vector(0, 0);
    this.velocity = velocity || new Vector(0, 0);
  }
  
  // Defines how every instance of the class should have an update and render function
  abstract render (p: p5, collection: GameObjectCollection, id: number): void;
  abstract update (p: p5, collection: GameObjectCollection, id: number): void;
}


// Types the bounding box of a collision object
type BoundBox = {
  x: number;
  y: number;
  width: number;
  height: number;
}

export abstract class CollisionObject extends GameObject {
  // Stores the bounding box of the object
  protected boundBox: BoundBox;

  constructor(position?: Vector, velocity?: Vector, boundBox?: BoundBox) {
    // Calls the super constructor of the GameObject class
    super(position, velocity);
    // Sets the bounding box to the parameter
    // If no parameter is passed, sets the bounding box to 0
    this.boundBox = boundBox || { x: 0, y: 0, width: 0, height: 0 };
  }

  // Function which determines whether the object collides with another object
  // Takes the other object as a parameter
  collide(other: CollisionObject) {
    // Determines whether the bounding boxes of the two objects overlap
    // If they do, returns true
    return (
      this.position.x + this.boundBox.x < other.position.x + other.boundBox.x + other.boundBox.width &&
      this.position.x + this.boundBox.x + this.boundBox.width > other.position.x + other.boundBox.x &&
      this.position.y + this.boundBox.y < other.position.y + other.boundBox.y + other.boundBox.height &&
      this.position.y + this.boundBox.y + this.boundBox.height > other.position.y + other.boundBox.y
    );
  }

  // Function which shows the bounding box of the object
  // Takes the p5 instance as a parameter
  debugRender(p: p5) {
    p.push();
    // Sets the fill color to none
    p.noFill();
    // Sets the stroke color to red
    p.stroke('red');
    // Draws the bounding box
    p.rect(this.position.x + this.boundBox.x, this.position.y + this.boundBox.y, this.boundBox.width, this.boundBox.height);
    p.pop();
  }
}