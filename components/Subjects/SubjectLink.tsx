import Link from 'next/link';
import { FC } from 'react';

// Parameters for the link component
// name - string - The name of the subject
// id - string - The id of the subject
interface SubjectLinkProps {
  name: string,
  id: string,
}

// The component that renders the subject link
const SubjectLink: FC<SubjectLinkProps> = ({ name, id }) => {
  // Returns a next link that links to the quizzes page for the subject
  return (
    <Link href={`/quizzes?subjectId=${id}`}>
      <a>{name}</a>
    </Link>
  );
};

export default SubjectLink;