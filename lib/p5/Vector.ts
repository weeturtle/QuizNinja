class Vector {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  // Calculates the magnitude of the vector
  // Returns a number
  mag(): number {
    return Math.sqrt(
      this.x^2 + this.y^2
    );
  }

  // Adds two vectors together
  // Returns a new vector
  static add(v1: Vector, v2: Vector): Vector {
    return new Vector(
      v1.x + v2.x,
      v1.y + v2.y
    );
  }

  // Subtracts the second vector from the first
  // Returns a new vector
  static sub(v1: Vector, v2: Vector): Vector {
    return new Vector(
      v1.x-v2.x,
      v1.y-v2.y
    );
  }
}

export default Vector;