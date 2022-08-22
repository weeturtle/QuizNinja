import { GetServerSidePropsContext, NextPage } from 'next';
import Signup from '../../components/Account/Signup';
import getUser from '../../lib/frontend/getUser';
// The signup page is used to create a new user
// It is only accessible to users who are not logged in
const SigninPage: NextPage = () => {
  return (
    <Signup />
  );
};

export default SigninPage;

// Get the user from the server
// If the user is logged in, redirect them to the account page
export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  // Fetches the props from the common getUser function
  const { props } = await getUser(context);

  // If the user attribute is set, redirect them to the account page
  return props.user && {
    redirect: {
      destination: '/accounts/account',
      permanent: false
    }
  };
};