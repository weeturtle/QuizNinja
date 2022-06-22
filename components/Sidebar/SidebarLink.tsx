import { FC } from 'react';

interface SidebarLinkProps {
  to: string,
  text: string
}

const SidebarLink: FC<SidebarLinkProps> = ({ to, text }) => {
  return (
    <a href={to}>{text}</a>
  );
};

export default SidebarLink;