import { RemoteAuthentication } from './remote-authentication';
import { HttpPostClient } from '../../protocols/http/http-post-client';


describe('RemoteAuthentication', () => {
  it('Should call httpClient with correct URL', async () => {
    class HttpPostClientSpy implements HttpPostClient {
      url?: string;
      async post(url: string): Promise<void> {
        this.url = url;
        return Promise.resolve();
      }

    }
    const url = 'any_url';
    const httpClientSpy = new HttpPostClientSpy();
    const sut = new RemoteAuthentication(url, httpClientSpy);
    await sut.auth();
    expect(httpClientSpy.url).toBe(url);
  });
});
