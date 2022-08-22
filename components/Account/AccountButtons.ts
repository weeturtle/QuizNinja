import styled from 'styled-components';
import Colours from '../../styles/colours';

// Styles the main button on the account forms and sign in page
export const PrimaryButton = styled.button`
  width: 8rem;

  color: ${Colours.PRIMARY};
  background-color: transparent;

  border: 1px solid ${Colours.PRIMARY};
  border-radius: 12px;

  font-size: 16px;
  cursor: pointer;

  padding-block: 0.75rem;
`;

// Styles the secondary button on the account forms and sign in page
export const SecondaryButton = styled.a`
  width: 8rem;

  background-color: transparent;
  color: ${Colours.ACCENTED_TEXT};
  
  border: 1px solid ${Colours.ACCENTED_TEXT};
  border-radius: 12px;

  font-size: 16px;
  text-align: center;
  cursor: pointer;


  padding-block: 0.75rem;

`;
