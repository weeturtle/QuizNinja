import { FC } from 'react';
import { QuizPartial } from '../../prisma/zod';
import QuizLink from './QuizLink';
import QuizLinkContainer from './QuizLinksContainer';


// Defines the props of the component
// The props are the array quizzes with ids to be displayed
// The searchTerm is the search term used to filter the quizzes
interface QuizListProps {
  quizzes: QuizPartial[],
  searchTerm?: string,
  userId: string,
}

// Returns a styled list of quizzes
// Can be scrolled through if the list is too long
const QuizList: FC<QuizListProps> = ({ quizzes, searchTerm, userId }) => {
  return (
    <QuizLinkContainer>
      {
        (
          // If the search term is not provided, display all quizzes
          searchTerm ?
            // Filter the quizzes by the search term
            quizzes.filter(quiz => quiz.name.toLowerCase().includes(searchTerm.toLowerCase()) || quiz.id === searchTerm)
            :
            quizzes
        )
        // Map the quizzes to a list of QuizLink components
          .map((quiz, i) => (
            // The key is the index of the quiz used to differentiate it for rendering
            // The QuizLink is a react component that is used to display a quiz
            <QuizLink
              hasRights={quiz.creatorId === userId}
              name={quiz.name} id={quiz.id}
              key={i}
            />
          ))}
    </QuizLinkContainer>
  );
};

export default QuizList;