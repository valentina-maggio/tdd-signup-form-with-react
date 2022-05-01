import { render, screen } from '@testing-library/react';
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
