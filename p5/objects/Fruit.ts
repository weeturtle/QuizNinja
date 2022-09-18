import p5 from 'p5';
import { CollisionObject } from '../lib/GameObject';
import GameObjectCollection from '../lib/GameObjectCollection';
import generateArc from '../lib/GenerateArc';
import Vector from '../Vector';
import Lives from './Lives';

// Possible fruit types
export enum Fruits {
  MELON = 'melon',
  WATERMELON = 'watermelon',
  PINEAPPLE = 'pineapple'
}

type FruitType = {
  [key in Fruits]: {
    colour: number[],
    radius: number
  }
}

export const fruits: FruitType = {
  [Fruits.MELON]: {
    colour: [15, 110, 0],
    radius: 75,
  },
  [Fruits.WATERMELON]: {
    colour: [189, 0, 0],
    radius: 100,
  },
  [Fruits.PINEAPPLE]: {
    colour: [252, 223, 3],
    radius: 125,
  }
};

// Class which represents a fruit object
// Inherits from the CollisionObject class
class Fruit extends CollisionObject {
  // The type of the fruit
  type: Fruits;
  // Takes the size of the fruit
  radius: number;
  // Determines whether the fruit was sliced or not
  wasSliced: boolean;
  // Colour of the fruit
  colour: number[];


  constructor(
    type: Fruits,
  ) {
    const { radius, colour } = fruits[type];
    // Call the super constructor
    // With the starting position and a random velocity
    // Adds a square bounding box around the object
    super(new Vector(50, 600), generateArc(), {
      x: -radius / 2,
      y: -radius / 2,
      width: radius,
      height: radius
    });

    // Sets the parameters to class attributes
    this.type = type;
    this.colour = colour;
    this.radius = radius;
    this.wasSliced = false;
  }

  // Function that is called on every frame
  // Takes the p5 instance and the game object collection as well as its id
  update(p:p5, collection: GameObjectCollection, id: number) {
    // Updates the position of the object depending on its velocity
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    // Accelerates the fruit downwards
    this.velocity.y += 0.015;
    
    // Determines whether the fruit has hit the floor
    const { object: floorObject } = [...collection.query('floor')][0];
    if (this.collide(floorObject as CollisionObject)) {
      if (!this.wasSliced) {
        const { object: lives } = [...collection.query('lives')][0];
        (lives as Lives).decreaseLives();
      }
      collection.remove(id);
    }

    // Determines whether the fruit has been sliced
    const { object: playerObject } = [...collection.query('player')][0];

    // Checks if the fruit and cursor are colliding
    if (this.collide(playerObject as CollisionObject) && !this.wasSliced) {
      // If the fruit was not sliced yet
      // Slices the fruit
      this.wasSliced = true;
      // Fruit stops path and falls to the floor
      this.velocity.x = 0;
      this.velocity.y = 0;
    }
  }

  // Function which is called on every frame
  render(p: p5) {
    p.push();

    // Draws the fruit
    // Depending on the type of the fruit and whether it was sliced or not
    p.fill(this.colour);

    // Draws the fruit as a circle
    p.ellipse(this.position.x, this.position.y, this.radius);

    p.pop();
  }
}

export default Fruit;