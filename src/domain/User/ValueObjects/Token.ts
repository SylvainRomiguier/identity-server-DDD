import { ValueObject } from "../../common/models/ValueObject";

export class Token extends ValueObject {
    private _value:string;
    constructor(value: string) {
        super();
        this._value = value;
    }
    get value() {
        return this._value;
    }
    getEqualityComponents(): (string | number)[] {
        return [this._value];
    }
}