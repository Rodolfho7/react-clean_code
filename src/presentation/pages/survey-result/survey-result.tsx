import React, { useEffect, useState } from 'react';
import Styles from './survey-result-styles.scss';
import { Calendar, Footer, Header, Loading, Error } from '../../components';
import FlipMove from 'react-flip-move';
import { LoadSurveyResult } from '../../../domain/usecases/load-survey-result';
import { useErrorHandler } from '../../hooks/use-error-handler';

type Props = {
  loadSurveyResult: LoadSurveyResult
}

const SurveyResult: React.FC<Props> = ({ loadSurveyResult }: Props) => {

  const handleError = useErrorHandler((error: Error) => {
    setState((old) => ({ ...old, surveyResult: null, error: error.message }));
  });

  const [state, setState] = useState({
    isLoading: false,
    error: '',
    surveyResult: null as LoadSurveyResult.Model,
    reload: false
  })

  const reload = (): void => {
    setState((old) => ({ isLoading: false, surveyResult: null, error: '', reload: !old.reload }))
  }

  useEffect(() => {
    loadSurveyResult.load()
      .then((surveyResult) => setState((old) => ({ ...old, surveyResult })))
      .catch((error) => handleError(error));
  }, [state.reload])

  return (
    <div className={Styles.surveyResultWrap}>
      <Header />
      <div data-testid="survey-result" className={Styles.contentWrap}>
        {state.surveyResult &&
          <>
            <hgroup>
            <Calendar date={state.surveyResult.date} className={Styles.calendarWrap} />
            <h2 data-testid="question">{state.surveyResult.question}</h2>
            </hgroup>
            <FlipMove data-testid="answers" className={Styles.answersList}>
              {state.surveyResult.answers.map((answer) => 
                <li key={answer.answer} className={answer.isCurrentAccountAnswer ? Styles.active : ''}>
                  {answer.image && <img src={answer.image} />}
                  <span className={Styles.answer}>{answer.answer}</span>
                  <span className={Styles.percent}>{answer.percent}%</span>
                </li>
              )}
            </FlipMove>
            <button>Voltar</button>
          </>
        }
        { state.error && <Error error={state.error} reload={reload} /> }
        { state.isLoading && <Loading /> }
      </div>
      <Footer />
    </div>
  );
}

export default SurveyResult;
