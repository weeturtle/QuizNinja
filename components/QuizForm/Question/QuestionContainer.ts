import styled from 'styled-components';
import Colours from '../../../styles/colours';

export default styled.div`
  width: 100%;
  height: 5vh;

  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr; 
  grid-template-rows: 1fr 1fr;

  border: 1px solid ${Colours.PRIMARY};
`;
