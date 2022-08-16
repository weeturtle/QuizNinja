/* eslint-disable no-undef */
import Home from '../../pages/index';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

describe('Dashboard', () => {
  it('renders without crashing', () => {
    render(<Home />);
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });
});
