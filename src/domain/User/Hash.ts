export class Hash {
  private salt: string;
  private hashedPassword: string;
  constructor(salt: string, hashedPassword: string) {
    this.salt = salt;
    this.hashedPassword = hashedPassword;
  }

  get() {
    return {
      salt: this.salt,
      hashedPassword: this.hashedPassword,
    };
  }

  equalTo(hash: Hash) {
    return hash.hashedPassword === this.hashedPassword;
  }
}
