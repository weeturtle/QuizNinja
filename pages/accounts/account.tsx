import { removeCookies } from 'cookies-next';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import Account from '../../components/Account/AccountsPage';
import getUser from '../../lib/frontend/getUser';

const AccountPage = ({ user }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();

  const signout = () => {
    removeCookies('token');
    router.push('/accounts/login');
  };

  return (
    <>
      {
        user && <Account user={user} />
      }
      <button onClick={signout}>Sign out</button>
    </>
  );
};

export default AccountPage;

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  return getUser(context);
};