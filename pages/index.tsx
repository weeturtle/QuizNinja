import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { useState } from 'react';
import PageTitle from '../components/General/PageTitle';
import Popup from '../components/Popup';
import getUser from '../lib/frontend/getUser';


const Home = ({ user }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [isOpen, setIsOpen] = useState(false);

  const addQuiz = async () => {
    const response = await fetch('/api/quiz', {
      method: 'POST'
    });

    console.log(response);
  };

  return (
    <>
      <PageTitle>Dashboard</PageTitle>
      <button onClick={() => setIsOpen(true)}>Open popup</button>

      <button onClick={addQuiz}>Add quiz</button>

      <Popup isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <h1>Popup</h1>
      </Popup>

      <p>{user?.firstname}</p>
    </>
  );
};

export default Home;

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  return getUser(context);
};