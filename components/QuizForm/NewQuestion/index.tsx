import { FC, useState } from 'react';
import { Answer as AnswerType, Question as QuestionType } from '../../../types/Quiz';
import Answer from '../Question/Answer';
import AnswersContainer from '../Question/AnswersContainer';
import QuestionContainer from '../Question/QuestionContainer';
import QuestionGrid from '../Question/QuestionGrid';
import NewQuestionAdd from './NewQuestionAdd';
import NewQuestionBox from './NewQuestionBox';

// Component props for new question
// addQuestion: (question: QuestionType) => void - The function to add a new question
interface NewQuestionProps {
  addQuestion: (question: QuestionType) => void;
}

// The component that renders the new question
const NewQuestion: FC<NewQuestionProps> = ({ addQuestion }) => {
  // Creates empty state variables for the question text
  const [question, setQuestion] = useState('');

  // Creates an array of empty answer templates
  const [answers, setAnswers] = useState<AnswerType[]>(Array(4).fill({ answer: '', isCorrect: false }));

  // Handle the add question button being clicked
  const handleQuestionSubmit = () => {
    // If the answer text is empty, don't add the answer to the question
    const filledAnswers = answers.filter(answer => answer.answer.length > 0);

    // If there are less than 2 answers don't add the question
    // If there is no question text don't add the question
    if (filledAnswers.length < 2 || question.length === 0) {
      return;
    }

    // Add the question to the quiz
    addQuestion({
      question,
      answers: filledAnswers
    });

    // Reset the question text
    setQuestion('');
    // Reset the answers
    setAnswers(Array(4).fill({ answer: '', isCorrect: false }));
  };

  // Returns a question box
  // Returns a list of answer boxes
  // Returns a button to add the question
  return (
    <QuestionContainer>
      <QuestionGrid>
        <NewQuestionBox type="text" value={question} onChange={(e) => setQuestion(e.target.value)} />
        <AnswersContainer>
          {
            answers.map((answer, index) => (
              <Answer key={index} answerNumber={index} answer={answer} setAnswers={setAnswers} />
            ))
          }
        </AnswersContainer>
        <NewQuestionAdd onClick={handleQuestionSubmit}>Add Question</NewQuestionAdd>
      </QuestionGrid>
    </QuestionContainer>
  );
};

export default NewQuestion;