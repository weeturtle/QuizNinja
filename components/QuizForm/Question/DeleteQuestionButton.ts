import styled from 'styled-components';
import Colours from '../../../styles/colours';

// Styles the button allowing the user to delete a question
export default styled.button`
  grid-column: 2/2;
  grid-row: 1/3;

  height: 7.5rem;
  width: 7.5rem;

  color: ${Colours.ACCENTED_TEXT};
  font-size: 1.5rem; 

  border: 1px solid ${Colours.PRIMARY};

  background-color: transparent;
`;