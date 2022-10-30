import { Hash } from "../../domain/User/Hash";

export interface IPasswordProvider {
    createPassword: (plainTextPassword:string) => Promise<Hash>;
    verifyPassword: (plainTextPassword:string, hash: Hash) => Promise<boolean>;
}