import { HttpPostClient, HttpPostParams } from "../../../data/protocols/http/http-post-client";
import { HttpResponse } from "../../../data/protocols/http/http-response";
import { HttpGetClient, HttpGetParams } from "../../../data/protocols/http/http-get-client";
import axios, { AxiosResponse } from 'axios';

export class AxiosHttpClient implements HttpPostClient, HttpGetClient {
  async post(params: HttpPostParams): Promise<HttpResponse> {
    let axiosResponse: AxiosResponse;
    try {
      axiosResponse = await axios.post(params.url, params.body);
    } catch(error) {
      axiosResponse = error.response;
    }
    return {
      statusCode: axiosResponse.status,
      body: axiosResponse.data
    };
  }

  async get(params: HttpGetParams): Promise<HttpResponse> {
    let axiosResponse: AxiosResponse;
    try {
      axiosResponse = await axios.get(params.url, { headers: params.headers });
    } catch (error) {
      axiosResponse = error.response;
    }
    return {
      statusCode: axiosResponse.status,
      body: axiosResponse.data
    };
  }
}