import styled from 'styled-components';
import Colours from '../../../styles/colours';

// Styles the container for the answer text input and checkbox
export default styled.div`
  width: 12rem;
  height: 2rem;

  
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  input {
    font-size: 1rem;
    color: ${Colours.TEXT};
    background-color: ${Colours.SECONDARY};
  }

  input[type=text] {
    height: 100%;
    width: 10rem;

    border-radius: 6px;
    border: 1px solid ${Colours.PRIMARY};
    outline: none;
  }

  input[type=checkbox] {
    place-content: center;
    height: 1rem;
    width: 1rem;

    border-radius: 50%;
    border: 1px solid ${Colours.PRIMARY};
    outline: none;
  
    &::before {
      content: "";
      width: 0.65em;
      height: 0.65em;
      transform: scale(0);
      transition: 120ms transform ease-in-out;
      box-shadow: inset 1em 1em var(--form-control-color);
    
    }
  }
    
`;