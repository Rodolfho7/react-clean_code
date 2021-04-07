import { AddAccount } from '../usecases/add-account';
import { mockAccountModel } from './mock-account';
import faker from 'faker';

export const mockAddAccountParams = (): AddAccount.Params => {
  const password = faker.internet.password();
  return {
    name: faker.name.findName(),
    email: faker.internet.email(),
    password,
    passwordConfirmation: password
  }
}

export const mockAddAccountModel = (): AddAccount.Model => mockAccountModel();
