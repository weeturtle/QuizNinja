import { FC } from 'react';
import SidebarLink from './SidebarLink';

// Renders the sidebar which will always be visible
// The sidebar will contain links to the different pages
const Sidebar: FC = () => {
  // Renders a div containing the links
  // It displayed the links in order
  return (
    <div>
      <SidebarLink text='Dashboard' to='/' />
      <SidebarLink text='Quizzes' to='/quizzes' />
      <SidebarLink text='Create' to='/create' />
      <SidebarLink text='Subjects' to='/subjects' />
    </div>
  );
};

export default Sidebar;