import { HttpPostClient } from '../../protocols/http/http-post-client';
import { AuthenticationParams } from '../../../domain/usecases/authentication';

export class RemoteAuthentication {
  constructor(
    private readonly url: string,
    private readonly httpPostCLient: HttpPostClient
    ) {}
  
  async auth(params: AuthenticationParams): Promise<void> {
    await this.httpPostCLient.post({
      url: this.url,
      body: params
    });
  }
}