import { UpdateCurrentAccount } from "../../../../domain/usecases/update-current-account";
import { LocalUpdateCurrentAccount } from "../../../../data/usecases/update-current-account/local-update-current-account";
import { makeLocalStorageAdapter } from "../../cache/local-storage-factory-adapter";

export const makeLocalUpdateCurrentAccount = (): UpdateCurrentAccount => {
  const setStorage = makeLocalStorageAdapter();
  return new LocalUpdateCurrentAccount(setStorage);
}