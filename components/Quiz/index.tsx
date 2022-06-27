import { FC, useEffect, useState } from 'react';
import GameState from '../../types/gameState';
import QuestionState from '../../types/questionState';
import { Answer, Quiz } from '../../types/Quiz';
import AnswerButton from './answerButton';
import AnswersContainer from './AnswersContainer';
import Gameover from './GameOver';
import NextButton from './NextButton';
import QuestionBox from './QuestionBox';
import QuizContainer from './QuizContainer';

// Defines the props for the Quiz game component
// Takes a quiz as a parameter
interface QuizProps {
  quiz: Quiz;
}

const Quiz: FC<QuizProps> = ({ quiz }) => {
  // Creates a state variable for the current question number
  const [currentQuestion, setCurrentQuestion] = useState(0);

  // Creates a state variable for the current question state
  const [questionState, setQuestionState] = useState<QuestionState>(QuestionState.UNANSWERED);

  // Creates a state variable for the current game state
  const [gameState, setGameState] = useState<GameState>(GameState.INGAME);

  // Creates a state variable for the current score
  const [score, setScore] = useState(0);

  // Function to handle next question button click
  const handleNext = () => {
    // Resets the game state for the next question
    setQuestionState(QuestionState.UNANSWERED);

    // If there are more questions in the quiz then increment the question number
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion => currentQuestion + 1);
    } else {
      // If there are no more questions then change the game state to game over
      setGameState(GameState.GAMEOVER);
    }
  };

  useEffect(() => {
    // Update the score depeding on the current question state
    if (questionState === QuestionState.CORRECT) {
      setScore(score => score + 1);
    } 
  }, [questionState]);

  // Function that is called when an answer button is clicked
  const checkAnswer = (answer: Answer) => {
    // Checks whether one of the answers has already been clicked
    // If not they could continue clicking the answer and gaining score
    questionState === QuestionState.UNANSWERED && 
    // Updates the question state depending on whether the answer is correct
    setQuestionState(() => {
      return answer.isCorrect ? QuestionState.CORRECT : QuestionState.INCORRECT;
    });
  };

  return (
    <>
      { // If the game state is ingame
        gameState === GameState.INGAME && (
          <QuizContainer>
            {/* Render the current question text */}
            <QuestionBox>{quiz.questions[currentQuestion].question}</QuestionBox>
            <AnswersContainer>
              {
                // Render all of the answers as buttons
                quiz.questions[currentQuestion].answers.map((answer, i) => (
                  // Passes through whether the answer is correct
                  // Will only display whether answer is correct after it has been answered
                  <AnswerButton
                    key={i}
                    onClick={() => checkAnswer(answer)}
                    answerState={answer.isCorrect}
                    displayAnswerState={questionState !== QuestionState.UNANSWERED}
                  >
                    {answer.answer}
                  </AnswerButton>
                ))
              }
            </AnswersContainer>
            {
              // After the question has been answered
              // The button to pass to the next question should be rendered
              // Calls the handleNext function
              questionState !== QuestionState.UNANSWERED && (
                <NextButton
                  onClick={handleNext}
                >
                  Next
                </NextButton>
              )
            }
          </QuizContainer>
        )
      }
      { // Displays a game over screen after all of the questions
        gameState === GameState.GAMEOVER && (
          <Gameover score={score} totalQuestions={quiz.questions.length} />
        )
      }
    </>
  );
};

export default Quiz;