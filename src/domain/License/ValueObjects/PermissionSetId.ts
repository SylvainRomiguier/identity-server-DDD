import { ValueObject } from "../../common/models/ValueObject";

export class PermissionSetId extends ValueObject {
    private _value:string;
    constructor(value:string) {
        super();
        this._value = value;
    }
    getEqualityComponents(): (string | number)[] {
        return [this._value]
    }
    get value() {
        return this._value;
    }
   
}