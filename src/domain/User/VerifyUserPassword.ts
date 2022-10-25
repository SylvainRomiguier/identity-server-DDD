import { Password } from "./Password";
import { User } from "./User";
import { IPasswordService } from "../serviceInterfaces/IPasswordService";
import { IUserService } from "../serviceInterfaces/IUserService";

export class VerifyUserPassword {
  constructor(
    private userService: IUserService,
    private passwordService: IPasswordService
  ) {}
  async for(user: User, plainTextPassword: string): Promise<boolean> {
    const password = new Password(plainTextPassword);
    const hash = await this.userService.getUserHash(user.get().id);
    return this.passwordService.verifyPassword(password.get(), hash);
  }
}