import styled from 'styled-components';
import Colours from '../../../styles/colours';

// Styles the box containing the question and answers
// Grid is used to position the answers
export default styled.input`
  width: 100%;
  height: 100%;

  grid-column: 1 / 1;
  grid-row: 1 / 1;

  background-color: transparent;

  color: ${Colours.TEXT};
  padding: 0.5rem;
  font-size: 20px;
  border: 1px solid ${Colours.PRIMARY};

`;