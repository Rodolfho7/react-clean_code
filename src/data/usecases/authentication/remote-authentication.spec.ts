import { RemoteAuthentication } from "./remote-authentication";
import { HttpPostClientSpy } from "../../tests/mock-http";
import { InvalidCredentialsError } from "../../../domain/Error/invalid-credentials-error";
import { HttpStatusCode } from "../../protocols/http/http-response";
import { UnexpectedError } from "../../../domain/Error/unexpected-error";
import { mockAuthenticationModel, mockAuthenticationParams } from "../../../domain/test/mock-authentication";
import faker from 'faker';

type SutTypes = {
  sut: RemoteAuthentication,
  httpPostClientSpy: HttpPostClientSpy<RemoteAuthentication.Model>
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy<RemoteAuthentication.Model>()
  const sut = new RemoteAuthentication(url, httpPostClientSpy);
  return { sut, httpPostClientSpy };
}

describe('RemoteAuthentication', () => {
  test('Should call HttpPostClient with correct URL', async () => {
    const url = faker.internet.url();
    const { sut, httpPostClientSpy } = makeSut(url);
    await sut.auth(mockAuthenticationParams());
    expect(httpPostClientSpy.url).toBe(url);
  });

  test('Should call HttpPostClient with correct body', async () => {
    const { sut, httpPostClientSpy } = makeSut();
    const authenticationParams = mockAuthenticationParams();
    await sut.auth(authenticationParams);
    expect(httpPostClientSpy.body).toEqual(authenticationParams);
  });

  test('Should throw InvalidCredentialsError if HttpPostClient returns 401', async () => {
    const { sut, httpPostClientSpy } = makeSut();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.unauthorized
    }
    const authenticationParams = mockAuthenticationParams();
    const promise = sut.auth(authenticationParams);
    await expect(promise).rejects.toThrow(new InvalidCredentialsError());
  });

  test('Should throw UnexpectedError if HttpPostClient returns 400', async () => {
    const { sut, httpPostClientSpy } = makeSut();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.badRequest
    }
    const authenticationParams = mockAuthenticationParams();
    const promise = sut.auth(authenticationParams);
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test('Should throw UnexpectedError if HttpPostClient returns 500', async () => {
    const { sut, httpPostClientSpy } = makeSut();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.serverError
    }
    const authenticationParams = mockAuthenticationParams();
    const promise = sut.auth(authenticationParams);
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test('Should throw UnexpectedError if HttpPostClient returns 404', async () => {
    const { sut, httpPostClientSpy } = makeSut();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.notFound
    }
    const authenticationParams = mockAuthenticationParams();
    const promise = sut.auth(authenticationParams);
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test('Should return an Authentication.Model if HttpPostClient returns 200', async () => {
    const { sut, httpPostClientSpy } = makeSut();
    const httpResult = mockAuthenticationModel();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult
    }
    const account = await sut.auth(mockAuthenticationParams());
    await expect(account).toEqual(httpResult);
  });
});
