import styled from 'styled-components';
import Colours from '../../styles/colours';

// Styles the list component that contains the quiz links
export default styled.div`
  height: 75vh;
  width: 50vw;

  background-color: ${Colours.SECONDARY};
  
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 5px;
    background-color: #323645;
  }
  &::-webkit-scrollbar-track {

  } 
  &::-webkit-scrollbar-thumb {
    background-color: #A989CF;
  }

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

`;