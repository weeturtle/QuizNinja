import type { NextPage } from 'next';
import { useState } from 'react';
import PageTitle from '../components/General/PageTitle';
import Popup from '../components/Popup';

const Home: NextPage = () => {
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
    </>
  );
};

export default Home;
