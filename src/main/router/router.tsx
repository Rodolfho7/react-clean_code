import React from 'react';
import '../../presentation/styles/global.scss';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { makeLogin } from '../factories/pages/login/login-factory';
import { makeSignUp } from '../factories/pages/signup/signup-factory';
import { SurveyList } from '../../presentation/pages';
import { ApiContext } from '../../presentation/contexts';
import { setCurrentAccountAdapter, getCurrentAccountAdapter } from '../adapters/current-account-adapter';
import { PrivateRoute } from '../../presentation/components';

const Router: React.FC = () => {
  return (
    <ApiContext.Provider
      value={{
        setCurrentAccount: setCurrentAccountAdapter,
        getCurrentAccount: getCurrentAccountAdapter
      }}
    >
      <BrowserRouter>
        <Switch>
          <Route path="/login" exact component={makeLogin} />
          <Route path="/signup" exact component={makeSignUp} />
          <PrivateRoute path="/" exact component={SurveyList} />
        </Switch>
      </BrowserRouter>
    </ApiContext.Provider>
  )
}

export default Router;