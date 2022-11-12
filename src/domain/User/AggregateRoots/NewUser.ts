import { Hash } from "../ValueObjects/Hash";
import { User, UserDto } from "./User";

export class NewUser extends User {
    private _hash: Hash;
    constructor(user:UserDto, hash: Hash) {
        super(user);
        this._hash = hash;
    }
    get hash() {
        return this._hash.value;
    }
    
}