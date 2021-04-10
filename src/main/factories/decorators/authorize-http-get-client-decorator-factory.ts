import { AuthorizeHttpGetClientDecorator } from "../../decorators/authorize-http-get-client-decorator/authorize-http-get-client-decorator";
import { HttpGetClient } from "../../../data/protocols/http/http-get-client";
import { makeLocalStorageAdapter } from "../cache/local-storage-factory-adapter";
import { makeAxiosHttpClient } from "../http/axios-http-client-factory";

export const makeAuthorizeHttpGetClientDecorator = (): HttpGetClient => {
  const localStorageAdapter = makeLocalStorageAdapter();
  const httpClient =  makeAxiosHttpClient();
  return new AuthorizeHttpGetClientDecorator(localStorageAdapter, httpClient);
}