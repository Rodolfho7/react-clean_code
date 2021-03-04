import { SurveyModel } from "../models/survey-model";
import faker from 'faker';

export const MockSurveyListModel = (): SurveyModel[] => ([
  {
    id: faker.random.uuid(),
    question: faker.random.words(),
    answers: [
      {
        answer: faker.random.words(4),
        image: faker.random.word()
      },
      {
        answer: faker.random.words(4),
        image: faker.random.word()
      }
    ],
    date: faker.date.recent(),
    didAnswer: faker.random.boolean()
  }
])