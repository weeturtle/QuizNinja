/* eslint-disable no-undef */
import { render, screen } from '@testing-library/react';
import QuizForm from '../../components/QuizForm';
import { sampleQuiz } from '../sampleData';

describe('Edit quiz', () => {
  it('renders input box containing the initial name' , () => {
    render(
      <QuizForm quiz={sampleQuiz} />
    );

    expect(screen.getByPlaceholderText('Name').value).toEqual('Quiz 1');
  });

  it('renders input box containing the initial subject' , () => {
    render(
      <QuizForm quiz={sampleQuiz} />
    );
    expect(screen.getByPlaceholderText('Subject').value).toEqual('Subject 1');
  });

  it('renders input box containing the initial question' , () => {
    render(
      <QuizForm quiz={sampleQuiz} />
    );

    const questionBoxes = screen.getAllByPlaceholderText('Question');

    expect(questionBoxes[0].value).toEqual('Question 1');
    expect(questionBoxes[1].value).toEqual('Question 2');
  });

  it('renders input boxes containing the initial answer' , () => {
    render(
      <QuizForm quiz={sampleQuiz} />
    );


    expect(screen.getAllByPlaceholderText('Answer 1')[0].value).toEqual('Answer 1');
    expect(screen.getAllByPlaceholderText('Answer 2')[0].value).toEqual('Answer 2');
  });

  it('renders additional empty answer boxes to make 4 total', () => {
    render(
      <QuizForm quiz={sampleQuiz} />
    );

    const answerBoxes = screen.getAllByPlaceholderText('Answer');

    expect(answerBoxes.length).toEqual(4);
    expect(answerBoxes[2].value).toEqual('');
    expect(answerBoxes[3].value).toEqual('');
  });

  it('renders checkboxes for each answer containing intial vaues', () => {
    render(
      <QuizForm quiz={sampleQuiz} />
    );

    const checkboxes = screen.getAllByRole('checkbox');

    expect(checkboxes[0].checked).toEqual(true);
    expect(checkboxes[1].checked).toEqual(false);
  });

  it('renders extra checkboxes for additional empty answers set to unchecked', () => {
    render(
      <QuizForm quiz={sampleQuiz} />
    );

    const checkboxes = screen.getAllByRole('checkbox');

    expect(checkboxes[2].checked).toEqual(false);
    expect(checkboxes[3].checked).toEqual(false);
  });

});