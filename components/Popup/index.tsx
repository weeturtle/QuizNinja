import { FC, ReactNode } from 'react';
import PopupContainer from './PopupContainer';
import PopupPageContainer from './PopupPageContainer';

// Takes in a ReactNode (a component) to display in the popup
// Returns a popup with the given component
// Takes a boolean to determine if the popup is open
// Takes a function to call when the user closes the popup
interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

// Returns a popup component which only displays when isOpen is true
const Popup: FC<PopupProps> = ({ children, isOpen, onClose }) => {
  // If the popup is not open, return null
  if (!isOpen) {
    return null;
  }

  // Returns the popup container
  // Renders the children of the popup within it
  return (
    <PopupPageContainer onClick={onClose}>
      <PopupContainer>
        {children}
      </PopupContainer>
    </PopupPageContainer>
  );
};

export default Popup;