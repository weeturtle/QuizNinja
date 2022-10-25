import { GetServerSidePropsContext } from 'next';
import getUser from '../lib/frontend/getUser';

// Next page for the dashboard
const Home = () => {
  return (
    <>
    </>
  );
};

export default Home;

// Get the user from the server
// If the user is not logged in, redirect them to the login page
export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  return getUser(context);
};