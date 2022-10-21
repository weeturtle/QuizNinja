import p5 from 'p5';
import { AnswerType } from '../../prisma/zod';
import { CollisionObject } from '../lib/GameObject';
import GameObjectCollection from '../lib/GameObjectCollection';
import generateArc from '../lib/GenerateArc';
import Vector from '../Vector';
import Lives from './Lives';
import Score from './Score';

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
    radius: 115,
  },
  [Fruits.WATERMELON]: {
    colour: [189, 0, 0],
    radius: 125,
  },
  [Fruits.PINEAPPLE]: {
    colour: [252, 223, 3],
    radius: 135,
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
  // Answer of the fruit
  answer: AnswerType;


  constructor(
    type: Fruits,
    answer: AnswerType
  ) {
    const { radius, colour } = fruits[type];
    // Call the super constructor
    // With the starting position and a random velocity
    // Adds a square bounding box around the object
    super(new Vector(50, (window.innerHeight * 0.9 - 120 - radius)), generateArc(30), {
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
    this.answer = answer;
  }

  // Function that is called on every frame
  // Takes the p5 instance and the game object collection as well as its id
  update(p:p5, collection: GameObjectCollection, id: number) {
    // Updates the position of the object depending on its velocity
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    const { object: lives } = collection.query('lives').next().value as { object: Lives };
    const { object: score } = collection.query('score').next().value as { object: Score };
    
    // Accelerates the fruit downwards
    this.velocity.y += 0.015;
    
    // Determines whether the fruit has hit the floor
    const { object: floorObject } = [...collection.query('floor')][0];

    // If the fruit has hit the floor
    if (this.collide(floorObject as CollisionObject)) {
      // If the fruit was not sliced and the answer was correct
      if (!this.wasSliced && this.answer.isCorrect) {
        // Decrease the number of lives by 1
        lives.decreaseLives();
      }

      // Removes the fruit from the game object collection
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

      // If the answer is correct and the fruit was not sliced yet
      if (this.answer.isCorrect) {
        // Increase the score by 1
        score.increaseScore();
      } else {
        // If the answer is incorrect and the fruit was not sliced yet
        // Decrease the lives by 1
        lives.decreaseLives();
      }
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

    // Draws the answer within the fruit
    p.fill('black');
    p.textAlign('center', 'center');
    
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    p.textWrap('WORD');
    p.textSize(15);
    p.text(
      this.answer.answer,
      this.position.x - this.radius/2, this.position.y - this.radius/2,
      this.radius, this.radius
    );
    p.pop();
  }
}

export default Fruit;