
import { Token } from "../../domain/User/ValueObjects/Token";
import { Password } from "../../domain/User/ValueObjects/Password";
import { User } from "../../domain/User/AggregateRoots/User";
import { Permission } from "../../domain/License/ValueObjects/Permission";

export interface IAuthenticationService {
    authorize: (user: User, password: Password) => Promise<Token>;
    getUserWithPermissions: (token:Token) => Promise<{
        user: User,
        permissions: Permission[]
    }>;
}

