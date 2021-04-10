import { RemoteLoadSurveyList } from '../usecases/load-survey-list/remote-load-survey-list';
import faker from 'faker';

export const MockRemoteSurveyModel = (): RemoteLoadSurveyList.Model => ({
  id: faker.random.uuid(),
  question: faker.random.words(),
  date: faker.date.recent().toISOString(),
  didAnswer: faker.random.boolean()
});

export const MockRemoteSurveyListModel = (): RemoteLoadSurveyList.Model[] => ([
  MockRemoteSurveyModel(),
  MockRemoteSurveyModel(),
  MockRemoteSurveyModel()
]);
