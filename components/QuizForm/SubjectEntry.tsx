import { Subject } from '@prisma/client';
import { FC, useEffect, useState } from 'react';
import levenshteinDistance from '../../lib/Levenshtein';

// Defines the props of the component
// The props are the array subjects with ids to be displayed
// The searchTerm is the search term used to filter the subjects
interface SubjectListProps {
  subjects: Subject[],
}

const SubjectEntryBox: FC<SubjectListProps> = ({ subjects }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [renderSubjects, setRenderSubjects] = useState(subjects);

  useEffect(() => {
    setRenderSubjects(subjects.filter(subject =>
      levenshteinDistance(subject.name.toLowerCase(), searchTerm.toLowerCase()) < 3 ||
      subject.name.toLowerCase().includes(searchTerm.toLowerCase())
    ));
  }, [searchTerm]);

  return (
    <div>
      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder='Subject...'
      />
      {
        renderSubjects.map((subject, i) => (
          <p key={i}>{subject.name}</p>
        ))
      }
    </div>
  );
};

export default SubjectEntryBox;