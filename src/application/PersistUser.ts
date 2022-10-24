import { Hash } from "../domain/Hash";
import { IPasswordService } from "./serviceInterfaces/IPasswordService";
import { IUserService } from "./serviceInterfaces/IUserService";
import { User } from "../domain/User";

export class PersistUser {
    constructor(private userService: IUserService, private passwordService:IPasswordService) {}
    async for(user:User, plainTextPassword?: string) {
        let hash: Hash | undefined = undefined;
        if(plainTextPassword) {
            hash = await this.passwordService.createPassword(plainTextPassword);
        }
        await this.userService.persistUser(user, hash);
    }
}