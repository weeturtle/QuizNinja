import styled from 'styled-components';

// Styes a div to cover the page when the popup is open
// This is used to prevent the user from interacting with the page
// Blurs the page so the user's focus is not on the page
export default styled.div`
  height: 100vh;
  width: 100vw;

  border-radius: 0;

  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  backdrop-filter: brightness(0.5);
`;