import p5 from 'p5';
import { CollisionObject } from '../lib/GameObject';
import GameObjectCollection from '../lib/GameObjectCollection';
import generateArc from '../lib/GenerateArc';
import Vector from '../Vector';

export enum FruitType {
  MELON = 'melon',
  WATERMELON = 'watermelon',
  PINEAPPLE = 'pineapple'
}

class Fruit extends CollisionObject {
  type: FruitType;
  radius: number;
  wasSliced: boolean;

  constructor(
    type: FruitType,
    radius: number
  ) {
    super(new Vector(50, 700), generateArc(), {
      x: -radius / 2,
      y: -radius / 2,
      width: radius,
      height: radius
    });

    this.type = type;
    this.radius = radius;
    this.wasSliced = false;
  }

  update(p:p5, collection: GameObjectCollection, id: number) {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    this.velocity.y += 0.01;
    
    if (this.position.y > 700) {
      collection.remove(id);
    }

    const { object: playerObject } = [...collection.query('player')][0];

    if (this.collide(playerObject as CollisionObject)) {
      this.wasSliced = true;
      this.velocity.x = 0;
      this.velocity.y = 0;
    }
  }

  render(p: p5) {
    p.push();

    this.wasSliced ?
      p.fill('red') :
      p.fill('green');
    p.ellipse(this.position.x, this.position.y, this.radius);

    p.pop();
  }
}

export default Fruit;