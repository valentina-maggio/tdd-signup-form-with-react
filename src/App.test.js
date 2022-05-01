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

test('should be able to type a password', () => {
  render(<App />);
  const passwordInputElement = screen.getByLabelText('Password');
  userEvent.type(passwordInputElement, 'mypassword');
  expect(passwordInputElement.value).toBe('mypassword');
});

test('should be able to type a confirm password', () => {
  render(<App />);
  const confirmPasswordInputElement = screen.getByLabelText(/confirm password/i);
  userEvent.type(confirmPasswordInputElement, 'mypassword');
  expect(confirmPasswordInputElement.value).toBe('mypassword');
});

test('should show email error message on invalid email', () => {
  render(<App />);
  const emailErrorElement = screen.queryByText(/the email you input is invalid/i);
  const emailInputElement = screen.getByRole('textbox', { name: /email/i });
  const submitBtnElement = screen.getByRole('button', { name: /submit/i });

  expect(emailErrorElement).not.toBeInTheDocument();

  userEvent.type(emailInputElement, 'valentinagmail.com');
  userEvent.click(submitBtnElement);

  const emailErrorElementAgain = screen.queryByText(/the email you input is invalid/i);

  expect(emailErrorElementAgain).toBeInTheDocument()
});

test('should show password error if password is less than 5 characters', () => {
  render(<App />);
  const passwordErrorElement = screen.queryByText(/the password you entered should contain 5 or more characters/i);
  const emailInputElement = screen.getByRole('textbox', { name: /email/i });
  const passwordInputElement = screen.getByLabelText('Password');
  const submitBtnElement = screen.getByRole('button', { name: /submit/i });

  userEvent.type(emailInputElement, 'valentina@gmail.com');
  expect(passwordErrorElement).not.toBeInTheDocument();
  userEvent.type(passwordInputElement, 'psw');
  userEvent.click(submitBtnElement);

  const passwordErrorElementAgain = screen.queryByText(/the password you entered should contain 5 or more characters/i);

  expect(passwordErrorElementAgain).toBeInTheDocument()
});

test('should show confirm password error message if passwords don\'t match', () => {
  render(<App />);
  const confirmPasswordErrorElement = screen.queryByText(/the passwords don't match. try again/i);
  const emailInputElement = screen.getByRole('textbox', { name: /email/i });
  const passwordInputElement = screen.getByLabelText('Password');
  const confirmPasswordInputElement = screen.getByLabelText(/confirm password/i);
  const submitBtnElement = screen.getByRole('button', { name: /submit/i });


  userEvent.type(emailInputElement, 'valentina@gmail.com');
  userEvent.type(passwordInputElement, 'mypassword');

  expect(confirmPasswordErrorElement).not.toBeInTheDocument();

  userEvent.type(confirmPasswordInputElement, 'wrongpsw');
  userEvent.click(submitBtnElement);

  const confirmPasswordErrorElementAgain = screen.queryByText(/the passwords don't match. try again/i);

  expect(confirmPasswordErrorElementAgain).toBeInTheDocument()
});