import { Dispatch, FC, SetStateAction } from 'react';
import { QuestionType } from '../../types/Quiz';
import styled from 'styled-components';
import Question from './Question';
import NewQuestion from './NewQuestion';

// Styles the container for the questions
const StyledQuizQuestionsContainer = styled.div`
  position: relative;
  height: 70vh;
  width: 80%;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 1rem;
`;

// Props for the questions container
// questions: QuestionType[] - The questions data for the quiz
// setQuestions: Dispatch<SetStateAction<QuestionType[]>> - The function to update the questions data
interface QuizQuestionsContainerProps {
  questions: QuestionType[];
  setQuestions: Dispatch<SetStateAction<QuestionType[]>>;
}

// The component that renders the different questions
const QuizQuestionsContainer: FC<QuizQuestionsContainerProps> = ({ questions, setQuestions }) => {
  // Updates the questions data when a change is made to a function
  // Gets the current question data, keeping all of the other questions the same
  // Sets the questions at the index to the current question data
  const setQuestion = (question: QuestionType, questionNumber: number) => {
    setQuestions(questions => {
      questions[questionNumber] = question;
      return questions;
    });
  };

  // Adds a new question to the questions data
  const addQuestion = (question: QuestionType) => {
    // Adds the question to the end of the questions array
    setQuestions(questions => [...questions, question]);
  };

  // Deletes the question at the index
  // Filters through the questions data and removes the question at the index questionNumber
  const deleteQuestion = (questionNumber: number) => {
    setQuestions(questions => questions.filter((_, index) => index !== questionNumber));
  };

  // Returns a list of the questions
  return (
    <StyledQuizQuestionsContainer>
      {
        questions && questions.map((question, index) => (
          <Question setQuestion={setQuestion} deleteQuestion={deleteQuestion} question={question} questionNumber={index} key={index}  />
        ))
      }
      <NewQuestion addQuestion={addQuestion} />
    </StyledQuizQuestionsContainer>
  );
};

export default QuizQuestionsContainer;