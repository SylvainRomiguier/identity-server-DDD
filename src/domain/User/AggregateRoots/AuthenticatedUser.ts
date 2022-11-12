import { Token } from "../ValueObjects/Token";
import { User, UserDto } from "./User";

export class AuthenticatedUser extends User {
  private _token: Token;
  constructor(user: UserDto, token: Token) {
    super(user);
    this._token = token;
  }
  get token() {
    return this._token;
  }
}
