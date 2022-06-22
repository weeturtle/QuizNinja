/* eslint-disable no-undef */
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import Quizzes from '../../pages/quizzes';
import QuizList from '../../components/Quizzes/QuizList';
import Searchbox from '../../components/General/Searchbox';
import { sampleQuizzes } from '../sampleData';

describe('Quizzes', () => {
  it('renders quiz page without crashing', () => {
    render(<Quizzes />);
    expect(screen.getByText('Quizzes')).toBeInTheDocument();
  });

  it('renders quiz page with quiz list', () => {
    render(<QuizList quizzes={sampleQuizzes}/>);
    expect(screen.getByText('Quiz 1')).toBeInTheDocument();
    expect(screen.getByText('Quiz 2')).toBeInTheDocument();
  });

  it('filters quizzes depending on search term', () => {
    render(<Searchbox ariaLabel='quiz-search'/>);
    const searchbox = screen.getByLabelText('quiz-search');
    fireEvent.change(searchbox, { target: { value: 'Quiz 1' } });

    render(<QuizList quizzes={sampleQuizzes} searchTerm={
      searchbox.value
    } />);

    expect(screen.getByText('Quiz 1')).toBeInTheDocument();
    expect(screen.queryByText('Quiz 2')).not.toBeInTheDocument();


  });
});
