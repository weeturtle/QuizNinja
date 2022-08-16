import styled from 'styled-components';

// A container to style the sidebar links
// Each link is vertically seperated by 5% of the screen height 
// Moves the container down 5% of the screen height below the header
// The links are shifted over to the right by 1.5rem
export default styled.div`
  width: 100%;
  height: 65vh;

  margin-top: 5vh;
  padding-left: 1.5rem;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  gap: 5vh;
`;