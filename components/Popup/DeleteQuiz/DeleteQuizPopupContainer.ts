import styled from 'styled-components';
import Colours from '../../../styles/colours';

// Styles the popup contents
// Uses a grid to position the title, text and buttons
export default styled.div`
  width: 100%;
  height: 100%;

  display: grid;
  grid-template-rows: 1fr 2fr 1fr;
  grid-template-columns: 1fr 1fr;

  grid-column-gap: 1rem;

  padding: 1rem;
  color: ${Colours.TEXT};

  h1 {
    grid-row: 1;
    grid-column: 1 / 3;
  }

  p {
    font-size: 1.5rem;

    grid-row: 2;
    grid-column: 1 / 3;
  }

  button {
    font-size: 1.5rem;
    background-color: transparent;

    grid-row: 3;
  }
`;