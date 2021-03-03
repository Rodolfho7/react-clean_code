import { fireEvent, RenderResult } from "@testing-library/react";
import faker from 'faker';

export const testChildCount = (sut: RenderResult, fieldName: string, count: number) => {
  const el = sut.getByTestId(fieldName);
  expect(el.childElementCount).toBe(count);
}

export const testButtonIsDisabled = (sut: RenderResult, fieldName: string, isDisabled: boolean): void => {
  const button = sut.getByTestId(fieldName) as HTMLButtonElement;
  expect(button.disabled).toBe(isDisabled);
}

export const testStatusForField = (sut: RenderResult, fieldName: string, validationError: string = '') => {
  const wrap = sut.getByTestId(`${fieldName}-wrap`);
  const field = sut.getByTestId(fieldName);
  const label = sut.getByTestId(`${fieldName}-label`);
  expect(wrap.getAttribute('data-status')).toBe(validationError ? 'invalid' : 'valid');
  expect(field.title).toBe(validationError);
  expect(label.title).toBe(validationError);
}

export const populateField = (sut: RenderResult, fieldName: string, value = faker.random.word()) => {
  const input = sut.getByTestId(fieldName);
  fireEvent.input(input, { target: { value } });
}

export const testElementExists = (sut: RenderResult, id: string): void => {
  const element = sut.getByTestId(id);
  expect(element).toBeTruthy();
}

export const testElementText = (sut: RenderResult, fieldName: string, text: string): void => {
  const element = sut.getByTestId(fieldName);
  expect(element.textContent).toBe(text);
}