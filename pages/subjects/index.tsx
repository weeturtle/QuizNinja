import { NextPage } from 'next';
import { useEffect } from 'react';
import LoadWrapper from '../../components/General/LoadWrapper';
import useSubjects from '../../lib/frontend/fetchSubjects';

const SubjectPage: NextPage = () => {
  const [subjects, updateSubjects, loadingState] = useSubjects();

  useEffect(() => {
    updateSubjects();
  }, []);

  return (
    <LoadWrapper loadingState={loadingState}>
      {
        subjects?.map((subject, index) => (
          <div key={index}>
            <p>{subject.name}</p>
          </div>
        ))
      }
    </LoadWrapper>
  );
};

export default SubjectPage;