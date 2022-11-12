import { Token } from "../domain/User/ValueObjects/Token";
import { Password } from "../domain/User/ValueObjects/Password";
import { User } from "../domain/User/AggregateRoots/User";
import { IAuthenticationService } from "./applicationInterfaces/IAuthenticationService";
import { IUserService } from "./applicationInterfaces/IUserService";
import { ITokenProvider } from "./infrastructureInterfaces/ITokenProvider";

export class AuthenticationService implements IAuthenticationService {
  constructor(
    private userService: IUserService,
    private tokenProvider: ITokenProvider
  ) {}
  async authorize(user: User, password: Password) {
    const authorized = await this.userService.isPasswordValid(user, password);
    if (!authorized) {
      throw new Error(`Bad password.`);
    }
    const token = this.tokenProvider.sign({ userId: user.get().id });
    return token;
  }
  async getUserWithPermissions(token: Token) {
    const userId = this.tokenProvider.verify(token).get().userId;
    if (!userId) {
      throw new Error("Bad token");
    }
    const user = await this.userService.getUserById(userId);
    const permissions = await this.userService.getUserPermissions(user);
    return {
      user,
      permissions
    };
  }
}
