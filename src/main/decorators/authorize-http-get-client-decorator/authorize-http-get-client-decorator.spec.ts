import { GetStorageSpy } from "../../../data/tests/mock-cache";
import { HttpGetClientSpy, mockGetRequest } from "../../../data/tests/mock-http";
import { AuthorizeHttpGetClientDecorator } from "./authorize-http-get-client-decorator";
import { HttpGetParams } from "../../../data/protocols/http/http-get-client";
import { mockAccountModel } from "../../../domain/test/mock-account";
import faker from 'faker';

type SutTypes = {
  sut: AuthorizeHttpGetClientDecorator;
  getStorageSpy: GetStorageSpy;
  httpGetClientSpy: HttpGetClientSpy;
};

const makeSut = (): SutTypes => {
  const getStorageSpy = new GetStorageSpy();
  const httpGetClientSpy = new HttpGetClientSpy();
  const sut = new AuthorizeHttpGetClientDecorator(getStorageSpy, httpGetClientSpy);
  return { sut, getStorageSpy, httpGetClientSpy };
}

describe('AuthorizeHttpGetClientDecorator', () => {
  test('Should call GetStorage with correct values', async () => {
    const { sut, getStorageSpy } = makeSut();
    await sut.get(mockGetRequest());
    expect(getStorageSpy.key).toBe('account');
  });

  test('Should not add headers if getStorage is invalid', async () => {
    const { sut, httpGetClientSpy } = makeSut();
    const httpRequest: HttpGetParams = {
      url: faker.internet.url(),
      headers: {
        field: faker.random.word()
      }
    };
    await sut.get(httpRequest);
    expect(httpGetClientSpy.url).toBe(httpRequest.url);
    expect(httpGetClientSpy.headers).toEqual(httpRequest.headers);
  });

  test('Should merge headers to HttpGetClient', async () => {
    const { sut, getStorageSpy, httpGetClientSpy } = makeSut();
    getStorageSpy.value = mockAccountModel();
    const httpRequest: HttpGetParams = {
      url: faker.internet.url(),
      headers: {
        field: faker.random.word()
      }
    };
    await sut.get(httpRequest);
    expect(httpGetClientSpy.url).toBe(httpRequest.url);
    expect(httpGetClientSpy.headers).toEqual({
      field: httpRequest.headers.field,
      'x-access-token': getStorageSpy.value.accessToken
    });
  });

  test('Should return the same results as HttpGetClient', async () => {
    const { sut, httpGetClientSpy } = makeSut();
    const httpResponse = await sut.get(mockGetRequest());
    expect(httpResponse).toEqual(httpGetClientSpy.response);
  });
});
