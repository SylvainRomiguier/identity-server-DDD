import { IPasswordService } from "../serviceInterfaces/IPasswordService";
import { IUserService } from "../serviceInterfaces/IUserService";
import { IUUIDService } from "../serviceInterfaces/IUUIDService";
import { NewUser } from "./NewUser";
import { UserDto } from "./User";

export class CreateUser {
    constructor(private uuidService: IUUIDService, private userService: IUserService, private passwordService:IPasswordService) {}
    async with(user: Omit<UserDto, "id"> & {password:string;}) {
        const newUser = new NewUser({
            id: this.uuidService.getRandomUUID(),
            hash: await this.passwordService.createPassword(user.password),
            ...user});
        const persistedUser = await this.userService.addUser(newUser);
        return persistedUser;
    }
}