export type PayloadDto = {
  userId: string;
};
export class TokenPayload {
  private _content: {
    userId: string | undefined;
  } = { userId: undefined };
  constructor(payloadDto: PayloadDto) {
    this._content = {
      userId: payloadDto.userId,
    };
  }
  get() {
    return {
      ...this._content,
    };
  }
}
