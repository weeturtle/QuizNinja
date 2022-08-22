import { FC, useState } from 'react';
import { PrimaryButton, SecondaryButton } from './AccountButtons';
import AccountInput from './AccountInput';
import styled from 'styled-components';
import Link from 'next/link';

// The type of the account used within the form
export interface AccountType {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

// The styled container for the account form
// Styles inner components to reduce the amount of code
const StyledContainer = styled.div`
  width: 400px;

  .names {
    width: 100%;

    display: flex;
    flex-direction: row;
    gap: 12px;

    &>div {
      width: 80%;
    }
  }

  .buttons {
    width: 100%;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
`;

// The parameters for the account form
// Used to deconstruct the form values and create or edit an account
interface AccountInputProps {
  firstname: string;
  lastname: string;
  email: string;
  submitText: string;
  handleSubmit: ({
    firstname,
    lastname,
    email,
    password,
  }: AccountType) => void;
}
  
// The account form component that is rendered on the signup page
// This is used to create a new account and edit an existing account
const AccountForm: FC<AccountInputProps> = ({
  firstname: initialFirstname,
  lastname: initialLastname,
  email: initialEmail,
  handleSubmit,
  submitText,
}) => {
  // Creates a useState variable for the form values
  // The initial values are the values passed in as props
  // The values are updated when the form is edited
  const [firstname, setFirstname] = useState(initialFirstname);
  const [lastname, setLastname] = useState(initialLastname);
  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState('');

  // Returns the styled inputs for the account form
  return (
    <StyledContainer>
      <div className='names'>
        <AccountInput
          placeholder='Firstname'
          text={firstname}
          setText={setFirstname}
          name='firstname'
        />
        <AccountInput
          placeholder='Lastname'
          text={lastname}
          setText={setLastname}
          name='lastname'
        />
      </div>
      <AccountInput
        placeholder='Email'
        text={email}
        setText={setEmail}
        name='email'
      />
      <AccountInput
        placeholder='Password'
        text={password}
        setText={setPassword}
        type='password'
        name='password'
      />
      <div className='buttons'>
        <Link href='/accounts/login'>
          <SecondaryButton>Cancel</SecondaryButton>
        </Link>
        <PrimaryButton onClick={() => handleSubmit({
          firstname,
          lastname,
          email,
          password,
        })}>{submitText}</PrimaryButton>
      </div>
    </StyledContainer>
  );
};

export default AccountForm;
