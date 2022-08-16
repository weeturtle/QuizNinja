import styled from 'styled-components';
import Colours from '../../styles/colours';

// Takes a parameter of a boolean and returns a styled component
interface StyledSidebarLinkProps {
  isActive: boolean;
}

// Styles the link that will be displayed in the sidebar
// The link will be styled based on whether the link is active or not
// If the link is active it is coloured with the primary colour
// Otherwise it is coloured with the regular text colour
export default styled.a<StyledSidebarLinkProps>`
  color: ${ props => props.isActive ? Colours.PRIMARY : Colours.TEXT};
  font-size: 1.5rem;
`;