import { Hash } from "../../domain/User/ValueObjects/Hash";

export interface IPasswordProvider {
    createPassword: (plainTextPassword:string) => Promise<Hash>;
    verifyPassword: (plainTextPassword:string, hash: Hash) => Promise<boolean>;
}