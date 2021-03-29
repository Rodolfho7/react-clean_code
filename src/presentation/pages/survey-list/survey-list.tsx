import React, { useEffect, useState } from 'react';
import Styles from './survey-list-styles.scss';
import { Footer, Header } from '../../components';
import { SurveyContext, SurveyListItem, SurveyError } from './components';
import { LoadSurveyList } from '../../../domain/usecases/load-survey-list';
import { SurveyModel } from '../../../domain/models/survey-model';

type Props = {
  loadSurveyList: LoadSurveyList
}

const SurveyList: React.FC<Props> = ({ loadSurveyList }: Props) => {
  const [state, setState] = useState({
    surveyList: [] as SurveyModel[],
    surveyError: '',
    reload: false
  });
  useEffect(() => {
    loadSurveyList.loadAll().then((surveys) => {
      setState({ ...state, surveyList: surveys });
    }).catch((err) => {
      setState({ ...state, surveyError: err.message });
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