import { FC, useState } from 'react';
import Link from 'next/link';
import QuizLinkContainer from './QuizLinkContainer';
import QuizName from './QuizName';
import QuizLinks from './QuizLinks';
import QuizLinkButton from './QuizLinkButton';
import DeleteQuizPopup from '../Popup/DeleteQuiz';

// Defines the props of the link component
interface QuizLinkProps {
  // The name of the quiz it links to
  name: string,
  // The id of the quiz it links to which is used to get the url
  _id: string,
}

// Simple React component to render a quiz link
const QuizLink: FC<QuizLinkProps> = ({ name, _id }) => {
  // The state of the popup used to confirm delete
  // Popup is hidden by default
  const [openDelete, setOpenDelete] = useState(false);
  // Generates a URL to play the quiz
  // Base URL is /quiz/:id
  const PLAY_URL = `/quiz/${_id}`;
  // Generates a URL to edit the quiz
  // Base URL is /edit/:id/
  const EDIT_URL = `/edit/${_id}`;

  // Next uses a Link component to generate a link
  // The a tag is generated with the name of the quiz and the URL from this
  // This allows the link to be styled with CSS
  return (
    <>
      <DeleteQuizPopup isOpen={openDelete} onClose={() => setOpenDelete(false)} quizName={name} quizId={_id} />
      <QuizLinkContainer>
        <QuizName>{name}</QuizName>
        {/* Container for the links related to a quiz */}
        <QuizLinks>
          {/* Link to play the quiz */}
          <Link href={PLAY_URL}>
            <a>Play</a>
          </Link>
          {/* Link to edit the quiz */}
          <Link
            href={EDIT_URL}
          >
            <a>Edit</a>
          </Link>
          {/* Link to delete the quiz */}
          <QuizLinkButton
            onClick={() => setOpenDelete(true)}
          >
            Delete
          </QuizLinkButton>
        </QuizLinks>
      </QuizLinkContainer>
    </>
  );
};

export default QuizLink;