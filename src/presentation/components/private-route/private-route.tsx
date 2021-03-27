import React, { useContext } from 'react';
import { Redirect, Route, RouteProps } from 'react-router';
import { ApiContext } from '../../contexts';

const PrivateRouter: React.FC<RouteProps> = (props: RouteProps) => {
  const { getCurrentAccount } = useContext(ApiContext);
  return getCurrentAccount()?.accessToken
    ? <Route {...props} />
    : <Route {...props} component={() => <Redirect to="/login" />}/>
}

export default PrivateRouter;