import { Dispatch, FC, SetStateAction } from 'react';
import { QuizId } from '../../types/Quiz';

interface QuizQuestionsContainerProps {
  quiz: QuizId;
  setQuiz: Dispatch<SetStateAction<QuizId | null>>;
}

const QuizQuestionsContainer: FC<QuizQuestionsContainerProps> = ({ quiz, setQuiz }) => {
  return (
    <div>
      {
        quiz.questions.map((question, index) => (
          <>
            <p key={index}>{question.question}</p>
            {
              question.answers.map((answer, index) => (
                <p key={index}>{answer.answer}</p>
              ))
            }
            )
          </>
        ))
      }
    </div>
  );
};

export default QuizQuestionsContainer;