import { AggregateRoot } from "../../common/models/AggregateRoot";
import { PermissionSet, PermissionSetDto } from "../Entities/PermissionSet";
import { LicenseId } from "../ValueObjects/LicenseId";

export type LicenseDto = {
  id: string;
  name: string;
  PermissionSets: PermissionSetDto[];
};
export class License extends AggregateRoot<LicenseId> {
  private name: string;
  private permissionSets: PermissionSet[];
  constructor(license: LicenseDto) {
    super(new LicenseId(license.id));
    this.name = license.name;
    this.permissionSets = license.PermissionSets.map(ps => new PermissionSet(ps));
  }
  get() {
    return {
      id: this.id.value,
      name: this.name,
      permissionSets: this.permissionSets
    };
  }
  assignPermissionSet(permissionSet:PermissionSet) {
    if(!this.permissionSets.find(ps => ps.equals(permissionSet))) {
      this.permissionSets.push(permissionSet);
    }
  }
  removePermissionSet(permissionSet:PermissionSet) {
    this.permissionSets = this.permissionSets.filter(ps => !ps.equals(permissionSet));
  }
}
