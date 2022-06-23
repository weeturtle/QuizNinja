import styled from 'styled-components';
import Colours from '../../styles/colours';

// Styles the whole page container
// Makes the page container the maximum width and height of the screen
// Displays it as a flex container
// The sidebar is displayed on the left and page content on the right
export default styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  flex-direction: row;
  align-items: stretch;
  flex-wrap: nowrap;

  background-color: ${Colours.DARK_BACKGROUND};
`;