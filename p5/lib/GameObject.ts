import p5 from 'p5';
import GameObjectCollection from './GameObjectCollection';
import Vector from '../Vector';

export abstract class GameObject {
  public position: Vector;
  public velocity: Vector;

  constructor(position?: Vector, velocity?: Vector) {
    this.position = position || new Vector(0, 0);
    this.velocity = velocity || new Vector(0, 0);
  }
  
  abstract render (p: p5, collection: GameObjectCollection, id: number): void;
  abstract update (p: p5, collection: GameObjectCollection, id: number): void;
}


type BoundBox = {
  x: number;
  y: number;
  width: number;
  height: number;
}

export abstract class CollisionObject extends GameObject {
  protected boundBox: BoundBox;

  constructor(position?: Vector, velocity?: Vector, boundBox?: BoundBox) {
    super(position, velocity);
    this.boundBox = boundBox || { x: 0, y: 0, width: 0, height: 0 };
  }

  collide(other: CollisionObject) {
    return (
      this.position.x + this.boundBox.x < other.position.x + other.boundBox.x + other.boundBox.width &&
      this.position.x + this.boundBox.x + this.boundBox.width > other.position.x + other.boundBox.x &&
      this.position.y + this.boundBox.y < other.position.y + other.boundBox.y + other.boundBox.height &&
      this.position.y + this.boundBox.y + this.boundBox.height > other.position.y + other.boundBox.y
    );
  }

  debugRender(p: p5) {
    p.push();
    p.noFill();
    p.stroke('red');
    p.rect(this.position.x + this.boundBox.x, this.position.y + this.boundBox.y, this.boundBox.width, this.boundBox.height);
    p.pop();
  }
}