import { IUserService } from "./serviceInterfaces/IUserService";
import { User } from "../domain/User";

export class RemoveUser {
    constructor(private userService:IUserService){}
    async for(user:User) {
        await this.userService.removeUser(user.get().id);
    }
}