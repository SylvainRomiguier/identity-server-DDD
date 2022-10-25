import { Hash } from "./Hash";
import { User } from "./User";
export type NewUserDto = {
    id:string;
    lastName: string;
    firstName: string;
    email: string;
    userName: string;
    hash:Hash;
} 
export class NewUser extends User {
    private hash: Hash;
    constructor(newUser:NewUserDto) {
        const {id, firstName, lastName, email, userName} = newUser;
        super({id, firstName, lastName, email, userName});
        this.hash = newUser.hash;
    }
    get () {
        return {
            id: this.id,
            firstName: this.firstName,
            lastName: this.lastName,
            userName: this.userName,
            fullName: `${this.firstName} ${this.lastName}`,
            email: this.email.get(),
            hash: this.hash
        }
    }
    
}