import React from 'react';
import { makeLocalUpdateCurrentAccount } from '../../usecases/update-current-account/update-current-account-factory';
import { SignUp } from '../../../../presentation/pages';
import { makeSignUpValidation } from './signup-validation-factory';
import { makeRemoteAddAccount } from '../../usecases/add-account/remote-add-account-factory';

export const makeSignUp: React.FC = () => {
  const validation = makeSignUpValidation();
  const addAccount = makeRemoteAddAccount();
  const saveAccessToken = makeLocalUpdateCurrentAccount();
  return (
    <SignUp
      validation={validation}
      addAccount={addAccount}
      updateCurrentAccount={saveAccessToken}
    />
  )
} 