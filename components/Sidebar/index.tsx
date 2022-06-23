import { FC } from 'react';
import SidebarContainer from './SidebarContainer';
import SidebarLink from './SidebarLink';

// Renders the sidebar which will always be visible
// The sidebar will contain links to the different pages
const Sidebar: FC = () => {
  // Renders a div containing the links
  // It displayed the links in order
  return (
    <SidebarContainer>
      <SidebarLink text='Dashboard' to='/' />
      <SidebarLink text='Quizzes' to='/quizzes' />
      <SidebarLink text='Create' to='/create' />
      <SidebarLink text='Subjects' to='/subjects' />
    </SidebarContainer>
  );
};

export default Sidebar;