import { HttpPostClient, HttpStatusCode } from '../../protocols/http';
import { AuthenticationParams, Authentication } from '../../../domain/usecases';
import { InvalidCredentialsError, unexpectedError } from '../../../domain/errors';
import { AccountModel } from '../../../domain/models';

export class RemoteAuthentication implements Authentication{
  constructor(
    private readonly url: string,
    private readonly httpPostCLient: HttpPostClient<AuthenticationParams, AccountModel>
  ) { }

  async auth(params: AuthenticationParams): Promise<AccountModel> {
    const httpResponse = await this.httpPostCLient.post({
      url: this.url,
      body: params
    });

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return httpResponse.body;
      case HttpStatusCode.unauthorized:
        throw new InvalidCredentialsError();
      default:
        throw new unexpectedError();
    }
  }
}