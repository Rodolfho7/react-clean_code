import { makeLocalStorageAdapter } from "../factories/cache/local-storage-factory-adapter";
import { AccountModel } from "../../domain/models/accountModel";

export const setCurrentAccountAdapter = (account: AccountModel): void => {
  makeLocalStorageAdapter().set('account', account);
}

export const getCurrentAccountAdapter = (): AccountModel => {
  return makeLocalStorageAdapter().get('account');
}
