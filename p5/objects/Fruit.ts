import p5 from 'p5';
import { CollisionObject } from '../lib/GameObject';
import GameObjectCollection from '../lib/GameObjectCollection';
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
    super(new Vector(50, 700), new Vector(1.5, -3), {
      x: -radius,
      y: radius - 1,
      width: radius * 2,
      height: radius * 2
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

    if (this.collide(playerObject)) {
      this.wasSliced = true;
      this.velocity.x = 0;
      this.velocity.y = 0;
    }
  }

  render(p: p5) {
    p.push();

    p.fill(100, 100, 100);
    p.ellipse(this.position.x, this.position.y, this.radius);

    this.debugRender(p);

    p.pop();
  }
}

export default Fruit;