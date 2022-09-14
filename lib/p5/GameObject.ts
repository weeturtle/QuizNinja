import p5 from 'p5';
import GameObjectCollection from './GameObjectCollection';

abstract class GameObject {
  public position: p5.Vector;
  public velocity: p5.Vector;

  constructor(position: p5.Vector, velocity: p5.Vector) {
    this.position = position;
    this.velocity = velocity;
  }
  
  abstract render (p: p5, collection: GameObjectCollection, id: number): void;
  abstract update (p: p5, collection: GameObjectCollection, id: number): void;
}

export default GameObject;