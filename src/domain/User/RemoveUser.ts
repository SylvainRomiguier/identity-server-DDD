import { IUserService } from "../serviceInterfaces/IUserService";
import { User } from "./User";

export class RemoveUser {
    constructor(private userService:IUserService){}
    async for(user:User) {
        await this.userService.removeUser(user.get().id);
    }
}