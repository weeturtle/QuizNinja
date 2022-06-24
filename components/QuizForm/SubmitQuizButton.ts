import styled from 'styled-components';
import Colours from '../../styles/colours';

export default styled.div`
  width: 5rem;
  height: 2.5rem;

  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;
  border: 1px solid ${Colours.PRIMARY};
  color: ${Colours.PRIMARY};
`;