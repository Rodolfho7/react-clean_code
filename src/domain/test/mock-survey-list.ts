import { LoadSurveyList } from '../usecases/load-survey-list';
import faker from 'faker';

export const MockSurveyModel = (): LoadSurveyList.Model => ({
  id: faker.random.uuid(),
  question: faker.random.words(),
  date: faker.date.recent(),
  didAnswer: faker.random.boolean()
});

export const MockSurveyListModel = (): LoadSurveyList.Model[] => ([
  MockSurveyModel(),
  MockSurveyModel(),
  MockSurveyModel()
]);
