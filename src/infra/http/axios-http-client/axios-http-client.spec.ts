import { AxiosHttpClient } from './axios-http-client';
import { mockAxios } from '../../test';
import axios from 'axios';
import { mockPostRequest } from '../../../data/test';

jest.mock('axios');

type sutTypes = {
  sut: AxiosHttpClient;
  mockedAxios: jest.Mocked<typeof axios>;
}

const makeSut = (): sutTypes => {
  const sut = new AxiosHttpClient();
  const mockedAxios = mockAxios();

  return {
    sut, mockedAxios
  };
}

describe('AxiosHttpClient', () => {
  it('Should call axios with correct values', async () => {
    const request = mockPostRequest();
    const { sut, mockedAxios } = makeSut();
    await sut.post(request);
    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body);
  });

  it('Should return the correct statusCode and body', async () => {
    const request = mockPostRequest();
    const { sut, mockedAxios } = makeSut();
    const promise = sut.post(request);
    expect(promise).toEqual(mockedAxios.post.mock.results[0].value);
  });
});