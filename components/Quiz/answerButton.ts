import styled from 'styled-components';
import Colours from '../../styles/colours';


interface AnswerButtonProps {
  answerState: boolean
  displayAnswerState: boolean
}

export default styled.button<AnswerButtonProps>`
  border-color: ${props => 
    props.displayAnswerState ?
      props.answerState ? 'green' : 'red'
      :
      Colours.PRIMARY
};
`;