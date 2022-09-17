import { GetServerSidePropsContext } from 'next';
import dynamic from 'next/dynamic';
import PageTitle from '../components/General/PageTitle';
import getUser from '../lib/frontend/getUser';

// Import and render the canvas component
// This is done dynamically to prevent the canvas from being rendered on the server
// This is because the canvas uses the window object which is not available on the server
const Canvas = dynamic(() => import('../components/Canvas'), { ssr: false });

// Next page for the dashboard
const Home = () => {
  return (
    <>
      <PageTitle>Dashboard</PageTitle>
      <Canvas />
    </>
  );
};

export default Home;

// Get the user from the server
// If the user is not logged in, redirect them to the login page
export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  return getUser(context);
};