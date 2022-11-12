import { ValueObject } from "../../common/models/ValueObject";

export class Hash extends ValueObject {
  private _salt: string;
  private _hashedPassword: string;
  constructor(salt: string, hashedPassword: string) {
    super();
    this._salt = salt;
    this._hashedPassword = hashedPassword;
  }

  get value() {
    return {
      salt: this._salt,
      hashedPassword: this._hashedPassword,
    };
  }
  getEqualityComponents(): (string | number)[] {
    return [this._salt, this._hashedPassword];
  }
}
