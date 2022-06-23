import styled from 'styled-components';
import Colours from '../../styles/colours';

export default styled.button`
  width: 10rem;
  height: 2.5rem;

  font-size: 1.25rem;
  color: ${Colours.ACCENTED_TEXT};
  background-color: ${Colours.DARK_BACKGROUND};
  border: 1px solid ${Colours.PRIMARY};

  display: flex;
  justify-content: center;
  align-items: center;


`;