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
  id: string,
  // The privacy of the quiz it links to
  hasRights: boolean;
}

// Simple React component to render a quiz link
const QuizLink: FC<QuizLinkProps> = ({ name, id, hasRights }) => {
  // The state of the popup used to confirm delete
  // Popup is hidden by default
  const [openDelete, setOpenDelete] = useState(false);
  // Generates a URL to play the quiz
  // Base URL is /quiz/:id
  const PLAY_URL = `/quiz/${id}`;
  // Generates a URL to edit the quiz
  // Base URL is /edit/:id/
  const EDIT_URL = `/edit/${id}`;

  // Next uses a Link component to generate a link
  // The a tag is generated with the name of the quiz and the URL from this
  // This allows the link to be styled with CSS
  const handleShare = () => {
    // Coppies the ID to the clipboard
    navigator.clipboard.writeText(id);
    // Displays a message to the user
    alert('Quiz ID copied to clipboard');
  };

  return (
    <>
      <DeleteQuizPopup isOpen={openDelete} onClose={() => setOpenDelete(false)} quizName={name} quizId={id} />
      <QuizLinkContainer>
        <QuizName>{name}</QuizName>
        {/* Container for the links related to a quiz */}
        <QuizLinks>
          {/* Link to play the quiz */}
          <Link href={PLAY_URL}>
            <a>Play</a>
          </Link>
          <QuizLinkButton
            onClick={handleShare}
          >
            Share
          </QuizLinkButton>
          {hasRights && (
            <>
              <Link
                href={EDIT_URL}
              >
                <a>Edit</a>
              </Link>
              <QuizLinkButton
                onClick={() => setOpenDelete(true)}
              >
              Delete
              </QuizLinkButton>
            </>
          )}
        </QuizLinks>
      </QuizLinkContainer>
    </>
  );
};

export default QuizLink;