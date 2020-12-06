import { AuthenticationParams } from "../usecases/authentication";
import { AccountModel } from "../models/accountModel";
import faker from 'faker';

export const mockAuthentication = (): AuthenticationParams => {
  return {
    email: faker.internet.email(),
    password: faker.internet.password()
  }
}

export const mockAccountModel = (): AccountModel => {
  return {
    accessToken: faker.random.uuid()
  }
}