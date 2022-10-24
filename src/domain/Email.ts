export class Email {
  private value: string;
  constructor(email: string) {
    const emailRule =
      "^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$";
    if (email.match(emailRule) === null) {
      throw new Error(`email ${email} is invalid.`);
    }
    this.value = email;
  }
  get() {
    return this.value;
  }
  equalTo(email: Email) {
    return email.get() === this.value;
  }
}
