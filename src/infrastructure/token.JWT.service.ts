import jsonwebtoken from "jsonwebtoken";
import { ITokenProvider } from "../application/infrastructureInterfaces/ITokenProvider";
import { Token } from "../domain/User/ValueObjects/Token";
import {
  PayloadDto,
  TokenPayload,
} from "../domain/User/ValueObjects/TokenPayload";
import fs from "fs";

const findFirstDiff = (str1: string, str2: string) =>
  str2[[...str1].findIndex((el, index) => el !== str2[index])];

export class TokenProvider implements ITokenProvider {
  constructor(private privateKey: string, private publicKey: string) {
    if (!privateKey || !publicKey) {
      throw new Error("Private and public keys are mandatory.");
    }
  }
  verify(token: Token) {   
    const payload = jsonwebtoken.verify(token.value, this.publicKey, {
      algorithms: ["RS256"],
    });
    if (!(payload as PayloadDto)) {
      throw new Error("Bad token.");
    }
    return new TokenPayload(payload as PayloadDto);
  }
  sign(payload: { userId: string }): Token {
    const token = jsonwebtoken.sign(payload, this.privateKey, {
      algorithm: "RS256",
    });
    return new Token(token);
  }
}
