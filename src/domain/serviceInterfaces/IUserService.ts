import { Email } from "../User/Email";
import { Hash } from "../../domain/User/Hash";
import { User } from "../../domain/User/User";
import { NewUser } from "../User/NewUser";

export interface IUserService {
    addUser: (user:NewUser) => Promise<User>;
    updateUser: (user:User, hash?:Hash) => Promise<User>;
    removeUser: (id:string) => Promise<void>;
    getUserById: (id:string) => Promise<User | undefined>;
    getUserByEmail: (email:Email) => Promise<User | undefined>;
    getUserHash: (id:string) => Promise<Hash>;
}