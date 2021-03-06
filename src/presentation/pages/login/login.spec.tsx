import React from 'react';
import faker from 'faker';
import { Login } from '../';
import { fireEvent, render, waitFor, screen } from '@testing-library/react';
import { ValidationStub, AuthenticationSpy, Helper } from '../../test';
import { InvalidCredentialsError } from '../../../domain/Error/invalid-credentials-error';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { ApiContext } from '../../contexts';
import { Authentication } from '../../../domain/usecases/authentication';

type SutTypes = {
  authenticationSpy: AuthenticationSpy,
  setCurrentAccountMock: (account: Authentication.Model) => void
}

type SutParams = {
  validationError: string
}

const history = createMemoryHistory({ initialEntries: ['/login'] });

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub();
  const authenticationSpy = new AuthenticationSpy();
  validationStub.errorMessage = params?.validationError;
  const setCurrentAccountMock = jest.fn();
  render(
    <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock }}>
      <Router history={history}>
        <Login
          validation={validationStub}
          authentication={authenticationSpy}
        />
      </Router>
    </ApiContext.Provider>
  );
  return { authenticationSpy, setCurrentAccountMock };
}

const simulateValidSubmit = async (email = faker.internet.email(), password = faker.internet.password()): Promise<void> => {
  Helper.populateField('email', email);
  Helper.populateField('password', password);
  const form = screen.getByTestId('form');
  fireEvent.submit(form);
  await waitFor(() => form);
}

describe('Login Component', () => {

  test('Should start with initial state', () => {
    const validationError = faker.random.words();
    makeSut({ validationError });
    expect(screen.getByTestId('submit')).toBeDisabled();
    expect(screen.getByTestId('error-wrap').children).toHaveLength(0);
    Helper.testStatusForField('email', validationError);
    Helper.testStatusForField('password', validationError);
  });

  test('Should show email error if validation fails', () => {
    const validationError = faker.random.words();
    makeSut({ validationError });
    Helper.populateField('email');
    Helper.testStatusForField('email', validationError);
  });

  test('Should show password error if validation fails', () => {
    const validationError = faker.random.words();
    makeSut({ validationError });
    Helper.populateField('password');
    Helper.testStatusForField('password', validationError);
  });

  test('Should show valid email state if validation succeed', () => {
    makeSut();
    Helper.populateField('email');
    Helper.testStatusForField('email');
  });

  test('Should show valid password state if validation succeed', () => {
    makeSut();
    Helper.populateField('password');
    Helper.testStatusForField('password');
  });

  test('Should enable submit button if form is valid', () => {
    makeSut();
    Helper.populateField('email');
    Helper.populateField('password');
    expect(screen.getByTestId('submit')).toBeEnabled();
  });

  test('Should show spinner on submit', async () => {
    makeSut();
    await simulateValidSubmit();
    expect(screen.queryByTestId('spinner')).toBeInTheDocument();
  });

  test('Should call Authentication with correct values', async () => {
    const { authenticationSpy } = makeSut();
    const email = faker.internet.email();
    const password = faker.internet.password()
    await simulateValidSubmit(email, password);
    expect(authenticationSpy.params).toEqual({ email, password });
  });

  test('Should call Authentication only once', async () => {
    const { authenticationSpy } = makeSut();
    await simulateValidSubmit();
    await simulateValidSubmit();
    expect(authenticationSpy.callsCount).toBe(1);
  });

  test('Should not call Authentication if form is invalid', async () => {
    const validationError = faker.random.words();
    const { authenticationSpy } = makeSut({ validationError });
    await simulateValidSubmit();
    expect(authenticationSpy.callsCount).toBe(0);
  });

  test('Should present error if Authentication fails', async () => {
    const { authenticationSpy } = makeSut();
    const error = new InvalidCredentialsError();
    jest.spyOn(authenticationSpy, 'auth').mockReturnValueOnce(Promise.reject(error));
    await simulateValidSubmit();
    expect(screen.getByTestId('main-error')).toHaveTextContent(error.message);
    expect(screen.getByTestId('error-wrap').children).toHaveLength(1);
  });

  test('Should call SaveAccessToken on sucess', async () => {
    const { authenticationSpy, setCurrentAccountMock } = makeSut();
    await simulateValidSubmit();
    expect(setCurrentAccountMock).toHaveBeenCalledWith(authenticationSpy.account);
    expect(history.length).toBe(1);
    expect(history.location.pathname).toBe('/');
  });

  test('Should go to signUp page', async () => {
    makeSut();
    const registerLink = screen.getByTestId('signup-link');
    fireEvent.click(registerLink);
    expect(history.length).toBe(2);
    expect(history.location.pathname).toBe('/signup');
  });
})