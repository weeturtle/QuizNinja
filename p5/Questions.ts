import { AnswerType, QuestionType } from '../prisma/zod';

class Questions {
  private questions: QuestionType[];
  public currentQuestion: number;
  public currentAnswer: number;

  constructor(questions: QuestionType[]) {
    this.questions = questions;
    this.currentQuestion = 0;
    this.currentAnswer = 0;
  }

  get CurrentQuestion(): QuestionType {
    return this.questions[this.currentQuestion];
  }

  nextQuestion(): void {
    this.currentQuestion++;
    this.currentAnswer = 0;
  }

  get isQuestionsFinished(): boolean {
    return this.currentQuestion >= this.questions.length ;
  }

  get CurrentAnswer(): AnswerType {
    return this.questions[this.currentQuestion].answers[this.currentAnswer];
  }

  nextAnswer(): void {
    this.currentAnswer++;
  }

  get isAnswersFinished(): boolean {
    return this.currentAnswer >= this.questions[this.currentQuestion].answers.length;
  }

}

export default Questions;