import { Hash } from "../../domain/User/Hash";

export interface IPasswordService {
    createPassword: (plainTextPassword:string) => Promise<Hash>;
    verifyPassword: (plainTextPassword:string, hash: Hash) => Promise<boolean>;
}