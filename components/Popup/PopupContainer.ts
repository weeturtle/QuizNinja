import styled from 'styled-components';
import Colours from '../../styles/colours';

// Style the box of the popup
// Centers it in the actual center of the screen
export default styled.div`
  height: 25rem;
  width: 30rem;

  background-color: ${Colours.DARK_BACKGROUND};
  border: 1px solid ${Colours.PRIMARY};

  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
`;