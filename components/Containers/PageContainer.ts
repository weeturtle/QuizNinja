import styled from 'styled-components';
import Colours from '../../styles/colours';

// Makes the page container the maximum width of the screen
// and the height of the screen minus the width of the sidebar
export default styled.div`
  width: 100%;
  height: 100%;
  background-color: ${Colours.BACKGROUND};

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 0;
`;