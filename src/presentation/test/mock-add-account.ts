import { AuthenticationParams } from '../../domain/usecases/authentication';
import { AccountModel } from '../../domain/models/accountModel';
import { mockAccountModel } from '../../domain/test/mock-account';
import { AddAccount, AddAccountParams } from '../../domain/usecases/add-account';

export class AddAccountSpy implements AddAccount {
  account = mockAccountModel();
  params: AuthenticationParams;
  callsCount = 0;

  async add(params: AddAccountParams): Promise<AccountModel> {
    this.params = params;
    this.callsCount++;
    return this.account;
  }
}