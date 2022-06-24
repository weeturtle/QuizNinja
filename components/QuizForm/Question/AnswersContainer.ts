import styled from 'styled-components';

// Styles a container to hold the answer components
// Spaces them out evenly in the container
export default styled.div`
  width: 100%;

  grid-column: 1 / 1;
  grid-row: 2 / 2;

  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;