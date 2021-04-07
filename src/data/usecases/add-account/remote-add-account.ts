import { HttpPostClient } from "../../protocols/http/http-post-client";
import { AddAccount } from "../../../domain/usecases/add-account";
import { EmailInUseError } from "../../../domain/Error/email-in-use-error";
import { HttpStatusCode } from "../../protocols/http/http-response";
import { UnexpectedError } from "../../../domain/Error/unexpected-error";

export class RemoteAddAccount implements AddAccount {

  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<RemoteAddAccount.Model>
  ) {}

  async add(params: AddAccount.Params): Promise<AddAccount.Model> {
    const httpResponse = await this.httpPostClient.post({
      url: this.url,
      body: params
    });
    switch(httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return httpResponse.body;
      case HttpStatusCode.forbidden:
        throw new EmailInUseError();
      default:
        throw new UnexpectedError();
    }
  }
}

export namespace RemoteAddAccount {
  export type Model = AddAccount.Model;
}