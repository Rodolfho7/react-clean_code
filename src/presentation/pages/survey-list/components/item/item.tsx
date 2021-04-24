import { Calendar, Icon, IconName } from '../../../../components';
import React from 'react';
import Styles from './item-styles.scss';
import { LoadSurveyList } from '../../../../../domain/usecases/load-survey-list';

type Props = {
  survey: LoadSurveyList.Model
};

const SurveyItem: React.FC<Props> = ({ survey }: Props) => {
  const iconName = survey.didAnswer ? IconName.thumbUp : IconName.thumbDown;
  return (
    <li className={Styles.surveyItemWrap}>
      <div className={Styles.surveyContent}>
        <Icon iconName={iconName} className={Styles.iconWrap} />
        <Calendar date={survey.date} className={Styles.calendarWrap} />
        <p data-testid='question'>{survey.question}</p>
      </div>
      <footer>Ver resultado</footer>
    </li>
  );
}

export default SurveyItem;
