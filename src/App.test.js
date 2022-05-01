import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

test('inputs should be initially empty', () => {
  render(<App />);
  const emailInputElement = screen.getByRole('textbox');
  const passwordInputElement = screen.getByLabelText('Password'); 
  const confirmPasswordInputElement = screen.getByLabelText(/confirm password/i); // use of regex for the psw label (i for case insensitive)
  expect(emailInputElement.value).toBe('');
  expect(passwordInputElement.value).toBe('');
  expect(confirmPasswordInputElement.value).toBe('');
});

test('should be able to type an email', () => {
  render(<App />);
  const emailInputElement = screen.getByRole('textbox', { name: /email/i });
  // trying to simulate browser interaction into our app by using library/user-event:
  userEvent.type(emailInputElement, 'valentina@gmail.com');
  expect(emailInputElement.value).toBe('valentina@gmail.com');
});
