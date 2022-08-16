import styled from 'styled-components';
import Colours from '../../styles/colours';

// Styles each quiz link component
export default styled.div`
  width: 95%;
  height: 3rem;

  border: 1px solid ${Colours.PRIMARY};
  padding: 0.5rem;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  background-color: ${Colours.BACKGROUND};
`;