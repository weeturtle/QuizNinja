import { FC, ReactNode } from 'react';
import PopupContainer from './PopupContainer';
import PopupPageContainer from './PopupPageContainer';

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

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