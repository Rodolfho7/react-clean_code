import React from 'react';
import { makeLocalSaveAccessToken } from '../../usecases/save-access-token/local-save-access-token-factory';
import { SignUp } from '../../../../presentation/pages';
import { makeSignUpValidation } from './signup-validation-factory';
import { makeRemoteAddAccount } from '../../usecases/add-account/remote-add-account-factory';

export const makeSignUp: React.FC = () => {
  const validation = makeSignUpValidation();
  const addAccount = makeRemoteAddAccount();
  const saveAccessToken = makeLocalSaveAccessToken();
  return (
    <SignUp
      validation={validation}
      addAccount={addAccount}
      saveAccessToken={saveAccessToken}
    />
  )
} 