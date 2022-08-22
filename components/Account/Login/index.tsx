import { FC, useState } from 'react';
import AccountInput from '../AccountInput';
import styled from 'styled-components';
import Colours from '../../../styles/colours';

const StyledContainer = styled.div`
  width: 25rem;
  height: 40%;

  display: flex;
  flex-direction: column;
  justify-content: space-between;


  form {
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

const StyledTitle = styled.h1`
  font-size: 32px;
  color: ${Colours.PRIMARY};
`;

const SubmitButton = styled.button`
  width: 8rem;

  color: ${Colours.PRIMARY};
  border: 1px solid ${Colours.PRIMARY};
  background-color: transparent;

  font-size: 16px;

  padding-block: 0.75rem;
`;

const SigninButton = styled(SubmitButton)`
  color: ${Colours.ACCENTED_TEXT};
  border: 1px solid ${Colours.ACCENTED_TEXT};
`;

const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <StyledContainer>
      <StyledTitle>Login</StyledTitle>
      <form>
        <AccountInput placeholder='Email' type='email' text={email} setText={setEmail} />
        <AccountInput placeholder='Password' type='password' text={password} setText={setPassword} />
        <div className='button-container'>
          <SigninButton>Sign Up</SigninButton>
          <SubmitButton type='submit'>Login</SubmitButton>
        </div>
      </form>
    </StyledContainer>
  );
};

export default Login;