import { FC, useEffect, useState } from 'react';
import { Question as QuestionType } from '../../../types/Quiz';
import Answer from './Answer';
import DeleteQuestionButton from './DeleteQuestionButton';
import QuestionBox from './QuestionBox';
import AnswersContainer from './AnswersContainer';
import QuestionContainer from './QuestionContainer';
import QuestionGrid from './QuestionGrid';

// Component props for each question
// question: QuestionType - The question data for this question
// setQuestions: Dispatch<SetStateAction<QuestionType[]>> - The function to update the question data
// questionNumber: number - The index of the question in the question array
// deleteQuestion: (questionNumber: number) => void - The function to delete the question
interface EditQuestionProps {
  question: QuestionType;
  questionNumber: number;
  setQuestion: (question: QuestionType, questionNumber: number) => void;
  deleteQuestion: (questionNumber: number) => void;
}

// Component for each question
export const Question: FC<EditQuestionProps> = ({ question, questionNumber, setQuestion, deleteQuestion }) => {
  // Gets the initial question data and sets it to the state
  const [editedQuestion, setQuestionText] = useState(question.question);
  const [editedAnswers, setAnswers] = useState(question.answers);

  // Everytime the user makes an edit to the question, the question data is updated in a parent component
  useEffect(() => {
    // Sets the question data to the current state
    setQuestion({
      question: editedQuestion,
      answers: editedAnswers
    }, questionNumber);
  }, [editedQuestion, editedAnswers]);

  // Returns a text input for the question text
  // Returns a button for each answer
  return (
    <QuestionContainer>
      <QuestionGrid>
        <QuestionBox
          value={editedQuestion}
          onChange={(e) => setQuestionText(e.target.value)}
          placeholder="Question"
        />
        <AnswersContainer>
          {
            editedAnswers.map((answer, index) => (
              <Answer key={index} answer={answer} setAnswers={setAnswers} answerNumber={index}/>
            ))
          }
        </AnswersContainer>
        <DeleteQuestionButton onClick={() => deleteQuestion(questionNumber)}>Delete</DeleteQuestionButton>
      </QuestionGrid>
    </QuestionContainer>
  );
};

export default Question;