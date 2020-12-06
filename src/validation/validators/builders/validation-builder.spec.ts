import { EmailValidation, RequiredFieldValidation, MinLengthValidation } from "../";
import { ValidationBuilder } from "./validation-builder";
import faker from 'faker';

describe('ValidationBuilder', () => {
  test('Should return RequiredFieldValidation', () => {
    const field = faker.database.column();
    const validations = ValidationBuilder.field(field).required().build();
    expect(validations).toEqual([new RequiredFieldValidation(field)]);
  });

  test('Should return EmailValidation', () => {
    const field = faker.database.column();
    const validations = ValidationBuilder.field(field).email().build();
    expect(validations).toEqual([new EmailValidation(field)]);
  });

  test('Should return MinLengthValidation', () => {
    const field = faker.database.column();
    const validations = ValidationBuilder.field(field).min(5).build();
    expect(validations).toEqual([new MinLengthValidation(field, 5)]);
  });

  test('Should return a list of validations', () => {
    const field = faker.database.column();
    const validations = ValidationBuilder.field(field).required().email().min(5).build();
    expect(validations).toEqual([
      new RequiredFieldValidation(field),
      new EmailValidation(field),
      new MinLengthValidation(field, 5)
    ]);
  });
});