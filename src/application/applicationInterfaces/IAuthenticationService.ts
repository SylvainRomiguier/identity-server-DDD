
import { Token } from "../../domain/Authentication/Token";
import { User } from "../../domain/User/User";
import { UserWithPermissions } from "../../domain/User/UserWithPermissions";

export interface IAuthenticationService {
    authorize: (user: User, plainTextPassword: string) => Promise<Token>;
    getUser: (token:Token) => Promise<UserWithPermissions>;
}