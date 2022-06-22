import { FC } from 'react';

interface Answer {
  answer: string;
  correct: boolean;
}

interface Question {
  question: string,
  answers: Answer[]
}

interface Quiz {
  _id: string,
  name: string,
  subject: string,
  questions: Question[]
}
  
interface QuizListProps {
  quizzes: Quiz[],
  searchTerm?: string,
}

const QuizList: FC<QuizListProps> = ({ quizzes, searchTerm }) => {
  return (
    <div>
      {
        (
          searchTerm ?
            quizzes.filter(quiz => quiz.name.toLowerCase().includes(searchTerm.toLowerCase()))
            :
            quizzes
        )
          .map((quiz, i) => (
            <p key={i}>{quiz.name}</p>
          ))}
    </div>
  );
};

export default QuizList;