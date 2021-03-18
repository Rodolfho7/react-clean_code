import React from 'react';
import { SignUp } from '../../../../presentation/pages';
import { makeSignUpValidation } from './signup-validation-factory';
import { makeRemoteAddAccount } from '../../usecases/add-account/remote-add-account-factory';

export const makeSignUp: React.FC = () => {
  const validation = makeSignUpValidation();
  const addAccount = makeRemoteAddAccount();
  return (
    <SignUp
      validation={validation}
      addAccount={addAccount}
    />
  )
} 