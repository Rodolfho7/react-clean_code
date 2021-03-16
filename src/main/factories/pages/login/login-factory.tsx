import React from 'react';
import { makeLoginValidation } from './login-validation-factory';
import { Login } from '../../../../presentation/pages';
import { makeRemoteAuthentication } from '../../usecases/authentication/remote-authentication-factory';
import { makeLocalUpdateCurrentAccount } from '../../usecases/update-current-account/update-current-account-factory';

export const makeLogin: React.FC = () => {
  const remoteAuthentication = makeRemoteAuthentication();
  const validationComposite = makeLoginValidation();
  const account = makeLocalUpdateCurrentAccount();
  return (
    <Login
      validation={validationComposite}
      authentication={remoteAuthentication}
      updateCurrentAccount={account}
    />
  );
}