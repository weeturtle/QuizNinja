// Defines the type of an answer
// Must contain an answer and a boolean indicating if it is correct
export interface Answer {
  answer: string;
  isCorrect: boolean;
}

// Defines the type of a question
// Must contain a question and an array of answers
export interface Question {
  question: string,
  answers: Answer[]
}

// Defines the type of a quiz
// Must contain a name and an array of questions
// May contain a subject
export interface Quiz {
  name: string,
  subject?: string,
  questions: Question[]
}

// Defines the type of a quiz collection
// Extends the Quiz type with an _id property
export interface QuizId extends Quiz {
  _id: string
}