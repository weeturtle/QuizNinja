import { FC } from 'react';
import styled from 'styled-components';
import AccountForm, { AccountType } from '../AccountFom';
import StyledTitle from '../StyledTitle';

const StyledContainer = styled.div`
  width: 30rem;
  height: 50%;

  display: flex;
  flex-direction: column;
  justify-content: space-between;


  div {
    display: flex;
    
    flex-direction: column;
    gap: 24px;

    .button-container {
      width: 100%;

      display: flex;
      flex-direction: row;   
      justify-content: space-between;

      margin-top: 20px;
    }
  }
`;

const Signup: FC = () => {
  const handleSubmit = async ({
    firstname,
    lastname,
    email,
    password,
  }: AccountType) => {
    console.log(firstname, lastname, email, password);
  };

  return (
    <StyledContainer>
      <StyledTitle>Create Account</StyledTitle>
      <AccountForm 
        firstname=''
        lastname=''
        email=''
        handleSubmit={handleSubmit}
        submitText='Create Account'
      />
    </StyledContainer>
  );
};

export default Signup;