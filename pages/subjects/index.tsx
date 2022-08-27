import { GetServerSidePropsContext, InferGetServerSidePropsType, NextPage } from 'next';
import { useState } from 'react';
import LoadWrapper from '../../components/General/LoadWrapper';
import SubjectList from '../../components/Subjects/SubjectsList';
import Searchbox from '../../components/General/Searchbox';
import SubjectsPageContainer from '../../components/Subjects/SubjectsPageContainer';
import getUser from '../../lib/frontend/getUser';
import { PartialUserModel, SubjectsPartial } from '../../prisma/zod';
import generatePropType from '../../lib/frontend/generatePropType';
import useLoadingState from '../../lib/frontend/loadingState';

type propType = InferGetServerSidePropsType<typeof getServerSideProps>;

// This is the page that is used to access the subjects
const SubjectPage: NextPage<propType> = ({ subjects }: propType) => {
  // Uses a state hook to store the search term
  // The search term is used to filter the subjects.
  const [searchTerm, setSearchTerm] = useState('');

  const {loadingState} = useLoadingState();

  return (
    <SubjectsPageContainer>
      <Searchbox value={searchTerm} onChange={setSearchTerm} placeholder='Search...' />
      <LoadWrapper loadingState={loadingState}>
        <SubjectList subjects={subjects} searchTerm={searchTerm} />
      </LoadWrapper>
    </SubjectsPageContainer>
  );
};

export default SubjectPage;

// Get the user from the server
// If the user is not logged in, redirect them to the login page
export const getServerSideProps = async (context: GetServerSidePropsContext): generatePropType<{user: PartialUserModel, subjects: SubjectsPartial}> => {
  // Fetches user from the current session
  const {props: { user }} = await getUser(context);

  // If the user is not logged in, redirect them to the login page
  if (!user) return {redirect: {destination: '/login', permanent: false}};

  // Fetches the subjects from the database
  const subjects = await prisma.subject.findMany();

  return {
    props: {
      user,
      subjects: SubjectsPartial.parse(subjects)
    }
  };
};