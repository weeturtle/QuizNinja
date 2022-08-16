import styled from 'styled-components';
import Colours from '../../styles/colours';

// Styles the input boxes for the name and subject of the quiz
export default styled.input`
  width: 20vw;
  height: 5vh;


  background-color: transparent;
  border-radius: 12px;
  outline: none;

  border: 1px solid ${Colours.PRIMARY};
  color: ${Colours.TEXT};
  font-size: 1.5rem;
`;