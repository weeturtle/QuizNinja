import styled from 'styled-components';
import Colours from '../../styles/colours';

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
