import { ITokenService } from "../serviceInterfaces/ITokenService";
import { IUserService } from "../serviceInterfaces/IUserService";

export class AuthenticateUserFromToken {
  constructor(
    private userService: IUserService,
    private tokenService: ITokenService
  ) {}
  async for(token: string) {
    const userId = await this.tokenService.verify(token);
    const user = await this.userService.getUserById(userId);
    if (user) {
      return user;
    }
    throw new Error(`User with id ${userId} was not found.`);
  }
}
