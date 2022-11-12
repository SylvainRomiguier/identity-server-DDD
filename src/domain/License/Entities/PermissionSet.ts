import { Entity } from "../../common/models/Entity";
import { PermissionSetId } from "../ValueObjects/PermissionSetId";

export type PermissionSetDto = {
  id: string;
  name: string;
};

export class PermissionSet extends Entity<PermissionSetId> {
  private _name: string;
  constructor(permissionSet: PermissionSetDto) {
    super(new PermissionSetId(permissionSet.id));
    this._name = permissionSet.name;
  }

  get() {
    return {
      id: this.id.value,
      name: this._name,
    };
  }

}
