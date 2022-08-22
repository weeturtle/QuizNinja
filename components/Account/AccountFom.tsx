import { FC, useState } from 'react';
import { PrimaryButton, SecondaryButton } from './AccountButtons';
import AccountInput from './AccountInput';
import styled from 'styled-components';

const StyledForm = styled.form`
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
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
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
    <StyledForm onSubmit={handleSubmit}>
      <div className='names'>
        <AccountInput placeholder='Firstname' text={firstname} setText={setFirstname} />
        <AccountInput placeholder='Lastname' text={lastname} setText={setLastname} />
      </div>
      <AccountInput placeholder='Email' text={email} setText={setEmail} />
      <AccountInput placeholder='Password' text={password} setText={setPassword} type='password' />
      <div className='buttons'>
        <SecondaryButton type='button'>Cancel</SecondaryButton>
        <PrimaryButton type='submit'>Create Account</PrimaryButton>
      </div>
    </StyledForm>
  );
};

export default AccountForm;
