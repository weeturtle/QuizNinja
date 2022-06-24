import styled from 'styled-components';
import Colours from '../../styles/colours';

// Styles the box containing the question
export default styled.div`
  max-width: 40rem;
  min-width: 5rem;
  
  padding: 0.5rem 0.5rem;

  color: ${Colours.ACCENTED_TEXT};
  font-size: 2rem;
  border: 1px solid ${Colours.PRIMARY};
`;