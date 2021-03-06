import React from 'react';
import { render, screen } from '@testing-library/react';
import { SurveyItem } from '..';
import { MockSurveyModel } from '../../../../../domain/test/mock-survey-list';
import { IconName } from '../../../../components';

const makeSut = (survey = MockSurveyModel()): void => {
  render(<SurveyItem survey={survey}/>);
};

describe('SurveyItem Component', () => {
  test('Should render with correct values', () => {
    const survey = {
      ...MockSurveyModel(),
      didAnswer: true,
      date: new Date('2020-01-10T00:00:00')
    };
    makeSut(survey);
    expect(screen.getByTestId('icon')).toHaveProperty('src', IconName.thumbUp);
    expect(screen.getByTestId('question')).toHaveTextContent(survey.question);
    expect(screen.getByTestId('day')).toHaveTextContent('10');
    expect(screen.getByTestId('month')).toHaveTextContent('jan');
    expect(screen.getByTestId('year')).toHaveTextContent('2020');
  });

  test('Should render with correct values', () => {
    const survey = {
      ...MockSurveyModel(),
      didAnswer: false,
      date: new Date('2019-05-03T00:00:00')
    };
    makeSut(survey);
    expect(screen.getByTestId('icon')).toHaveProperty('src', IconName.thumbDown);
    expect(screen.getByTestId('question')).toHaveTextContent(survey.question);
    expect(screen.getByTestId('day')).toHaveTextContent('03');
    expect(screen.getByTestId('month')).toHaveTextContent('mai');
    expect(screen.getByTestId('year')).toHaveTextContent('2019');
  });
});