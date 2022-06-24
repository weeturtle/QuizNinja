import { Dispatch, FC, SetStateAction } from 'react';
import { Question as QuestionType } from '../../types/Quiz';
import styled from 'styled-components';
import Question from './Question';

const StyledQuizQuestionsContainer = styled.div`
  position: relative;
  height: 70vh;
  width: 80%;
`;

interface QuizQuestionsContainerProps {
  questions: QuestionType[];
  setQuestions: Dispatch<SetStateAction<QuestionType[]>>;
}

const QuizQuestionsContainer: FC<QuizQuestionsContainerProps> = ({ questions, setQuestions }) => {
  const setQuestion = (question: QuestionType, questionNumber: number) => {
    setQuestions(questions => {
      questions[questionNumber] = question;
      return questions;
    });
  };

  const deleteQuestion = (questionNumber: number) => {
    setQuestions(questions => questions.filter((_, index) => index !== questionNumber));
  };

  return (
    <StyledQuizQuestionsContainer>
      {
        questions.map((question, index) => (
          <Question setQuestion={setQuestion} deleteQuestion={deleteQuestion} question={question} questionNumber={index} key={index}  />
        ))
      }
    </StyledQuizQuestionsContainer>
  );
};

export default QuizQuestionsContainer;