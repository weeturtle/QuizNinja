import { FC } from 'react';
import Sidebar from '../Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

// The layout component is used to wrap the entire application.
// It contains the sidebar and the main content.
const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Sidebar />
      <main>{children}</main>
    </>
  );
};

export default Layout;