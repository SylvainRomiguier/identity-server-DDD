import { IPasswordService } from "../serviceInterfaces/IPasswordService";
import { Hash } from "./Hash";
import { Password } from "./Password";


export class CreatePassword {
  constructor(private passwordService: IPasswordService) {}
  async for(plainTextPassword: string): Promise<Hash> {
    const password = new Password(plainTextPassword);
    return this.passwordService.createPassword(password.get());
  }
  
}
