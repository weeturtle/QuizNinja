import { FC } from 'react';
import { SubjectsPartial } from '../../prisma/zod';
import SubjectLink from './SubjectLink';
import { SubjectLinkContainer } from './SubjectLinkContainer';

// Defines the props of the component
// The props are the array subjects with ids to be displayed

// The searchTerm is the search term used to filter the subjects
interface SubjectListProps {
  subjects: SubjectsPartial,
  searchTerm?: string,
}

// Returns a styled list of subjects
// Can be scrolled through if the list is too long
const SubjectList: FC<SubjectListProps> = ({ subjects, searchTerm }) => {
  return (
    <SubjectLinkContainer>
      {
        (
          // If the search term is not provided, display all subjects
          searchTerm ?
            // Filter the subjects by the search term
            subjects.filter(quiz => quiz.name.toLowerCase().includes(searchTerm.toLowerCase()))
            :
            subjects
        )
        // Map the quizzes to a list of SubjectLinkLink components
          .map((subject, i) => (
            // The key is the index of the subject used to differentiate it for rendering
            // The SubjectLink is a react component that is used to display a subject
            <SubjectLink name={subject.name} id={subject.id} key={i} />
          ))}
    </SubjectLinkContainer>
  );
};

export default SubjectList;