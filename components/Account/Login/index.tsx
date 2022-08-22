import { FC, useState } from 'react';
import AccountInput from '../AccountInput';
import styled from 'styled-components';
import StyledTitle from '../StyledTitle';
import { PrimaryButton, SecondaryButton } from '../AccountButtons';

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



const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(email, password);
  };

  return (
    <StyledContainer>
      <StyledTitle>Login</StyledTitle>
      <form onSubmit={handleSubmit}>
        <AccountInput
          placeholder='Email'
          type='email'
          text={email}
          name='email'
          setText={setEmail}
        />
        <AccountInput
          placeholder='Password'
          type='password'
          text={password}
          setText={setPassword}
          name='password'
        />

        <div className='button-container'>
          <SecondaryButton>Create Account</SecondaryButton>
          <PrimaryButton type='submit' value='Log in'/>
        </div>
      </form>
    </StyledContainer>
  );
};

export default Login;