import React, { useEffect, useState } from 'react';
import Styles from './survey-list-styles.scss';
import { Footer, Header, Error } from '../../components';
import { SurveyListItem } from './components';
import { LoadSurveyList } from '../../../domain/usecases/load-survey-list';
import { useErrorHandler } from '../../hooks/use-error-handler';

type Props = {
  loadSurveyList: LoadSurveyList
}

const SurveyList: React.FC<Props> = ({ loadSurveyList }: Props) => {
  const handleError = useErrorHandler((error: Error) => {
    setState((oldState) => ({ ...oldState, surveyError: error.message }));
  });
  const [state, setState] = useState({
    surveys: [] as LoadSurveyList.Model[],
    surveyError: '',
    reload: false
  });
  useEffect(() => {
    loadSurveyList.loadAll().then((surveys) => {
      setState((oldState) => ({ ...oldState, surveyList: surveys }));
    }).catch((error) => {
      handleError(error);
    });
  }, [state.reload]);

  const reload = (): void => {
    setState((old) => ({
      surveys: [],
      surveyError: '',
      reload: !old.reload
    }))
  }

  return (
    <div className={Styles.surveyListWrap}>
      <Header />
      <div className={Styles.contentWrap}>
        <h2>Enquetes</h2>
        {!state.surveyError
          ? <SurveyListItem surveys={state.surveys} />
          : <Error error={state.surveyError} reload={reload} />
        }
      </div>
      <Footer />
    </div>
  )
}

export default SurveyList;