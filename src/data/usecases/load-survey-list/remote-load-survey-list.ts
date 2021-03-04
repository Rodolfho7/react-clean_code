import { HttpStatusCode } from '../../protocols/http/http-response';
import { HttpGetClient } from '../../protocols/http/http-get-client';
import { UnexpectedError } from '../../../domain/Error/unexpected-error';
import { SurveyModel } from '../../../domain/models/survey-model';
import { LoadSurveyList } from '../../../domain/usecases/load-survey-list';

export class RemoteLoadSurveyList implements LoadSurveyList {
  constructor(
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient<SurveyModel[]>
  ) {}

  async loadAll(): Promise<SurveyModel[]> {
    const httpResponse = await this.httpGetClient.get({ url: this.url });
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return httpResponse.body;
      case HttpStatusCode.noContent:
        return [];
      default:
        throw new UnexpectedError();
    }
  }
}