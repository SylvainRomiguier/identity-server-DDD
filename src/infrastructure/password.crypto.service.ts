import crypto from "crypto";
import { IPasswordProvider } from "../application/infrastructureInterfaces/IPasswordProvider";
import { Hash } from "../domain/User/Hash";

export class PasswordProvider implements IPasswordProvider {
  async verifyPassword(plainTextPassword: string, hash: Hash) {
    const computedHash = await this.hasher(plainTextPassword, hash.get().salt);
    return computedHash.equalTo(hash);
  }
  async createPassword(plainTextPassword: string) {
    return await this.hasher(plainTextPassword, await this.generateSalt(12));
  }

  private async generateSalt(rounds?: number) {
    if (!rounds) {
      rounds = 12;
    }
    if (rounds >= 15) {
      throw new Error(`${rounds} is greater than 15, must be less that 15`);
    }

    return crypto
      .randomBytes(Math.ceil(rounds / 2))
      .toString("hex")
      .slice(0, rounds);
  }

  private async hasher(plainTextPassword: string, salt: string) {
    const hash = crypto.createHmac("sha512", salt);
    hash.update(plainTextPassword);
    const hashedPassword = hash.digest("hex");
    return new Hash(salt, hashedPassword);
  }
}
