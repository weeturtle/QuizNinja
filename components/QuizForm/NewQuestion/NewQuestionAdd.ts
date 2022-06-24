import styled from 'styled-components';
import DeleteQuestionButton from '../Question/DeleteQuestionButton';

// Styles the button to add a new question
// Extends DeleteQuestionButton
export default styled(DeleteQuestionButton)`
  height: 90%;
  grid-column: 2/2;
  grid-row: 1/3;
`;