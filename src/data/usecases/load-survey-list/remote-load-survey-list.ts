import { HttpStatusCode } from '../../protocols/http/http-response';
import { HttpGetClient } from '../../protocols/http/http-get-client';
import { UnexpectedError } from '../../../domain/Error/unexpected-error';
import { LoadSurveyList } from '../../../domain/usecases/load-survey-list';

export class RemoteLoadSurveyList implements LoadSurveyList {
  constructor(
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient<RemoteLoadSurveyList.Model[]>
  ) {}

  async loadAll(): Promise<LoadSurveyList.Model[]> {
    const httpResponse = await this.httpGetClient.get({ url: this.url });
    const remoteSurveys = httpResponse.body || [];
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return remoteSurveys.map(remote => {
          return { ...remote, date: new Date(remote.date) };
        });
      case HttpStatusCode.noContent:
        return [];
      default:
        throw new UnexpectedError();
    }
  }
}

export namespace RemoteLoadSurveyList {
  export type Model = {
    id: string;
    question: string;
    date: string;
    didAnswer: boolean;
  }
}
