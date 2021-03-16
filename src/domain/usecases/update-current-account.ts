import { AccountModel } from "../models/accountModel";

export interface UpdateCurrentAccount {
  save(account: AccountModel): Promise<void>;
}
