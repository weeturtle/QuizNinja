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
  setSubjectId: (subjectId: string) => void,
  setSubjectName: (subjectName: string) => void,
}

const SubjectEntryBox: FC<SubjectListProps> = ({ subjects, subjectId: initialSubjectId, setSubjectId, setSubjectName }) => {
  const s = new SubjectSelectHandler(subjects);

  const [searchTerm, setSearchTerm] = useState(s.getSubjectNameFromId(initialSubjectId));
  const [renderSubjects, setRenderSubjects] = useState(subjects);

  useEffect(() => {
    setRenderSubjects(s.filterFunction(searchTerm));
    setSubjectId(s.getSubjectsIdFromName(searchTerm));
    setSubjectName(searchTerm);
  }, [searchTerm]);



  useEffect(() => {
    console.table(
      {
        searchTerm,
      }
    );
  }, [searchTerm]);

  return (
    <StyledSubjectContainer>
      <input
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
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