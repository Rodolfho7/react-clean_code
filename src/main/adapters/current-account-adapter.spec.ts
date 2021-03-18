import { LocalStorageAdapter } from "../../infra/cache/local-storage-adapter";
import { mockAccountModel } from "../../domain/test/mock-account";
import { setCurrentAccountAdapter } from "./current-account-adapter";
import { UnexpectedError } from "../../domain/Error/unexpected-error";

jest.mock('../../infra/cache/local-storage-adapter');

describe('CurrentAccountAdapter', () => {
  test('Should call LocalStorageAdapter with correct values', () => {
    const account = mockAccountModel();
    const setSpy = jest.spyOn(LocalStorageAdapter.prototype, 'set');
    setCurrentAccountAdapter(account);
    expect(setSpy).toHaveBeenCalledWith('account', account);
  });

  test('Should throw UnexpectedError if no account is provided', () => {
    expect(() => {
      setCurrentAccountAdapter(undefined);
    }).toThrow(new UnexpectedError());
  });
});