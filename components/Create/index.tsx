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

// The create quiz page is used to create a new quiz
// subjects: array of subjects - the list of subjects that the user can choose from
// creatorId: string - the id of the user who created the quiz
// createQuiz: function - the function that will be called when the user submits the quiz
interface CreateProps {
  subjects: SubjectsPartial;
  createQuiz: (quiz: NewQuizModel) => void;
  creatorId: string;
}

// The create quiz page is used to make a new quiz
const Create: FC<CreateProps> = ({ subjects, createQuiz, creatorId }) => {
  // Deconsructs the quiz aspects into their own variables
  // They are stored in useStates to allow the user to change them
  // They are updated when the user changes the input
  const [name, setName] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const [subjectId, setSubjectId] = useState('');
  const [subjectName, setSubjectName] = useState('');
  const [questions, setQuestions] = useState<Question[]>([]);

  // This function is called when the user submits the quiz
  // It manages the subject and then creates the quiz
  const handleSubmitQuiz = async () => {
    // If the user entered a subject name that is not in the list of subjects
    // Then the subject is created and the subject id is returned
    // If the subject name exists then the subject id is returned
    const subId = await handleSubject(subjectId, subjectName);

    // Calls the create quiz function that was parsed from the props
    createQuiz({
      name,
      subjectId: subId,
      questions,
      private: isPrivate,
      creatorId,
    });
  };

  // Renders a form that allows the user to create a quiz
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

export default Create;