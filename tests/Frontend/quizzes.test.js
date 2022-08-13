/* eslint-disable no-undef */
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import QuizList from '../../components/Quizzes/QuizList';
import Searchbox from '../../components/General/Searchbox';
import { sampleQuizzes } from '../sampleData';

describe('Quizzes', () => {
  it('renders quiz page with quiz list', () => {
    render(<QuizList quizzes={sampleQuizzes}/>);
    expect(screen.getByText('Addition')).toBeInTheDocument();
    expect(screen.getByText('Laws of Motion')).toBeInTheDocument();
  });

  it('filters quizzes depending on search term', () => {
    render(<Searchbox ariaLabel='quiz-search'/>);
    const searchbox = screen.getByLabelText('quiz-search');
    fireEvent.change(searchbox, { target: { value: 'Addition' } });

    render(<QuizList quizzes={sampleQuizzes} searchTerm={
      searchbox.value
    } />);

    expect(screen.getByText('Addition')).toBeInTheDocument();
    expect(screen.queryByText('Laws of Motion')).not.toBeInTheDocument();
  });
});
