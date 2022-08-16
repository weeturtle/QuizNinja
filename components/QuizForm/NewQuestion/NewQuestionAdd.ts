import styled from 'styled-components';
import Colours from '../../../styles/colours';
import DeleteQuestionButton from '../Question/DeleteQuestionButton';

// Styles the button to add a new question
// Extends DeleteQuestionButton
export default styled(DeleteQuestionButton)`
  height: 7.5rem;
  width: 7.5rem;
  grid-column: 2/2;
  grid-row: 1/3;

  color: ${Colours.ACCENTED_TEXT};
  font-size: 1.5rem; 

  background-color: transparent;
  border: 1px solid ${Colours.PRIMARY};
`;