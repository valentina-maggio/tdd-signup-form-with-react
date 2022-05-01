import { getDefaultNormalizer, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

beforeEach(() => {
  console.log('this will run before each test');
  render(<App />);
});

const typeIntoForm = ({ email, password, confirmPassword }) => {
  const emailInputElement = screen.getByRole('textbox', { name: /email/i });
  const passwordInputElement = screen.getByLabelText('Password');
  const confirmPasswordInputElement = screen.getByLabelText(/confirm password/i);
  if (email) {
    userEvent.type(emailInputElement, email);
  } 
  if (password) {
    userEvent.type(passwordInputElement, password);
  } 
  if (confirmPassword) {
    userEvent.type(confirmPasswordInputElement, confirmPassword);
  }

  return {
    emailInputElement,
    passwordInputElement,
    confirmPasswordInputElement
  }
}

test('inputs should be initially empty', () => {
  const emailInputElement = screen.getByRole('textbox');
  const passwordInputElement = screen.getByLabelText('Password'); 
  const confirmPasswordInputElement = screen.getByLabelText(/confirm password/i); 
  expect(emailInputElement.value).toBe('');
  expect(passwordInputElement.value).toBe('');
  expect(confirmPasswordInputElement.value).toBe('');
});

test('should be able to type an email', () => {
  const {emailInputElement} = typeIntoForm({ email: 'valentina@gmail.com' });
  expect(emailInputElement.value).toBe('valentina@gmail.com');
});

test('should be able to type a password', () => {
  const {passwordInputElement} = typeIntoForm({ password: 'mypassword' });
  expect(passwordInputElement.value).toBe('mypassword');
});

test('should be able to type a confirm password', () => {
  const {confirmPasswordInputElement} = typeIntoForm({ confirmPassword: 'mypassword' });
  expect(confirmPasswordInputElement.value).toBe('mypassword');
});

test('should show email error message on invalid email', () => {
  const emailErrorElement = screen.queryByText(/the email you input is invalid/i);
  const submitBtnElement = screen.getByRole('button', { name: /submit/i });

  expect(emailErrorElement).not.toBeInTheDocument();

  typeIntoForm({ email: 'valentinagmail.com' });
  userEvent.click(submitBtnElement);

  const emailErrorElementAgain = screen.queryByText(/the email you input is invalid/i);

  expect(emailErrorElementAgain).toBeInTheDocument()
});

test('should show password error if password is less than 5 characters', () => {
  const passwordErrorElement = screen.queryByText(/the password you entered should contain 5 or more characters/i);
  const submitBtnElement = screen.getByRole('button', { name: /submit/i });

  typeIntoForm({ email: 'valentina@gmail.com' });

  expect(passwordErrorElement).not.toBeInTheDocument();

  typeIntoForm({ password: 'psw' });

  userEvent.click(submitBtnElement);

  const passwordErrorElementAgain = screen.queryByText(/the password you entered should contain 5 or more characters/i);

  expect(passwordErrorElementAgain).toBeInTheDocument()
});

test('should show confirm password error message if passwords don\'t match', () => {
  const confirmPasswordErrorElement = screen.queryByText(/the passwords don't match. try again/i);
  const submitBtnElement = screen.getByRole('button', { name: /submit/i });

  typeIntoForm({ 
    email: 'valentina@gmail.com',  
    password: 'mypassword' });

  expect(confirmPasswordErrorElement).not.toBeInTheDocument();

  typeIntoForm({  
    confirmPassword: 'wrongpsw' });

  userEvent.click(submitBtnElement);

  const confirmPasswordErrorElementAgain = screen.queryByText(/the passwords don't match. try again/i);

  expect(confirmPasswordErrorElementAgain).toBeInTheDocument()
});

test('should show no error message if every input is valid', () => {
  const submitBtnElement = screen.getByRole('button', { name: /submit/i });

  typeIntoForm({ 
    email: 'valentina@gmail.com',  
    password: 'mypassword',
    confirmPassword: 'mypassword' });

  userEvent.click(submitBtnElement);

  const emailErrorElement = screen.queryByText(/the email you input is invalid/i);
  const passwordErrorElement = screen.queryByText(/the password you entered should contain 5 or more characters/i);
  const confirmPasswordErrorElement = screen.queryByText(/the passwords don't match. try again/i);

  expect(emailErrorElement).not.toBeInTheDocument()
  expect(passwordErrorElement).not.toBeInTheDocument()
  expect(confirmPasswordErrorElement).not.toBeInTheDocument()
});