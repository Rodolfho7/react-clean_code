import { SurveyList } from '../../../../presentation/pages';
import React from 'react';
import { makeRemoteLoadSurveyList } from '../../usecases/load-survey-list/load-survey-list-factory';

export const makeSurveyList: React.FC = () => {
  return (
    <SurveyList loadSurveyList={makeRemoteLoadSurveyList()} />
  )
} 