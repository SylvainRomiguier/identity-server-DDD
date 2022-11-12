import { ValueObject } from "../../common/models/ValueObject";

export class Email extends ValueObject {
  private _value: string;
  constructor(value: string) {
    const emailRule =
      "^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$";
    if (value.match(emailRule) === null) {
      throw new Error(`email ${value} is invalid.`);
    }
    super();
    this._value = value;
  }
  get value() {
    return this._value;
  }
  getEqualityComponents(): (string | number)[] {
    return [this._value];
  }
}
