import { removeCookies } from 'cookies-next';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Account from '../../components/Account/AccountsPage';
import getUser from '../../lib/frontend/getUser';
import { ApiProps } from '../../types/cookieType';

const AccountPage: NextPage = () => {
  const router = useRouter();

  const signout = () => {
    removeCookies('token');
    router.push('/accounts/login');
  };

  return (
    <>
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
      <button onClick={signout}>Sign out</button>
    </>
  );
};

export default AccountPage;

export async function getServerSideProps({ req, res }: ApiProps) {
  const user = await getUser(req, res);
  if (!user) {
    return {
      redirect: {
        permanent: false,
        destination: '/accounts/login',
      },
      props: {},
    };
  }
  return {
    props: {
      user,
    },
  };
}