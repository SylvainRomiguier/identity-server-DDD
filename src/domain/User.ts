import { Email } from "./Email";

export type UserDto = {
    id: string;
    lastName: string;
    firstName: string;
    email: string;
    userName: string;
} 

export class User {
    private id: string;
    private lastName: string;
    private firstName: string;
    private email: Email;
    private userName: string;
    constructor(user: UserDto) {
        this.id = user.id;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.userName = user.userName;
        this.email = new Email(user.email);
    }
    get () {
        return {
            id: this.id,
            firstName: this.firstName,
            lastName: this.lastName,
            userName: this.userName,
            fullName: `${this.firstName} ${this.lastName}`,
            email: this.email.get(),
        }
    }

    equalTo (user:User) {
        return user.id === this.id;
    }
}