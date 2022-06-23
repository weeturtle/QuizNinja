import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC } from 'react';

// Defines the props for the link
// The text is what will displayed on the link
// The to is the url of the link
interface SidebarLinkProps {
  // The to variable is typed allowing a string formatted as a url
  // Only allows one level of nesting
  // Like /quizzes or /create
  to: `/${string}`,
  text: string
}

// The link that will be rendered in the sidebar
// The link is styled with CSS
const SidebarLink: FC<SidebarLinkProps> = ({ to, text }) => {
  // Creating an instance of the Next router object
  const router = useRouter();

  // If the current url is the same as the link url
  // The link will be styled as active
  const isActive = router.pathname === to;

  // Returns a styled link with the text and the url
  return (
    <Link href={to}>
      <a href={to}>{text}</a>
    </Link>
  );
};

export default SidebarLink;