import { FC, useState } from 'react';
import AccountInput from '../AccountInput';
import styled from 'styled-components';
import StyledTitle from '../StyledTitle';
import { PrimaryButton, SecondaryButton } from '../AccountButtons';
import Link from 'next/link';
import { useRouter } from 'next/router';

// Styles the login form and contained components
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

// The login form is used to get the user's current information
const Login: FC = () => {
  // The email and passwords are stored as states
  // The states are updated when the user changes the input
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // The router is used to redirect the user to the dashboard page
  const router = useRouter();

  // This function will be called when the user submits the form
  const handleSubmit = async () => {
    // The request is sent to the server to log the user in
    // The body of the request is the email and password
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

    // If the login was successful, the user is redirected to the dashboard page
    if (response.status === 200) {
      router.push('/');
    }
  };

  // Renders the login form and contained components
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