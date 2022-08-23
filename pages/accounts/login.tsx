import { GetServerSidePropsContext, NextPage } from 'next';
import Login from '../../components/Account/Login';
import getUser from '../../lib/frontend/getUser';

const LoginPage: NextPage = () => {
  return (
    <Login />
  );
};

export default LoginPage;

// Get the user from the server
// If the user is logged in, redirect them to the account page
export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  // Fetches the props from the common getUser function
  const { props } = await getUser(context);

  // If the user attribute is set, redirect them to the account page
  if (props.user) return {
    redirect: {
      destination: '/accounts/account',
      permanent: false
    }
  };

  return { props };
};