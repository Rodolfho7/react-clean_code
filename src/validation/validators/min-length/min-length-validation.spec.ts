import { InvalidFieldError } from "../../Errors";
import { MinLengthValidation } from "./min-length-validation";
import faker from 'faker';

const makeSut = (field: string): MinLengthValidation => {
  return new MinLengthValidation(field, 5);
}

describe('MinLengthValidation', () => {
  test('Should return error if value is invalid', () => {
    const field = faker.database.column();
    const sut = makeSut(field);
    const error = sut.validate({ [field]: '123' });
    expect(error).toEqual(new InvalidFieldError());
  });

  test('Should return null if value is valid', () => {
    const field = faker.database.column();
    const sut = makeSut(field);
    const error = sut.validate({ [field]: '123456' });
    expect(error).toBeFalsy();
  });

  test('Should return falsy if field does not exist in schema', () => {
    const field = faker.database.column();
    const sut = makeSut(field);
    const error = sut.validate({ [faker.database.column()]: '123456' });
    expect(error).toBeFalsy();
  });
});