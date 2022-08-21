import Link from 'next/link';
import { FC } from 'react';

interface SubjectLinkProps {
  name: string,
  id: string,
}

const SubjectLink: FC<SubjectLinkProps> = ({ name, id }) => {
  return (
    <Link href={`/quizzes/${id}`}>
      <a>{name}</a>
    </Link>
  );
};

export default SubjectLink;