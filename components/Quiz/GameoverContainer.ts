import styled from 'styled-components';
import Colours from '../../styles/colours';

export default styled.div`
  width: 20vw;
  height: 25vh;
  
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  color: ${Colours.TEXT};
  border: 1px solid ${Colours.PRIMARY};

  button {
    width: 8rem;
    height: 3rem;

    font-size: 1rem;
    border: 1px solid ${Colours.PRIMARY};
    background-color: transparent;
    color: ${Colours.ACCENTED_TEXT};
  }
`;