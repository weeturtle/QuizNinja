import { Question } from '@prisma/client';
import { FC, useState } from 'react';
import handleSubject from '../../lib/frontend/handleSubject';
import { NewQuizModel, SubjectsPartial } from '../../prisma/zod';
import QuizFormContainer from '../QuizForm/QuizFormContainer';
import QuizInformationContainer from '../QuizForm/QuizInformationContainer';
import QuizInformationInput from '../QuizForm/QuizInformationInput';
import QuizQuestionsContainer from '../QuizForm/QuizQuestionsContainer';
import SubjectEntryBox from '../QuizForm/SubjectEntry';
import SubmitQuizButton from '../QuizForm/SubmitQuizButton';

interface CreateProps {
  subjects: SubjectsPartial;
  createQuiz: (quiz: NewQuizModel) => void;
  creatorId: string;
}

const Create: FC<CreateProps> = ({ subjects, createQuiz, creatorId }) => {
  const [name, setName] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const [subjectId, setSubjectId] = useState('');
  const [subjectName, setSubjectName] = useState('');
  const [questions, setQuestions] = useState<Question[]>([]);

  const handleSubmitQuiz = async () => {
    const subId = await handleSubject(subjectId, subjectName);

    createQuiz({
      name,
      subjectId: subId,
      questions,
      private: isPrivate,
      creatorId,
    });
  };

  return (
    <QuizFormContainer>
      <QuizInformationContainer>
        <QuizInformationInput
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder='Name'
        />
        <SubjectEntryBox
          subjects={subjects}
          subjectId={subjectId}
          setSubjectId={setSubjectId}
          setSubjectName={setSubjectName}
        />
        <input
          type='checkbox'
          checked={isPrivate}
          onChange={() => setIsPrivate(isPrivate => !isPrivate)}
        />
      </QuizInformationContainer>
      <QuizQuestionsContainer questions={questions} setQuestions={setQuestions} />
      <SubmitQuizButton onClick={handleSubmitQuiz}>Submit</SubmitQuizButton>
    </QuizFormContainer>
  );
};

export default Create;