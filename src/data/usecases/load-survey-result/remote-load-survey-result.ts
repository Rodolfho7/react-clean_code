import { HttpStatusCode } from "../../protocols/http/http-response";
import { HttpGetClient } from "../../protocols/http/http-get-client";
import { AccessDeniedError } from "../../../domain/Error/access-denied-error";
import { UnexpectedError } from "../../../domain/Error/unexpected-error";
import { LoadSurveyResult } from "../../../domain/usecases/load-survey-result";

export class RemoteLoadSurveyResult implements LoadSurveyResult {
  constructor(
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient<RemoteLoadSurveyResult.Model>
  ) {}

  async load(): Promise<LoadSurveyResult.Model> {
    const httpResponse = await this.httpGetClient.get({ url: this.url });
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return { ...httpResponse.body, date: new Date(httpResponse.body.date) };
      case HttpStatusCode.forbidden:
        throw new AccessDeniedError();
      default:
        throw new UnexpectedError();
    }
  }
}

export namespace RemoteLoadSurveyResult {
  export type Model = {
    question: string;
    date: string;
    answers: Array<{
      image?: string;
      answer: string;
      count: number;
      percent: number;
      isCurrentAccountAnswer: boolean;
    }>
  }
}
