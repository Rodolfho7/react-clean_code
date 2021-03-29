import React, { useContext } from 'react';
import Styles from './list-styles.scss';
import { SurveyContext, SurveyItem, SurveyItemEmpty } from '../';
import { SurveyModel } from '../../../../../domain/models/survey-model';

const List: React.FC = () => {
  const { state } = useContext(SurveyContext);

  return (
    <ul className={Styles.listWrap} data-testid="survey-list">
      {state.surveyList.length
        ? state.surveyList.map((survey: SurveyModel) => <SurveyItem key={survey.id} survey={survey} />)
        : <SurveyItemEmpty />
      }
    </ul>
  );
};

export default List;