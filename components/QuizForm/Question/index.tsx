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

  // Each answer is split into a single state variable
  // If the answer is initially empty it is set to an empty answer
  const [answer1, setAnswer1] = useState(question.answers[0] ?? { answer: '', isCorrect: false });
  const [answer2, setAnswer2] = useState(question.answers[1] ?? { answer: '', isCorrect: false });
  const [answer3, setAnswer3] = useState(question.answers[2] ?? { answer: '', isCorrect: false });
  const [answer4, setAnswer4] = useState(question.answers[3] ?? { answer: '', isCorrect: false });

  // Everytime the user makes an edit to the question, the question data is updated in a parent component
  useEffect(() => {
    // Only answers that have been edited and are filled in are updated
    const filledAnswers = [answer1, answer2, answer3, answer4].filter(answer => answer.answer.length > 0);

    // Sets the question data to the current state
    setQuestion({
      question: editedQuestion,
      answers: filledAnswers
    }, questionNumber);
  }, [editedQuestion, answer1, answer2, answer3, answer4]);

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
          <Answer answer={answer1} setAnswer={setAnswer1} answerNumber={1} />
          <Answer answer={answer2} setAnswer={setAnswer2} answerNumber={2} />
          <Answer answer={answer3} setAnswer={setAnswer3} answerNumber={3} />
          <Answer answer={answer4} setAnswer={setAnswer4} answerNumber={4} />
        </AnswersContainer>
        <DeleteQuestionButton onClick={() => deleteQuestion(questionNumber)}>Delete</DeleteQuestionButton>
      </QuestionGrid>
    </QuestionContainer>
  );
};

export default Question;