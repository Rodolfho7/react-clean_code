import React, { useContext } from 'react';
import Styles from './error-styles.scss';
import { SurveyContext } from '../';

const Error: React.FC = () => {
  const { state, setState } = useContext(SurveyContext);
  const reload = (): void => {
    setState({ surveyList: [], error: '', reload: !state.reload });
  }
  return (
    <div className={Styles.errorWrap}>
      <span data-testid="error">{state.surveyError}</span>
      <button onClick={reload} data-testid="reload">tentar novamente</button>
    </div>
  );
};

export default Error;