import { ValueObject } from "../../common/models/ValueObject";

export type PayloadDto = {
  userId: string;
};

export type Payload = {
  userId: string;
}

export class TokenPayload extends ValueObject {
  private _value:Payload;
  constructor(payloadDto: PayloadDto) {
    super();
    this._value = payloadDto;
  }
  get() {
    return {
      ...this._value,
    };
  }
  getEqualityComponents(): (string | number)[] {
    return Object.values(this.get());
  }
}
