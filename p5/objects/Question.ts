import p5 from 'p5';
import { GameObject } from '../lib/GameObject';

// Class which displays the current question
class Question extends GameObject {
  // Stores the current question
  question: string;

  constructor() {
    super();
    // Sets the question to an empty string
    this.question = '';
  }

  newQuestion (question: string) {
    // Sets the question to the new question
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
    p.text(this.question, 40, (window.innerHeight * 0.9 - 55));

    p.pop();
  }
}

export default Question;