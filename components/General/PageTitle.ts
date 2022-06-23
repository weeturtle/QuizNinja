import styled from 'styled-components';
import Colours from '../../styles/colours';

// Page title which is used on all main oages
// Always positioned at the top left of the page
export default styled.h1`
  position: absolute;
  top: 1rem;
  left: 14rem;

  color: ${Colours.ACCENTED_TEXT};
  font-size: 1.75rem;
`;