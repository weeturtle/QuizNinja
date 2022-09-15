import p5 from 'p5';
import GameObjectCollection from './GameObjectCollection';
import Vector from './Vector';

abstract class GameObject {
  public position: Vector;
  public velocity: Vector;

  constructor(position?: Vector, velocity?: Vector) {
    this.position = position || new Vector(0, 0);
    this.velocity = velocity || new Vector(0, 0);
  }
  
  abstract render (p: p5, collection: GameObjectCollection, id: number): void;
  abstract update (p: p5, collection: GameObjectCollection, id: number): void;
}

export default GameObject;