import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import SurveyResult from './survey-result';
import { ApiContext } from '../../contexts';
import { mockAccountModel } from '../../../domain/test/mock-account';
import { LoadSurveyResultSpy, mockSurveyResultModel } from '../../../domain/test/mock-survey-result';
import { UnexpectedError } from '../../../domain/Error/unexpected-error';
import { createMemoryHistory, MemoryHistory } from 'history';
import { AccountModel } from '../../../domain/models/accountModel';
import { Router } from 'react-router-dom';
import { AccessDeniedError } from '../../../domain/Error/access-denied-error';

type SutTypes = {
  loadSurveyResultSpy: LoadSurveyResultSpy;
  history: MemoryHistory;
  setCurrentAccountMock: (account: AccountModel) => void;
}

const makeSut = (loadSurveyResultSpy = new LoadSurveyResultSpy()): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/'] });
  const setCurrentAccountMock = jest.fn();
  render(
    <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock, getCurrentAccount: () => mockAccountModel() }}>
      <Router history={history}>
        <SurveyResult loadSurveyResult={loadSurveyResultSpy} />
      </Router>
    </ApiContext.Provider>
  );
  return {
    loadSurveyResultSpy,
    history,
    setCurrentAccountMock
  }
}

describe('SurveyResult Component', () => {
  test('Should present correct initial state', async () => {
    makeSut();
    const surveyResult = screen.getByTestId('survey-result');
    expect(surveyResult.childElementCount).toBe(0);
    expect(screen.queryByTestId('error')).not.toBeInTheDocument();
    expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
    await waitFor(() => surveyResult);
  });

  test('Should call loadSurveyResult', async () => {
    const { loadSurveyResultSpy } = makeSut();
    await waitFor(() => screen.getByTestId('survey-result'));
    expect(loadSurveyResultSpy.callsCount).toBe(1);
  });

  test('Should present SurveyResult data on success', async () => {
    const loadSurveyResultSpy = new LoadSurveyResultSpy();
    const surveyResult = {
      ...mockSurveyResultModel(),
      date: new Date('2020-01-10T00:00:00')
    };
    loadSurveyResultSpy.surveyResult = surveyResult;
    makeSut(loadSurveyResultSpy);
    await waitFor(() => screen.getByTestId('survey-result'));
    expect(screen.getByTestId('day')).toHaveTextContent('10');
    expect(screen.getByTestId('month')).toHaveTextContent('jan');
    expect(screen.getByTestId('year')).toHaveTextContent('2020');
    expect(screen.getByTestId('question')).toHaveTextContent(surveyResult.question);
    expect(screen.getByTestId('answers').childElementCount).toBe(2);
  });

  test('Should render error on UnexpectedError', async () => {
    const loadSurveyResultSpy = new LoadSurveyResultSpy();
    const error = new UnexpectedError();
    jest.spyOn(loadSurveyResultSpy, 'load').mockRejectedValueOnce(error);
    makeSut(loadSurveyResultSpy);
    await waitFor(() => screen.getByTestId('survey-result'));
    expect(screen.queryByTestId('question')).not.toBeInTheDocument();
    expect(screen.getByTestId('error')).toHaveTextContent(error.message);
    expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
  });

  test('Should logout on AccessDeniedError', async () => {
    const loadSurveyResultSpy = new LoadSurveyResultSpy();
    jest.spyOn(loadSurveyResultSpy, 'load').mockRejectedValueOnce(new AccessDeniedError());
    const { setCurrentAccountMock, history } = makeSut(loadSurveyResultSpy);
    await waitFor(() => screen.getByTestId('survey-result'));
    expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined);
    expect(history.location.pathname).toBe('/login');
  });

  test('Should call LoadSurveyResult on reload', async () => {
    const loadSurveyResultSpy = new LoadSurveyResultSpy();
    jest.spyOn(loadSurveyResultSpy, 'load').mockRejectedValueOnce(new UnexpectedError());
    makeSut(loadSurveyResultSpy);
    await waitFor(() => screen.getByTestId('survey-result'));
    fireEvent.click(screen.getByTestId('reload'));
    expect(loadSurveyResultSpy.callsCount).toBe(1);
    await waitFor(() => screen.getByTestId('survey-result'));
  });
});