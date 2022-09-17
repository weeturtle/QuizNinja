import p5 from 'p5';
import { GameObject } from '../lib/GameObject';

class Lives extends GameObject {
  // Stores the number of lives
  public lives: number;

  constructor(lives?: number) {
    super();
    // Sets the number of lives to 3
    this.lives = lives || 3;
  }

  // Function which decreases the number of lives
  decreaseLives() {
    this.lives--;

    return this.lives;
  }

  update() {
    //
  }

  render(p: p5) {
    p.push();

    // Sets the fill colour to white
    p.fill('white');
    // Sets the text size to 20
    p.textSize(20);
    // Draws the text
    p.text(`Lives: ${this.lives}`, 10, 20);

    p.pop();
  }

}

export default Lives;