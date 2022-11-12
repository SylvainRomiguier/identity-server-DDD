import { LicenseAttribution } from "../../domain/User/Entities/LicenseAttribution";
import { Email } from "../../domain/User/ValueObjects/Email";
import { Hash } from "../../domain/User/ValueObjects/Hash";
import { NewUser } from "../../domain/User/AggregateRoots/NewUser";
import { User } from "../../domain/User/AggregateRoots/User";

export interface IUserRepository {
    addUser: (user:NewUser) => Promise<User>;
    updateUser: (user:User, hash?:Hash) => Promise<User>;
    removeUser: (id:string) => Promise<void>;
    getUserById: (id:string) => Promise<User>;
    getUserByEmail: (email:Email) => Promise<User>;
    getUserHash: (id:string) => Promise<Hash>;
    saveLicenseAttribution: (licenseAttribution: LicenseAttribution) => Promise<void>;
    getAllLicenseAttributionsFromUser: (userId:string) => Promise<LicenseAttribution[]>;
    getActiveLicenseAttributionsFromUser: (userId:string) => Promise<LicenseAttribution[]>;
}