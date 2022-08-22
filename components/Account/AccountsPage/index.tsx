import { User } from '@prisma/client';
import { FC } from 'react';
import styled from 'styled-components';
import AccountForm, { AccountType } from '../AccountFom';

interface AccountProps {
  user: User
}

const AccountContainer = styled.div`
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


const Account: FC<AccountProps> = ({ user }) => {
  const handleSubmit = async ({
    firstname,
    lastname,
    email,
    password 
  }: AccountType) => {
    console.log(firstname, lastname, email, password);
  };
  return (
    <AccountContainer>
      <AccountForm
        firstname={user.firstname}
        lastname={user.lastname}
        email={user.email}
        handleSubmit={handleSubmit}
        submitText='Update Account'
      />      
    </AccountContainer>
  );
};

export default Account;