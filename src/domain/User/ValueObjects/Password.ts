import { ValueObject } from "../../common/models/ValueObject";

export class Password extends ValueObject {
  private _value: string;
  constructor(plainTextPassword: string) {
    const oneNumberRule = "^.*[0-9].*$";
    const oneCapRule = "^.*[A-Z].*$";
    const oneSpecialCharacterRule = "^.*[#$%&*+/=?_-].*$";

    const validOneNumberRule = !!plainTextPassword.match(oneNumberRule);
    const validOneCapRule = !!plainTextPassword.match(oneCapRule);
    const validOneSpecialCharacterRule = !!plainTextPassword.match(
      oneSpecialCharacterRule
    );
    const valid =
      plainTextPassword.length >= 6 &&
      validOneNumberRule &&
      validOneCapRule &&
      validOneSpecialCharacterRule;

    if (!valid) {
      throw new Error(
        `the password should be at least 6 characters, contains at least 1 number, 1 upper case letter and 1 special character : #$%&*+/=?_-`
      );
    }
    super();
    this._value = plainTextPassword;
  }
  get value() {
    return this._value;
  }
  getEqualityComponents(): (string | number)[] {
    return [this._value];
  }
}
