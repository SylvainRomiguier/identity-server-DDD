import { Hash } from "./Hash";
import { IPasswordService } from "../serviceInterfaces/IPasswordService";
import { IUserService } from "../serviceInterfaces/IUserService";
import { User, UserDto } from "./User";

export class UpdateUser {
    constructor(private userService: IUserService, private passwordService:IPasswordService) {}
    async with(user:UserDto, plainTextPassword?: string) {
        const userToUpdate = new User(user);
        let hash: Hash | undefined = undefined;
        if(plainTextPassword) {
            hash = await this.passwordService.createPassword(plainTextPassword);
        }
        const updatedUser = await this.userService.updateUser(userToUpdate, hash);
        return updatedUser;
    }
}