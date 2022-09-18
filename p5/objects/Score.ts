import p5 from 'p5';
import { GameObject } from '../lib/GameObject';

class Score extends GameObject {
  // Stores the score
  public score: number;

  constructor() {
    super();
    // Sets the score to 0
    this.score = 0;
  }

  // Function which increases the score
  increaseScore() {
    this.score++;

    return this.score;
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
    p.text(`Score: ${this.score}`, 10, 20);

    p.pop();
  }

}

export default Score;