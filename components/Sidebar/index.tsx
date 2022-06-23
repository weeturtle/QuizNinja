import { FC } from 'react';
import SidebarContainer from './SidebarContainer';
import SidebarHeader from './SidebarHeader';
import SidebarLink from './SidebarLink';
import SidebarLinkContainer from './SidebarLinkContainer';

// Renders the sidebar which will always be visible
// The sidebar will contain links to the different pages
const Sidebar: FC = () => {
  // Renders a div containing the links
  // It displayed the links in order
  return (
    <SidebarContainer>
      <SidebarHeader />
      <SidebarLinkContainer>
        <SidebarLink text='Dashboard' to='/' />
        <SidebarLink text='Quizzes' to='/quizzes' />
        <SidebarLink text='Create' to='/create' />
        <SidebarLink text='Subjects' to='/subjects' />
      </SidebarLinkContainer>
    </SidebarContainer>
  );
};

export default Sidebar;