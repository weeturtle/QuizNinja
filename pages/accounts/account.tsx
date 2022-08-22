import { NextPage } from 'next';
import Account from '../../components/Account/AccountsPage';

const AccountPage: NextPage = () => {

  return (
    <Account user={
      {
        id: '1',
        firstname: 'John',
        lastname: 'Doe',
        email: 'johndoe@example.com',
        password: 'pass',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    } />
  );
};

export default AccountPage;