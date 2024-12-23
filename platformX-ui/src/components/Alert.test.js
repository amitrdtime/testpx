import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CustomAlert from './alert';

jest.mock('@mui/material/Snackbar', () => ({
  __esModule: true,
  default: ({ children, open, onClose }) => (
    <div>
      {open && (
        <div data-testid="snackbar" onClick={onClose}>
          {children}
        </div>
      )}
    </div>
  ),
}));

describe('CustomAlert Component', () => {
  test('renders the alert with the correct severity and content', () => {
    render(<CustomAlert severity="success" content="Test Message"/>);

    const alert = screen.getByRole('alert');
    expect(alert).toBeInTheDocument();
    expect(alert).toHaveTextContent('Test Message');
  });


  test('closes the alert when the close button is clicked', () => {
    render(<CustomAlert severity="error" content="Close Test" />);

    const snackbar = screen.getByTestId('snackbar');
    expect(snackbar).toBeInTheDocument();

    fireEvent.click(snackbar);

    expect(screen.queryByTestId('snackbar')).not.toBeInTheDocument();
  });
});
