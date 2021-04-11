import React, { useEffect, useState } from 'react';
import Styles from './survey-list-styles.scss';
import { Footer, Header } from '../../components';
import { SurveyContext, SurveyListItem, SurveyError } from './components';
import { LoadSurveyList } from '../../../domain/usecases/load-survey-list';
import { useErrorHandler } from '../../hooks/use-error-handler';

type Props = {
  loadSurveyList: LoadSurveyList
}

const SurveyList: React.FC<Props> = ({ loadSurveyList }: Props) => {
  const handleError = useErrorHandler((error: Error) => {
    setState({ ...state, surveyError: error.message });
  });
  const [state, setState] = useState({
    surveyList: [] as LoadSurveyList.Model[],
    surveyError: '',
    reload: false
  });
  useEffect(() => {
    loadSurveyList.loadAll().then((surveys) => {
      setState({ ...state, surveyList: surveys });
    }).catch((error) => {
      handleError(error);
    });
  }, [state.reload]);

  return (
    <div className={Styles.surveyListWrap}>
      <Header />
      <div className={Styles.contentWrap}>
        <h2>Enquetes</h2>
        <SurveyContext.Provider value={{ state, setState }} >
          {!state.surveyError
            ? <SurveyListItem />
            : <SurveyError />
          }
        </SurveyContext.Provider>
      </div>
      <Footer />
    </div>
  )
}

export default SurveyList;