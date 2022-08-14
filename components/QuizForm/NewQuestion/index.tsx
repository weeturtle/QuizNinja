import { FC, useState } from 'react';
import { AnswerType, QuestionType } from '../../../types/Quiz';
import NewQuestionAnswer from './NewQuestionAnswer';
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

  // Creates empty state variables for the answers
  // Each answer is stored in an individual state variable
  const [answer1, setAnswer1] = useState<AnswerType>({ answer: '', isCorrect: false });
  const [answer2, setAnswer2] = useState<AnswerType>({ answer: '', isCorrect: false });
  const [answer3, setAnswer3] = useState<AnswerType>({ answer: '', isCorrect: false });
  const [answer4, setAnswer4] = useState<AnswerType>({ answer: '', isCorrect: false });

  // Handle the add question button being clicked
  const handleQuestionSubmit = () => {
    const answers = [answer1, answer2, answer3, answer4];
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
    setAnswer1({ answer: '', isCorrect: false });
    setAnswer2({ answer: '', isCorrect: false });
    setAnswer3({ answer: '', isCorrect: false });
    setAnswer4({ answer: '', isCorrect: false });
  };

  // Returns a question box
  // Returns a list of answer boxes
  // Returns a button to add the question
  return (
    <QuestionContainer>
      <QuestionGrid>
        <NewQuestionBox
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Question"
        />
        <AnswersContainer>
          <NewQuestionAnswer
            answer={answer1}
            setAnswer={setAnswer1}
          />
          <NewQuestionAnswer
            answer={answer2}
            setAnswer={setAnswer2}
          />
          <NewQuestionAnswer
            answer={answer3}
            setAnswer={setAnswer3}
          />
          <NewQuestionAnswer
            answer={answer4}
            setAnswer={setAnswer4}
          />
        </AnswersContainer>
        <NewQuestionAdd onClick={handleQuestionSubmit}>Add</NewQuestionAdd>
      </QuestionGrid>
    </QuestionContainer>
  );
};

export default NewQuestion;