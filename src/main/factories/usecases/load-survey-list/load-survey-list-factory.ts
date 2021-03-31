import { makeAxiosHttpClient } from "../../http/axios-http-client-factory";
import { RemoteLoadSurveyList } from "../../../../data/usecases/load-survey-list/remote-load-survey-list";
import { makeApiUrl } from "../../http/api-url-factory";
import { LoadSurveyList } from "../../../../domain/usecases/load-survey-list";

export const makeRemoteLoadSurveyList = (): LoadSurveyList => {
  const url = makeApiUrl('/surveys');
  const httpGetClient = makeAxiosHttpClient();
  return new RemoteLoadSurveyList(url, httpGetClient);
}