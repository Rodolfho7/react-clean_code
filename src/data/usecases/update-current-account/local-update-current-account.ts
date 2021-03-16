import { UpdateCurrentAccount } from "../../../domain/usecases/update-current-account";
import { SetStorage } from '../../protocols/cache/set-storage';
import { UnexpectedError } from '../../../domain/Error/unexpected-error';
import { AccountModel } from "../../../domain/models/accountModel";

export class LocalUpdateCurrentAccount implements UpdateCurrentAccount {
  constructor(private readonly setStorage: SetStorage) {}
  async save(account: AccountModel): Promise<void> {
    if (!account?.accessToken) {
      throw new UnexpectedError();
    }
    await this.setStorage.set('account', JSON.stringify(account));
  }
}