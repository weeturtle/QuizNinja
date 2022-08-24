import { GetServerSidePropsContext, NextPage } from 'next';
import { useEffect, useState } from 'react';
import LoadWrapper from '../../components/General/LoadWrapper';
import useSubjects from '../../lib/frontend/fetchSubjects';
import SubjectList from '../../components/Subjects/SubjectsList';
import Searchbox from '../../components/General/Searchbox';
import SubjectsPageContainer from '../../components/Subjects/SubjectsPageContainer';
import getUser from '../../lib/frontend/getUser';

const SubjectPage: NextPage = () => {
  const [subjects, updateSubjects, loadingState] = useSubjects();

  // Uses a state hook to store the search term
  // The search term is used to filter the subjects.
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    updateSubjects();
  }, []);

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
export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  return getUser(context);
};