/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Sidebar from '../../components/Sidebar';
import SidebarLink from '../../components/Sidebar/SidebarLink';

jest.mock('next/router', () => ({
  useRouter() {
    return ({
      route: '/',
      pathname: '',
      query: '',
      asPath: '',
      push: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
      },
      beforePopState: jest.fn(() => null),
      prefetch: jest.fn(() => null),
    });
  },
}));

describe('Sidebar', () => {
  it('renders sidebar without crashing', () => {
    const useRouter = jest.spyOn(require('next/router'), 'useRouter');

    useRouter.mockImplementation(() => ({
      route: '/',
      pathname: '',
      query: '',
      asPath: '',
      push: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
      },
      beforePopState: jest.fn(() => null),
      prefetch: jest.fn(() => null),
    }));

    render(<Sidebar />);
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Quizzes')).toBeInTheDocument();
    expect(screen.getByText('Subjects')).toBeInTheDocument();
    expect(screen.getByText('Create')).toBeInTheDocument();
  });

  it('link appears a different colour when page is active', () => {
    const useRouter = jest.spyOn(require('next/router'), 'useRouter');

    useRouter.mockImplementation(() => ({
      route: '/quizzes',
      pathname: '/quizzes',
      query: '',
      asPath: '',
      push: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
      },
      beforePopState: jest.fn(() => null),
      prefetch: jest.fn(() => null),
    }));

    render(<SidebarLink to='/quizzes' text='Quizzes' />);
    expect(
      screen.getByText('Quizzes').closest('a')
    )
      .toHaveStyle('color: #A989CF'); 
  });
});