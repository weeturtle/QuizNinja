import p5 from 'p5';
import { GameObject } from '../lib/GameObject';

class Question extends GameObject {
  question: string;

  constructor(question: string) {
    super();
    this.question = question;
  }

  newQuestion (question: string) {
    this.question = question;
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
    p.text(this.question, 10, (window.innerHeight * 0.9 - 100));

    p.pop();
  }
}

export default Question;