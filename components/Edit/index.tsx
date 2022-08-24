import { Quiz } from '@prisma/client';
import { FC, useState } from 'react';
import { SubjectsPartial } from '../../prisma/zod';
import QuizFormContainer from '../QuizForm/QuizFormContainer';
import QuizInformationContainer from '../QuizForm/QuizInformationContainer';
import QuizInformationInput from '../QuizForm/QuizInformationInput';
import QuizQuestionsContainer from '../QuizForm/QuizQuestionsContainer';
import SubjectEntryBox from '../QuizForm/SubjectEntry';
import SubmitQuizButton from '../QuizForm/SubmitQuizButton';

interface EditProps {
  quiz: Quiz;
  subjects: SubjectsPartial;
  updateQuiz: (quiz: Quiz) => void;
}

const Edit: FC<EditProps> = ({ quiz, subjects, updateQuiz }) => {
  const [name, setName] = useState(quiz.name);
  const [isPrivate, setIsPrivate] = useState(quiz.private);
  const [subjectId, setSubjectId] = useState(quiz.subjectId || '');
  const [questions, setQuestions] = useState(quiz.questions);

  const handleSubmitQuiz = () => {
    updateQuiz({
      id: quiz.id,
      name,
      subjectId,
      questions,
      private: isPrivate,
      creatorId: quiz.creatorId,
      createdAt: new Date(quiz.createdAt),
      updatedAt: new Date(Date.now())
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

export default Edit;