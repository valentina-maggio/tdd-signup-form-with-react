import { render, screen } from '@testing-library/react';
import App from './App';

test('inputs should be initially empty', () => {
  render(<App />);
  const emailInputElement = screen.getByRole('textbox');
  const passwordInputElement = screen.getByLabelText(/password/i); // use of regex for the psw label
  expect(emailInputElement.value).toBe('');
  expect(passwordInputElement.value).toBe('');
});
