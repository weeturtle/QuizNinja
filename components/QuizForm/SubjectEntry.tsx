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
  // Class used to store the array of subjects meaning it doesn't need to be passed as a prop
  // Contains the functions to manipulate the array of subjects
  const s = new SubjectSelectHandler(subjects);

  // The search term is used to filter the subjects
  // It is set to the initial subject name
  const [searchTerm, setSearchTerm] = useState(s.getSubjectNameFromId(initialSubjectId));

  // Array of subjects that match the search term
  // These subjects are rendered as options in the select box
  const [renderSubjects, setRenderSubjects] = useState(subjects);

  // The functions are called whenever the search term is changed
  useEffect(() => {
    // Sets the array of subjects to be rendered to the array of subjects that match the search term
    setRenderSubjects(s.filterFunction(searchTerm));

    // Sets the subject id to the matching subject name if there is one
    setSubjectId(s.getSubjectsIdFromName(searchTerm));

    // Sets the subject name to the search term
    setSubjectName(searchTerm);
  }, [searchTerm]);


  // Renders the select box that allows the user to select a subject
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