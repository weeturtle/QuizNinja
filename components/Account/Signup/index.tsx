import { useRouter } from 'next/router';
import { FC } from 'react';
import styled from 'styled-components';
import AccountForm, { AccountType } from '../AccountFom';
import StyledTitle from '../StyledTitle';

// Styles the signin form and contained components
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

// The signup form component that is rendered on the signup page
// This is used to create a new account
const Signup: FC = () => {
  // Router hook to get redirect the page later on
  const router = useRouter();

  // The function called when the signup form is submitted
  // Takes the deconstructed NewAccount object and creates a new account
  const handleSubmit = async ({
    firstname,
    lastname,
    email,
    password,
  }: AccountType) => {
    // Sends the POST request to the server to create a new account
    // The body contains the name, email and password of the new account
    const response = await fetch('/api/account/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstname,
        lastname,
        email,
        password,
      })
    });

    // If the response is successful, redirect the user to the dashboard page
    if (response.status === 200) {
      router.push('/');
    }
  };

  // Returns the account form component with the handleSubmit function passed in as a prop
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