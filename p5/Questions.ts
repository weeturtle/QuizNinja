import { AnswerType, QuestionType } from '../prisma/zod';

// Class which stores and handles the questions and answers
class Questions {
  // The array of questions initially parsed in
  private questions: QuestionType[];

  // Stores the index of the current question
  public currentQuestion: number;

  // Stores the index of the current answer
  public currentAnswer: number;

  constructor(questions: QuestionType[]) {
    // Set the questions to the parsed in questions
    this.questions = questions;
    // Set the current question to 0
    this.currentQuestion = 0;
    // Set the current answer to 0
    this.currentAnswer = 0;
  }

  // Returns the current question
  getCurrentQuestion(): QuestionType {
    return this.questions[this.currentQuestion];
  }

  nextQuestion(): void {
    // Increments the current question
    this.currentQuestion++;
    // Resets the current answer
    this.currentAnswer = 0;
  }

  // Determines if there are questions remaining
  isQuestionsFinished(): boolean {
    // Returns true if the current question is greater than or equal to the length of the questions array
    // Otherwise returns false
    return this.currentQuestion >= this.questions.length ;
  }

  // Returns the current answer
  getCurrentAnswer(): AnswerType {
    // Returns the current answer at the current answer index of the current question
    return this.questions[this.currentQuestion].answers[this.currentAnswer];
  }

  // Increments the current answer
  nextAnswer(): void {
    this.currentAnswer++;
  }

  // Determines if there are answers remaining
  isAnswersFinished(): boolean {
    return this.currentAnswer >= this.questions[this.currentQuestion].answers.length;
  }

}

export default Questions;