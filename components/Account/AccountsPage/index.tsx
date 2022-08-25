import { FC } from 'react';
import styled from 'styled-components';
import { PartialUserModel } from '../../../prisma/zod';
import AccountForm, { AccountType } from '../AccountFom';

// The account page takes the user to get current information
// The user only contains some of the total user data
interface AccountProps {
  user: PartialUserModel
}

// Styles the account page and contained components
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

// The account page is used to get the user's current information
// It is stored in input boxes to allow the user to change it
const Account: FC<AccountProps> = ({ user }) => {
  // This function will be used to update the user's information
  const handleSubmit = async ({
    firstname,
    lastname,
    email,
    password 
  }: AccountType) => {
    fetch('/api/user', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: user.id,
        firstname,
        lastname,
        email,
        password
      })
    });
  };

  // Renders the account page and form
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