import styled from 'styled-components';
import Colours from '../../styles/colours';

// Styled component for the subject options
// Stored as one component since it makes for a cleaner codebase
// Allows simpler pseudo selectors to be used
export const StyledSubjectContainer = styled.div`
  position: relative;

  input {
    width: 20vw;
    height: 5vh;
        
    background-color: transparent;
    border-radius: 12px;
    outline: none;
    
    border: 1px solid ${Colours.PRIMARY};
    color: ${Colours.TEXT};
    font-size: 1.5rem;
  }

  &:hover .subject-option-container,
  input:focus ~ .subject-option-container {
    display: flex; 
  }

  .subject-option-container {
    width: 100%;
    max-height: 10rem;

    overflow-y: scroll;
    &::-webkit-scrollbar {
      width: 5px;
      background-color: #323645;
      border-radius: 12px;  
    }
    &::-webkit-scrollbar-track {
    } 
    &::-webkit-scrollbar-thumb {
      border-radius: 12px;  
      background-color: #A989CF;
    }
    
    
    position: absolute;

    z-index: 1;

    background-color: ${Colours.BACKGROUND};
    border: 1px solid ${Colours.PRIMARY};

    display: none;
    flex-direction: column;
    
    &>button {
      font-size: 1.5rem;
      text-align: left;
      color: ${Colours.TEXT};

      border: none;
      background-color: transparent;
    }


  }
`;