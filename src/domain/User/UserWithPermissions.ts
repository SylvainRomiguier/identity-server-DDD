import { Permission } from "../License/Permission";
import { User } from "./User";

export class UserWithPermissions {
  private _user: User;
  private _permissions: Permission[];
  constructor(user: User, permissions: Permission[]) {
    this._user = user;
    this._permissions = permissions;
  }
  get() {
    return {
      ...this._user.get(),
      permissions: this._permissions.map((p) => p.get()),
    };
  }
}
