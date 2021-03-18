import React from 'react';
import { makeLoginValidation } from './login-validation-factory';
import { Login } from '../../../../presentation/pages';
import { makeRemoteAuthentication } from '../../usecases/authentication/remote-authentication-factory';

export const makeLogin: React.FC = () => {
  const remoteAuthentication = makeRemoteAuthentication();
  const validationComposite = makeLoginValidation();
  return (
    <Login
      validation={validationComposite}
      authentication={remoteAuthentication}
    />
  );
}