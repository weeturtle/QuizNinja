import { FC } from 'react';
import { Quiz } from '../../types/Quiz';


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