import { Hash } from "../domain/Hash";
import { Password } from "../domain/Password";
import { IPasswordService } from "./serviceInterfaces/IPasswordService";

export class CreatePassword {
  constructor(private passwordService: IPasswordService) {}
  async for(plainTextPassword: string): Promise<Hash> {
    const password = new Password(plainTextPassword);
    return this.passwordService.createPassword(password.get());
  }
  
}
