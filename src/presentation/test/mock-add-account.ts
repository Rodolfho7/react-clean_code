import { Authentication } from '../../domain/usecases/authentication';
import { AccountModel } from '../../domain/models/accountModel';
import { mockAccountModel } from '../../domain/test/mock-account';
import { AddAccount } from '../../domain/usecases/add-account';

export class AddAccountSpy implements AddAccount {
  account = mockAccountModel();
  params: Authentication.Params;
  callsCount = 0;

  async add(params: AddAccount.Params): Promise<AddAccount.Model> {
    this.params = params;
    this.callsCount++;
    return this.account;
  }
}