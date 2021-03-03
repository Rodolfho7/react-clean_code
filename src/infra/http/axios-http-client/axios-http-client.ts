import { HttpPostClient, HttpPostParams } from "../../../data/protocols/http/http-post-client";
import { HttpResponse } from "../../../data/protocols/http/http-response";
import axios, { AxiosResponse } from 'axios';

export class AxiosHttpClient implements HttpPostClient {
  async post(params: HttpPostParams): Promise<HttpResponse> {
    let httpResponse: AxiosResponse;
    try {
      httpResponse = await axios.post(params.url, params.body);
    } catch(error) {
      httpResponse = error.response;
    }
    return {
      statusCode: httpResponse.status,
      body: httpResponse.data
    };
  }
}