import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { toast } from 'react-toastify';
import App from '../../App';

describe('Authentication features', () => {
  it('User can register', async () => {
    window.fetch = jest.fn().mockResolvedValue({
      json: () => Promise.resolve({ success: true, message: 'Registered successfully' }),
      ok: true,
    });

    toast.success = jest.fn();

    render(<App />);
    await userEvent.click(screen.getByText('Register'));
    userEvent.type(screen.getByLabelText('Username'), 'test');
    userEvent.type(screen.getByLabelText('Password'), 'test');
    userEvent.type(screen.getByLabelText('Confirm Password'), 'test');
    await userEvent.click(screen.getByText('Submit'));

    expect(toast.success).toHaveBeenCalled();
  });

  it('User can login', async () => {
    window.fetch = jest.fn().mockResolvedValue({
      json: () => Promise.resolve({ success: true, message: 'Logged in successfully', resource: { id: 1 } }),
      ok: true,
      headers: {
        get: (key) => key,
      },
    });

    toast.success = jest.fn();

    render(<App />);
    await userEvent.click(screen.getByText('Register'));
    await userEvent.click(screen.getByText('Sign in'));
    userEvent.type(screen.getByLabelText('Username'), 'test');
    userEvent.type(screen.getByLabelText('Password'), 'test');
    await userEvent.click(screen.getByText('Submit'));

    expect(toast.success).toHaveBeenCalled();
  });
});
