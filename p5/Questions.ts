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

  getCurrentQuestion(): QuestionType {
    return this.questions[this.currentQuestion];
  }

  nextQuestion(): void {
    this.currentQuestion++;
    this.currentAnswer = 0;
  }

  isQuestionsFinished(): boolean {
    return this.currentQuestion >= this.questions.length ;
  }

  getCurrentAnswer(): AnswerType {
    return this.questions[this.currentQuestion].answers[this.currentAnswer];
  }

  nextAnswer(): void {
    this.currentAnswer++;
  }

  isAnswersFinished(): boolean {
    return this.currentAnswer >= this.questions[this.currentQuestion].answers.length;
  }

}

export default Questions;