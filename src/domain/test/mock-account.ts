import { AccountModel } from "../models/accountModel";
import faker from 'faker';

export const mockAccountModel = (): AccountModel => {
  return {
    accessToken: faker.random.uuid(),
    name: faker.random.word()
  }
}