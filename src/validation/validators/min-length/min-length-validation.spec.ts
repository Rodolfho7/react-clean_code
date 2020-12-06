import { InvalidFieldError } from "../../Errors";
import { MinLengthValidation } from "./min-length-validation";
import faker from 'faker';

const makeSut = (): MinLengthValidation => {
  return new MinLengthValidation(faker.database.column(), 5);
}

describe('MinLengthValidation', () => {
  test('Should return error if value is invalid', () => {
    const sut = makeSut();
    const error = sut.validate('123');
    expect(error).toEqual(new InvalidFieldError());
  });

  test('Should return null if value is valid', () => {
    const sut = makeSut();
    const error = sut.validate('12345');
    expect(error).toBeFalsy();
  });
});