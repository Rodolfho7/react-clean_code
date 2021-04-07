import { HttpPostClient } from "../../../data/protocols/http/http-post-client";
import { HttpStatusCode } from "../../protocols/http/http-response";
import { InvalidCredentialsError } from "../../../domain/Error/invalid-credentials-error";
import { Authentication } from "../../../domain/usecases/authentication";
import { UnexpectedError } from "../../../domain/Error/unexpected-error";

export class RemoteAuthentication implements Authentication {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpPostClient<RemoteAuthentication.Model>
  ) { }

  async auth(params: Authentication.Params): Promise<Authentication.Model> {
    const httpResponse = await this.httpClient.post({ url: this.url, body: params });
    switch(httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return httpResponse.body;
      case HttpStatusCode.unauthorized:
        throw new InvalidCredentialsError();
      default:
        throw new UnexpectedError();
    }
  }
}

export namespace RemoteAuthentication {
  export type Model = Authentication.Model;
}
