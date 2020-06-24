import { HttpPostParams, HttpResponse, HttpPostClient } from "../../../data/protocols/http";
import Axios from "axios";

export class AxiosHttpClient implements HttpPostClient<any, any> {
  async post (params: HttpPostParams<any>): Promise<HttpResponse<any>> {
    const httpResponse = await Axios.post(params.url, params.body);
    return {
      statusCode: httpResponse.status,
      body: httpResponse.data
    };
  }
}