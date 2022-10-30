import { Token } from "../domain/Authentication/Token";
import { User } from "../domain/User/User";
import { UserWithPermissions } from "../domain/User/UserWithPermissions";
import { IAuthenticationService } from "./applicationInterfaces/IAuthenticationService";
import { IUserService } from "./applicationInterfaces/IUserService";
import { ITokenProvider } from "./infrastructureInterfaces/ITokenProvider";

export class AuthenticationService implements IAuthenticationService {
    constructor(private userService: IUserService, private tokenProvider:ITokenProvider) {}
    async authorize(user: User, plainTextPassword: string) {
        const authorized = this.userService.isPasswordValid(user, plainTextPassword);
        if(!authorized) {
            throw new Error(`Bad password.`)
        }
        const token = this.tokenProvider.sign({userId: user.get().id});
        return token;
    }
    async getUser(token: Token) {
        const userId = this.tokenProvider.verify(token).get().userId;
        if(!userId) {throw new Error("Bad token")};
        const user = await this.userService.getUserById(userId);
        const userPermissions = await this.userService.getUserPermissions(user);
        const userWithPermissions = new UserWithPermissions(user, userPermissions);
        return userWithPermissions;
    }
}