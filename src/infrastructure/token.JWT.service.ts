import { ITokenService } from "../domain/serviceInterfaces/ITokenService";
import jsonwebtoken from "jsonwebtoken";

export class TokenService implements ITokenService {
  constructor(private privateKey: string, private publicKey: string) {
    if (!privateKey || !publicKey) {
      throw new Error("Private and public keys are mandatory.");
    }
  }
  verify(token: string) {
    const payload = jsonwebtoken.verify(token, this.publicKey, {
      algorithms: ["RS256"],
    });
    if (!(payload as { userId: string }).userId) {
      throw new Error("Bad token.");
    }
    return (payload as { userId: string }).userId;
  }
  sign(payload: { userId: string }): string {
    const token = jsonwebtoken.sign(payload, this.privateKey, {
      algorithm: "RS256",
    });
    return token;
  }
}
