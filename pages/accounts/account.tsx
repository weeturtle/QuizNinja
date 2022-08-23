import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import Account from '../../components/Account/AccountsPage';
import getUser from '../../lib/frontend/getUser';
import { removeCookies } from 'cookies-next';

// Next page component for the account page
// This page is only accessible to logged in users
// It is used to modify the user's account details
const AccountPage = ({ user }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  // Get the router from Next.js to redirect the user to the home page if they are not logged in
  const router = useRouter();

  // Allows the user to log out
  const signout = () => {
    // Remove the cookies from the browser
    // This will remove the user id from the session
    removeCookies('token');

    // Redirect the user to the login page
    router.push('/accounts/login');
  };

  // Render the account page
  // Displays the user's account details and allows them to modify them
  // Creates a button to sign out
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

// Get the user from the server
// If the user is not logged in, redirect them to the login page
export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  return getUser(context);
};