import { FC, useEffect, useState } from 'react';
import { SubjectsPartial } from '../../prisma/zod';
import SubjectSelectHandler from '../../lib/frontend/subjectSelect';
import { StyledSubjectContainer } from './StyledSubjectOptions';

// Defines the props of the component
// The props are the array subjects with ids to be displayed
// The searchTerm is the search term used to filter the subjects
interface SubjectListProps {
  subjects: SubjectsPartial,
  subjectId: string,
  setSubjectId: (subjectId: string, subjectName: string) => void,
}

const SubjectEntryBox: FC<SubjectListProps> = ({ subjects, subjectId: initialSubjectId }) => {
  const s = new SubjectSelectHandler(subjects);

  const [searchTerm, setSearchTerm] = useState(s.getSubjectNameFromId(initialSubjectId));
  const [subjectId, setSubjectId] = useState(initialSubjectId);
  const [renderSubjects, setRenderSubjects] = useState(subjects);

  useEffect(() => {
    setRenderSubjects(s.filterFunction(searchTerm));
    setSubjectId(s.getSubjectsIdFromName(searchTerm));
  }, [searchTerm]);



  useEffect(() => {
    console.table(
      {
        subjectId,
        searchTerm,
      }
    );
  }, [searchTerm]);

  return (
    <StyledSubjectContainer>
      <input
        value={searchTerm || s.getSubjectNameFromId(subjectId)}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setSubjectId('');
        }}
        placeholder='Subject...'
      />
      <div className='subject-option-container'>
        {
          renderSubjects.map((subject, i) => (
            <button
              key={i}
              onClick={() => setSearchTerm(subject.name)}
            >
              {subject.name}
            </button>
          ))
        }
      </div>
    </StyledSubjectContainer>
  );
};

export default SubjectEntryBox;