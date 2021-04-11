import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { SurveyList } from '../';
import { LoadSurveyList } from '../../../domain/usecases/load-survey-list';
import { MockSurveyListModel } from '../../../domain/test/mock-survey-list';
import { UnexpectedError } from '../../../domain/Error/unexpected-error';
import { createMemoryHistory, MemoryHistory } from 'history';
import { Router } from 'react-router';
import { ApiContext } from '../../contexts';
import { mockAccountModel } from '../../../domain/test/mock-account';
import { AccessDeniedError } from '../../../domain/Error/access-denied-error';
import { AccountModel } from '../../../domain/models/accountModel';

class LoadSurveyListSpy implements LoadSurveyList {
  callsCount = 0;
  surveys = MockSurveyListModel();

  async loadAll(): Promise<LoadSurveyList.Model[]> {
    this.callsCount++;
    return this.surveys;
  }
}

type SutTypes = {
  loadSurveyListSpy: LoadSurveyListSpy,
  history: MemoryHistory;
  setCurrentAccountMock: (account: AccountModel) => void;
}

const makeSut = (loadSurveyListSpy = new LoadSurveyListSpy()): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/'] });
  const setCurrentAccountMock = jest.fn();
  render(
    <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock, getCurrentAccount: () => mockAccountModel() }}>
      <Router history={history}>
        <SurveyList loadSurveyList={loadSurveyListSpy} />
      </Router>
    </ApiContext.Provider>
  );
  return { loadSurveyListSpy, history, setCurrentAccountMock };
};

describe('SurveyList component', () => {
  test('Should present 4 empty items on start', async () => {
    makeSut();
    const surveyList = screen.getByTestId('survey-list');
    expect(surveyList.querySelectorAll('li:empty')).toHaveLength(4);
    await waitFor(() => surveyList);
  });

  test('Should call LoadSurveyList', async () => {
    const { loadSurveyListSpy } = makeSut();
    expect(loadSurveyListSpy.callsCount).toBe(1);
    await waitFor(() => screen.getByRole('heading'));
  });

  test('Should render SurveyItems on success', async () => {
    makeSut();
    const surveyList = screen.getByTestId('survey-list');
    await waitFor(() => expect(surveyList.querySelectorAll('li.surveyItemWrap').length).toBe(3));
  });

  test('Should render error on UnexpectedError', async () => {
    const error = new UnexpectedError();
    const loadSurveyListSpy = new LoadSurveyListSpy();
    jest.spyOn(loadSurveyListSpy, 'loadAll').mockRejectedValueOnce(error);
    makeSut(loadSurveyListSpy);
    await waitFor(() => { screen.getByRole('heading') });
    expect(screen.queryByTestId('survey-list')).not.toBeInTheDocument();
    expect(screen.queryByTestId('error')).toHaveTextContent(error.message);
  });

  test('Should logout on AccessDeniedError', async () => {
    const loadSurveyListSpy = new LoadSurveyListSpy();
    jest.spyOn(loadSurveyListSpy, 'loadAll').mockRejectedValueOnce(new AccessDeniedError());
    const { history, setCurrentAccountMock } = makeSut(loadSurveyListSpy);
    await waitFor(() => { screen.getByRole('heading') });
    expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined);
    expect(history.location.pathname).toBe('/login');
  });

  test('Should call LoadSurveyList on reload', async () => {
    const loadSurveyListSpy = new LoadSurveyListSpy();
    jest.spyOn(loadSurveyListSpy, 'loadAll').mockRejectedValueOnce(new UnexpectedError());
    makeSut(loadSurveyListSpy);
    await waitFor(() => screen.getByRole('heading'));
    fireEvent.click(screen.getByTestId('reload'));
    expect(loadSurveyListSpy.callsCount).toBe(1);
    await waitFor(() => screen.getByRole('heading'));
  });
});
