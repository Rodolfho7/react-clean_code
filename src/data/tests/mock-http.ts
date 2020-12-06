import { HttpResponse, HttpStatusCode } from "../protocols/http/http-response";
import { HttpPostClient, HttpPostParams } from "../protocols/http/http-post-client";
import faker from 'faker';

export const mockPostRequest = (): HttpPostParams<any> => {
  return {
    url: faker.internet.url(),
    body: faker.random.objectElement()
  }
}

export class HttpPostClientSpy<T, R> implements HttpPostClient<T, R> {
  url: string;
  body?: T;
  response?: HttpResponse<R> = {
    statusCode: HttpStatusCode.ok
  }

  async post(params: HttpPostParams<T>): Promise<HttpResponse<R>> {
    this.url = params.url;
    this.body = params.body;
    return Promise.resolve(this.response);
  }
}