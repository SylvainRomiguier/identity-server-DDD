import { ValueObject } from "../../common/models/ValueObject";

export class Permission extends ValueObject {
  private _name: string;
  constructor(permissionName: string) {
    super();
    this._name = permissionName;
  }
  get name() {
    return this._name;
  }
  getEqualityComponents(): (string | number)[] {
    return [this._name]
  }
}
