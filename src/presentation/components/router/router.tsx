import React from 'react';
import '../../styles/global.scss';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { SurveyList } from '../../pages';

type Props = {
  makeLogin: React.FC,
  makeSignup: React.FC
}

const Router: React.FC<Props> = ({ makeLogin, makeSignup }: Props) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" exact component={makeLogin} />
        <Route path="/signup" exact component={makeSignup} />
        <Route path="/" exact component={SurveyList} />
      </Switch>
    </BrowserRouter>
  )
}

export default Router;