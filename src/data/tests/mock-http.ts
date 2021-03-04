import { HttpResponse, HttpStatusCode } from "../protocols/http/http-response";
import { HttpPostClient, HttpPostParams } from "../protocols/http/http-post-client";
import { HttpGetClient, HttpGetParams } from "../protocols/http/http-get-client";
import faker from 'faker';

export const mockPostRequest = (): HttpPostParams => {
  return {
    url: faker.internet.url(),
    body: faker.random.objectElement()
  }
}

export const mockGetRequest = (): HttpGetParams => {
  return {
    url: faker.internet.url()
  };
}

export class HttpPostClientSpy<R> implements HttpPostClient<R> {
  url: string;
  body?: any;
  response?: HttpResponse<R> = {
    statusCode: HttpStatusCode.ok
  }

  async post(params: HttpPostParams): Promise<HttpResponse<R>> {
    this.url = params.url;
    this.body = params.body;
    return Promise.resolve(this.response);
  }
}

export class HttpGetClientSpy<R> implements HttpGetClient<R> {
  url: string;
  response: HttpResponse<R> = {
    statusCode: HttpStatusCode.ok
  };

  async get(params: HttpGetParams): Promise<HttpResponse<R>> {
    this.url = params.url;
    return this.response;
  }
}