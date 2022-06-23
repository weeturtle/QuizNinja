import styled from 'styled-components';
import Colours from '../../styles/colours';


interface AnswerButtonProps {
  answerState: boolean
  displayAnswerState: boolean
}

export default styled.button<AnswerButtonProps>`
  width: 12rem;
  height: 5rem;

  color: ${Colours.ACCENTED_TEXT};
  font-size: 1.5rem;

  background-color: ${Colours.SECONDARY};
  border: 1px solid;
  border-color: ${props => 
    props.displayAnswerState ?
      props.answerState ? 'green' : 'red'
      :
      Colours.PRIMARY
};
`;