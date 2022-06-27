/* eslint-disable no-undef */
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { sampleQuiz } from '../sampleData';
import Quiz from '../../components/Quiz';

describe('Quiz', () => {
  it('renders quiz given the id as a url query', () => {
    render(<Quiz quiz={sampleQuiz} />);
    expect(screen.getByText('Question 1')).toBeInTheDocument();
    expect(screen.getByText('Answer 1')).toBeInTheDocument();
  });

  it('when answer is selected correct answers are shown',  () => {
    render(<Quiz quiz={sampleQuiz} />);
    const answer = screen.getByText('Answer 1');
    fireEvent.click(answer);
    expect(answer).toHaveStyle('border-color: green');
  });

  it('when answer is selected incorrect answers are shown',  () => {
    render(<Quiz quiz={sampleQuiz} />);
    const answer = screen.getByText('Answer 2');
    fireEvent.click(answer);
    expect(answer).toHaveStyle('border-color: red');
  });

  it('when answer is selected next queston button appears', () => {
    render(<Quiz quiz={sampleQuiz} />);
    const answer = screen.getByText('Answer 1');
    fireEvent.click(answer);
    expect(screen.getByText('Next')).toBeInTheDocument();
  });

  it('when next button is clicked next question is shown', () => {
    render(<Quiz quiz={sampleQuiz} />);
    const answer = screen.getByText('Answer 1');
    fireEvent.click(answer);
    const nextButton = screen.getByText('Next');
    fireEvent.click(nextButton);
    expect(screen.getByText('Question 2')).toBeInTheDocument();
  });

  it('when last question is shown the next button leads to a gameover screen', () => {
    render(<Quiz quiz={sampleQuiz} />);
    const answer1 = screen.getByText('Answer 1');
    fireEvent.click(answer1);
    fireEvent.click(screen.getByText('Next'));
    const answer2 = screen.getByText('Answer 2');
    fireEvent.click(answer2);
    fireEvent.click(screen.getByText('Next'));

    expect(screen.getByText('Game Over')).toBeInTheDocument();
  });

  it('score is calculated at end of game', () => {
    render(<Quiz quiz={sampleQuiz} />);
    const answer1 = screen.getByText('Answer 1');
    fireEvent.click(answer1);
    fireEvent.click(screen.getByText('Next'));
    const answer2 = screen.getByText('Answer 2');
    fireEvent.click(answer2);
    fireEvent.click(screen.getByText('Next'));

    expect(screen.getByText('Your score is 1 out of 2')).toBeInTheDocument();
  });

  it('on gameover use can return to quizzes', () => {
    render(<Quiz quiz={sampleQuiz} />);
    const answer1 = screen.getByText('Answer 1');
    fireEvent.click(answer1);
    fireEvent.click(screen.getByText('Next'));
    const answer2 = screen.getByText('Answer 2');
    fireEvent.click(answer2);
    fireEvent.click(screen.getByText('Next'));

    expect(screen.getByText('Return to quizzes')).toBeInTheDocument();
  });
});