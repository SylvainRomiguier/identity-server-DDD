import { Email } from "../../domain/Email";
import { Hash } from "../../domain/Hash";
import { User } from "../../domain/User";

export interface IUserService {
    persistUser: (user:User, hash?:Hash) => Promise<User>;
    removeUser: (id:string) => Promise<void>;
    getUserById: (id:string) => Promise<User | undefined>;
    getUserByEmail: (email:Email) => Promise<User | undefined>;
    getUserHash: (id:string) => Promise<Hash>;
}