import styled from 'styled-components';
import Colours from '../../styles/colours';

// Styles the div that holds the quiz links and buttons 
export default styled.div`
  width: 10vw;
  height: 5vh;  

  color: ${Colours.TEXT};

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;