import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { useState } from 'react';
import PageTitle from '../components/General/PageTitle';
import Popup from '../components/Popup';
import getUser from '../lib/frontend/getUser';

// Next page for the dashboard
// Takes the user from the server and renders the dashboard
const Home = ({ user }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  // State hook to store the the state of the popup
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <PageTitle>Dashboard</PageTitle>
      <button onClick={() => setIsOpen(true)}>Open popup</button>

      <Popup isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <h1>Popup</h1>
      </Popup>

      <p>{user?.firstname}</p>
    </>
  );
};

export default Home;

// Get the user from the server
// If the user is not logged in, redirect them to the login page
export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  return getUser(context);
};