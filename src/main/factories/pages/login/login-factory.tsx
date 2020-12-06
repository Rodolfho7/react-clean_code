import React from 'react';
import { makeLoginValidation } from './login-validation-factory';
import { Login } from '../../../../presentation/pages';
import { makeRemoteAuthentication } from '../../usecases/authentication/remote-authentication-factory';
import { makeLocalSaveAccessToken } from '../../usecases/save-access-token/local-save-access-token-factory';

export const makeLogin: React.FC = () => {
  const remoteAuthentication = makeRemoteAuthentication();
  const validationComposite = makeLoginValidation();
  const saveAccessToken = makeLocalSaveAccessToken();
  return (
    <Login
      validation={validationComposite}
      authentication={remoteAuthentication}
      saveAccessToken={saveAccessToken}
    />
  );
}