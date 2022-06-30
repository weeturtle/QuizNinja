/* eslint-disable no-undef */
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import QuizForm from '../../components/QuizForm';

describe('Create Quiz', () => {
  it('renders input boxes for quiz name and subject' , () => {
    render(
      <QuizForm quiz={{
        'name': '',
        'subject': '',
        'questions': [],
      }} />
    );
    expect(screen.getByPlaceholderText('Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Subject')).toBeInTheDocument();
  });

  it('renders an empty question box to be filled in', () => {
    render(
      <QuizForm quiz={{
        'name': '',
        'subject': '',
        'questions': [],
      }} />
    );
    expect(screen.getByPlaceholderText('Question')).toBeInTheDocument();
  });

  it('renders empty answer boxes to be filled in', () => {
    render(
      <QuizForm quiz={{
        'name': '',
        'subject': '',
        'questions': [],
      }} />
    );
    expect(screen.getAllByPlaceholderText('Answer').length).toEqual(4);
  });

  it('renders a submit button to create quiz', () => {
    render(
      <QuizForm quiz={{
        'name': '',
        'subject': '',
        'questions': [],
      }} />
    );
    expect(screen.getByText('Submit')).toBeInTheDocument();
  });
});