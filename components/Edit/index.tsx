import { Quiz } from '@prisma/client';
import { FC, useState } from 'react';
import handleSubject from '../../lib/frontend/handleSubject';
import { SubjectsPartial } from '../../prisma/zod';
import QuizFormContainer from '../QuizForm/QuizFormContainer';
import QuizInformationContainer from '../QuizForm/QuizInformationContainer';
import QuizInformationInput from '../QuizForm/QuizInformationInput';
import QuizQuestionsContainer from '../QuizForm/QuizQuestionsContainer';
import SubjectEntryBox from '../QuizForm/SubjectEntry';
import SubmitQuizButton from '../QuizForm/SubmitQuizButton';

// The edit component is used to edit a quiz
// quiz: Quiz - the quiz that is being edited
// subjects: array of subjects - the list of subjects that the user can choose from
// updateQuiz: function - the function that will be called when the user submits the quiz
interface EditProps {
  quiz: Quiz;
  subjects: SubjectsPartial;
  updateQuiz: (quiz: Quiz) => void;
}

// The edit component is used to edit a quiz
const Edit: FC<EditProps> = ({ quiz, subjects, updateQuiz }) => {
  // Deconsstructs the quiz aspects into their own variables
  // They are stored in useStates to allow the user to change them
  // They are updated when the user changes the input
  // They are set to the initial values of the quiz
  const [name, setName] = useState(quiz.name);
  const [isPrivate, setIsPrivate] = useState(quiz.private);
  const [subjectId, setSubjectId] = useState(quiz.subjectId || '');
  const [subjectName, setSubjectName] = useState('');
  const [questions, setQuestions] = useState(quiz.questions);

  // This function is called when the user submits the quiz
  const handleSubmitQuiz = async () => {
    // If the user entered a subject name that is not in the list of subjects
    // Then the subject is created and the subject id is returned
    // If the subject name exists then the subject id is returned
    const subId = await handleSubject(subjectId, subjectName);

    // Calls the update quiz function that was parsed from the props
    updateQuiz({
      id: quiz.id,
      name,
      subjectId: subId,
      questions,
      private: isPrivate,
      creatorId: quiz.creatorId,
      createdAt: new Date(quiz.createdAt),
      updatedAt: new Date(Date.now())
    });
  };

  // Renders a form that allows the user to edit a quiz
  // The form contains the quiz information, the quiz questions, and the submit button
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

export default Edit;