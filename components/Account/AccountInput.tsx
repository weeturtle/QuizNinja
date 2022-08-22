import { Dispatch, FC, SetStateAction } from 'react';
import styled from 'styled-components';
import Colours from '../../styles/colours';

interface AccountInputProps {
  text: string;
  setText: Dispatch<SetStateAction<string>>;
  placeholder: string;
  name: string;
  type?: string;
}

const StyledContainer = styled.div`
	position: relative;
  width: 400px;
  height: 45px;

  input {
    width: 100%;
    height: 100%;

    padding-left: 12px;

    border: 1px solid ${Colours.PRIMARY};
    background-color: transparent;
    border-radius: 12px;
    outline: none;

    font-size: 18px;
    color: ${Colours.PRIMARY};
  }

  input:focus ~ .floating-label,
  .floating-label[data-contains='true'] {
    transform: translateY(-20px);
  }
  
  .floating-label {
    pointer-events: none;

    position: absolute;
    left: 8px;
    top: 12px;

    padding-inline: 4px;
    
    color: ${Colours.ACCENTED_TEXT};
    background-color: ${Colours.BACKGROUND};

    transition: transform 0.15s ease-in-out;
  }
`;


const AccountInput: FC<AccountInputProps> = ({ text, setText, placeholder, name, type='text' }) => {
  return (
    <StyledContainer>
      <input type={type} value={text} onChange={(e) => setText(e.target.value)} name={name} />
      <label className='floating-label' data-contains={text.length > 0}>{placeholder}</label>
    </StyledContainer>
  );
};

export default AccountInput;