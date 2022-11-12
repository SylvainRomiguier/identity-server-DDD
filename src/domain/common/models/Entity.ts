import { ValueObject } from "./ValueObject";

export abstract class Entity<TId> {
    private _id: TId;
    protected constructor(id:TId) {
        this._id = id;
    }
    get id() {
        return this._id;
    }
    equals(obj?:object): boolean {
        return obj instanceof Entity<TId> && (this.id as ValueObject).equals(obj.id);
    }
}