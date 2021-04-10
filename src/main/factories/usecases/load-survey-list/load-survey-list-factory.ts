import { RemoteLoadSurveyList } from "../../../../data/usecases/load-survey-list/remote-load-survey-list";
import { makeApiUrl } from "../../http/api-url-factory";
import { LoadSurveyList } from "../../../../domain/usecases/load-survey-list";
import { makeAuthorizeHttpGetClientDecorator } from "../../decorators/authorize-http-get-client-decorator-factory";

export const makeRemoteLoadSurveyList = (): LoadSurveyList => {
  const url = makeApiUrl('/surveys');
  const httpGetClient = makeAuthorizeHttpGetClientDecorator();
  return new RemoteLoadSurveyList(url, httpGetClient);
}