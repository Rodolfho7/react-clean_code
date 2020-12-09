import { makeApiUrl } from "../../http/api-url-factory";
import { makeAxiosHttpClient } from "../../http/axios-http-client-factory";
import { RemoteAddAccount } from "../../../../data/usecases/add-account/remote-add-account";
import { AddAccount } from "../../../../domain/usecases/add-account";

export const makeRemoteAddAccount = (): AddAccount => {
  const url = makeApiUrl('/signup');
  const httpClient = makeAxiosHttpClient();
  return new RemoteAddAccount(url, httpClient);
}