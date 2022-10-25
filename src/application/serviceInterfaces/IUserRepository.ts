import { LicenseAttribution } from "../../domain/User/LicenseAttribution";
import { Email } from "../../domain/User/Email";
import { Hash } from "../../domain/User/Hash";
import { NewUser } from "../../domain/User/NewUser";
import { User } from "../../domain/User/User";

export interface IUserRepository {
    addUser: (user:NewUser) => Promise<User>;
    updateUser: (user:User, hash?:Hash) => Promise<User>;
    removeUser: (id:string) => Promise<void>;
    getUserById: (id:string) => Promise<User | undefined>;
    getUserByEmail: (email:Email) => Promise<User | undefined>;
    getUserHash: (id:string) => Promise<Hash>;
    saveLicenseAttribution: (licenseAttribution: LicenseAttribution) => Promise<void>;
    getAllLicenseAttributionsFromUser: (userId:string) => Promise<LicenseAttribution[]>;
}