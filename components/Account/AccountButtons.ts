import styled from 'styled-components';
import Colours from '../../styles/colours';

export const PrimaryButton = styled.button`
  width: 8rem;

  color: ${Colours.PRIMARY};
  border: 1px solid ${Colours.PRIMARY};
  background-color: transparent;

  font-size: 16px;

  padding-block: 0.75rem;
`;

export const SecondaryButton = styled(PrimaryButton)`
  color: ${Colours.ACCENTED_TEXT};
  border: 1px solid ${Colours.ACCENTED_TEXT};
`;
