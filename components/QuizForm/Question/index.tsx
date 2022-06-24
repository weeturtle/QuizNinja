import { FC, useEffect, useState } from 'react';
import { Question as QuestionType } from '../../../types/Quiz';
import Answer from './Answer';
import DeleteQuestionButton from './DeleteQuestionButton';
import QuestionBox from './QuestionBox';
import QuestionContainer from './QuestionContainer';

interface EditQuestionProps {
  question: QuestionType;
  questionNumber: number;
  setQuestion: (question: QuestionType, questionNumber: number) => void;
  deleteQuestion: (questionNumber: number) => void;
}

export const Question: FC<EditQuestionProps> = ({ question, questionNumber, setQuestion, deleteQuestion }) => {
  const [editedQuestion, setQuestionText] = useState(question.question);
  const [editedAnswers, setAnswers] = useState(question.answers);

  useEffect(() => {
    setQuestion({
      question: editedQuestion,
      answers: editedAnswers
    }, questionNumber);
  }, [editedQuestion, editedAnswers]);

  return (
    <QuestionContainer>
      <QuestionBox value={editedQuestion} onChange={(e) => setQuestionText(e.target.value)}/>
      {
        editedAnswers.map((answer, index) => (
          <Answer key={index} answer={answer} setAnswers={setAnswers} answerNumber={index}/>
        ))
      }
      <DeleteQuestionButton onClick={() => deleteQuestion(questionNumber)}>Delete Question</DeleteQuestionButton>
    </QuestionContainer>
  );
};

export default Question;