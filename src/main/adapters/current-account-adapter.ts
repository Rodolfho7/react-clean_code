import { makeLocalStorageAdapter } from "../factories/cache/local-storage-factory-adapter";
import { UnexpectedError } from "../../domain/Error/unexpected-error";
import { AccountModel } from "../../domain/models/accountModel";

export const setCurrentAccountAdapter = (account: AccountModel): void => {
  if (!account?.accessToken) {
    throw new UnexpectedError();
  }
  makeLocalStorageAdapter().set('account', account);
}
