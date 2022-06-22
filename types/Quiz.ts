export interface Answer {
  answer: string;
  isCorrect: boolean;
}

export interface Question {
  question: string,
  answers: Answer[]
}

export interface Quiz {
  name: string,
  subject: string,
  questions: Question[]
}
  
export interface QuizId extends Quiz {
  _id: string
}