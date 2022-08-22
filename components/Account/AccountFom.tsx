import { FC, useState } from 'react';
import { PrimaryButton, SecondaryButton } from './AccountButtons';
import AccountInput from './AccountInput';
import styled from 'styled-components';
import Link from 'next/link';

export interface AccountType {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

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

interface AccountInputProps {
  firstname: string;
  lastname: string;
  email: string;
  handleSubmit: ({
    firstname,
    lastname,
    email,
    password,
  }: AccountType) => void;
}
  
const AccountForm: FC<AccountInputProps> = ({
  firstname: initialFirstname,
  lastname: initialLastname,
  email: initialEmail,
  handleSubmit,
}) => {
  const [firstname, setFirstname] = useState(initialFirstname);
  const [lastname, setLastname] = useState(initialLastname);
  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState('');

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
        })}>Create Account</PrimaryButton>
      </div>
    </StyledContainer>
  );
};

export default AccountForm;
