import { makeAxiosHttpClient } from "../../http/axios-http-client-factory";
import { Authentication } from "../../../../domain/usecases/authentication";
import { RemoteAuthentication } from "../../../../data/usecases/authentication/remote-authentication";
import { makeApiUrl } from "../../http/api-url-factory";

export const makeRemoteAuthentication = (): Authentication => {
  const url = makeApiUrl('/login');
  const axiosHttpClient = makeAxiosHttpClient();
  return new RemoteAuthentication(url, axiosHttpClient);
}