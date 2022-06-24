import styled from 'styled-components';
import QuestionBox from '../Question/QuestionBox';

// Styles the box containing the new question
// Extends QuestionBox
export default styled(QuestionBox)`
  grid-column: 1 / 1;
  grid-row: 1 / 1;  

  margin: 0.25rem;

  outline: none;
  padding: 0.5rem 1rem;
  border-radius: 12px;
`;