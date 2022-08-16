import { FC, useState } from 'react';
import styled from 'styled-components';
import Colours from '../../styles/colours';

// Styles the searchbox container and the input field within it
const SearchBoxContainer = styled.div`
  width: 30vw;
  height: 8vh;

  border: 1px solid ${Colours.PRIMARY};
  
  input[type='text'] {
    font-size: 1.5rem;
    color: ${Colours.TEXT};
    width: 100%;
    height: 100%;
    background-color: transparent;
    border: none;
    outline: none;
  }

`;

// The searchbox component can take parameters being: 
// - value: The current search term.
// - onChange: A function that is called when the search term is changed.
// - ariaLabel: The aria label for the searchbox.
// - placeholder: The placeholder text for the searchbox.
interface SearchboxProps {
  ariaLabel?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  value?: string;
}

// The searchbox is a React component instead of just an HTML element.
const Searchbox: FC<SearchboxProps> = ({ ariaLabel, placeholder, onChange: setExternalSearchTerm, value: externalSearchTerm }) => {
  // The search term is stored in a state variable.
  const [internalSearchTerm, setInternalSearchTerm] = useState('');

  // When the search term is changed, the search term is updated.
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // If a search term is provided, use that.
    // Otherwise, use the value of the searchbox.
    setExternalSearchTerm ? setExternalSearchTerm(e.target.value) : setInternalSearchTerm(e.target.value);
  };

  return (
    <SearchBoxContainer>
      <input
        type="text"
        value={externalSearchTerm || internalSearchTerm}
        onChange={handleChange}
        placeholder={placeholder}
        aria-label={ariaLabel || 'search-box'}
      />
    </SearchBoxContainer>
  );
}; 

export default Searchbox;