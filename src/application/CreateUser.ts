import { IPasswordService } from "./serviceInterfaces/IPasswordService";
import { IUserService } from "./serviceInterfaces/IUserService";
import { IUUIDService } from "./serviceInterfaces/IUUIDService";
import { User, UserDto } from "../domain/User";

export class CreateUser {
    constructor(private uuidService: IUUIDService, private userService: IUserService, private passwordService:IPasswordService) {}
    async with(user: Omit<UserDto, "id">, plainTextPassword:string) {
        const newUser = new User({id: this.uuidService.getRandomUUID(),...user});
        const persistedUser = await this.userService.persistUser(newUser, await this.passwordService.createPassword(plainTextPassword));
        return persistedUser;
    }
}