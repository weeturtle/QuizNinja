import styled from 'styled-components';

// Formats the page so search box and quiz links are in the same column
export default styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
`;