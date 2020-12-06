import { SaveAccessToken } from "../../../../domain/usecases/save-access-token";
import { LocalSaveAccessToken } from "../../../../data/usecases/save-access-token/local-save-access-token";
import { makeLocalStorageAdapter } from "../../cache/local-storage-factory-adapter";

export const makeLocalSaveAccessToken = (): SaveAccessToken => {
  const setStorage = makeLocalStorageAdapter();
  return new LocalSaveAccessToken(setStorage);
}