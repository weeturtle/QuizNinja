import styled from 'styled-components';
import Colours from '../../../styles/colours';

export default styled.input`
  width: 100%;
  height: 5vh;

  grid-column: 1 / 4;
  grid-row: 1 / 1;

  color: ${Colours.TEXT};
  padding: 0.5rem;
  font-size: 20px;
  border: 1px solid ${Colours.PRIMARY};

`;