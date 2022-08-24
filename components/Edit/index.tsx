import { Quiz, Subject } from '@prisma/client';
import { FC } from 'react';

interface EditProps {
  quiz: Quiz;
  subjects: Subject[];
}

const Edit: FC<EditProps> = ({ quiz, subjects }) => {
  return (
    <>
      <h1>{quiz.name}</h1>
    </>
  );
};

export default Edit;