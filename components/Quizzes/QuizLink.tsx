import { FC } from 'react';
import Link from 'next/link';
import QuizLinkContainer from './QuizLinkContainer';
import QuizName from './QuizName';
import QuizLinks from './QuizLinks';
import QuizLinkButton from './QuizLinkButton';

// Defines the props of the link component
interface QuizLinkProps {
  // The name of the quiz it links to
  name: string,
  // The id of the quiz it links to which is used to get the url
  _id: string,
}

// Simple React component to render a quiz link
const QuizLink: FC<QuizLinkProps> = ({ name, _id }) => {
  // Generates a URL for the quiz
  // Base URL is /quizzes/:id
  const URL = `/quiz/${_id}`;

  // Next uses a Link component to generate a link
  // The a tag is generated with the name of the quiz and the URL from this
  // This allows the link to be styled with CSS
  return (
    <QuizLinkContainer>
      <QuizName>{name}</QuizName>
      {/* Container for the links related to a quiz */}
      <QuizLinks>
        {/* Link to play the quiz */}
        <Link href={URL}>
          <a>Play</a>
        </Link>
        {/* Link to edit the quiz */}
        <QuizLinkButton
          onClick={() => console.log('Edit')}
        >
          Edit
        </QuizLinkButton>
        {/* Link to delete the quiz */}
        <QuizLinkButton
          onClick={() => console.log('Delete')}
        >
          Delete
        </QuizLinkButton>
      </QuizLinks>
    </QuizLinkContainer>
  );
};

export default QuizLink;