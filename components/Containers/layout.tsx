import { FC } from 'react';
import Sidebar from '../Sidebar';
import LayoutContainer from './LayoutContainer';
import MainContainer from './MainContainer';
import PageContainer from './PageContainer';

// The layout is used to contain the sidebar and the main container
// Parameters: children - the main content of the page
interface LayoutProps {
  children: React.ReactNode;
}

// The layout component is used to wrap the entire application.
// It contains the sidebar and the main content.
const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <LayoutContainer>
      <Sidebar />
      <MainContainer>
        <PageContainer>
          {children}
        </PageContainer>
      </MainContainer>
    </LayoutContainer>
  );
};

export default Layout;