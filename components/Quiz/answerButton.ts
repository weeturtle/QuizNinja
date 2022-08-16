import styled from 'styled-components';
import Colours from '../../styles/colours';

// Styled the buttons for the answers
interface AnswerButtonProps {
  answerState: boolean
  displayAnswerState: boolean
}

// Changes border colour depending on if the answer is correct or not
// Only shows the answer colou if the user has answered the question
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