import { FC, useState } from 'react';
import AccountInput from '../AccountInput';
import styled from 'styled-components';
import StyledTitle from '../StyledTitle';
import { PrimaryButton, SecondaryButton } from '../AccountButtons';
import Link from 'next/link';

const StyledContainer = styled.div`
  width: 25rem;
  height: 40%;

  display: flex;
  flex-direction: column;
  justify-content: space-between;


  &>div {
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

  const handleSubmit = async () => {
    console.log(email, password);

    const response = await fetch('/api/account/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      })
    });

    const data = await response.json();

    console.table(data);
  };

  return (
    <StyledContainer>
      <StyledTitle>Login</StyledTitle>
      <div>
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
          <Link href='/accounts/signup'>
            <SecondaryButton>Create Account</SecondaryButton>
          </Link>
          <PrimaryButton onClick={handleSubmit}>Log In</PrimaryButton>
        </div>
      </div>
    </StyledContainer>
  );
};

export default Login;