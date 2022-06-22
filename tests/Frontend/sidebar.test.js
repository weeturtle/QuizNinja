/* eslint-disable no-undef */
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Sidebar from '../../components/Sidebar';
import SidebarLink from '../../components/Sidebar/SidebarLink';

describe('Sidebar', () => {
  it('renders sidebar without crashing', () => {
    render(<Sidebar />);
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Quizzes')).toBeInTheDocument();
    expect(screen.getByText('Subjects')).toBeInTheDocument();
    expect(screen.getByText('Create')).toBeInTheDocument();
  });

  it('sidebar links redirect to selected page', () => {
    render(<SidebarLink to='/quizzes' text='Quizzes' />);
    expect(
      screen.getByText('Quizzes').closest('a')
    )
      .toHaveAttribute('href', '/quizzes');
  });
});