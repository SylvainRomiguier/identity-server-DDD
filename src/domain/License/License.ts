import { PermissionSet, PermissionSetDto } from "./PermissionSet";

export type LicenseDto = {
  id: string;
  name: string;
  PermissionSets: PermissionSetDto[];
};
export class License {
  private id: string;
  private name: string;
  private permissionSets: PermissionSet[];
  constructor(license: LicenseDto) {
    this.id = license.id;
    this.name = license.name;
    this.permissionSets = license.PermissionSets.map(ps => new PermissionSet(ps));
  }
  get() {
    return {
      id: this.id,
      name: this.name,
      permissionSets: this.permissionSets
    };
  }
  equalTo(license: License) {
    return license.get().id === this.id;
  }
  assignPermissionSet(permissionSet:PermissionSet) {
    if(!this.permissionSets.find(ps => ps.equalTo(permissionSet))) {
      this.permissionSets.push(permissionSet);
    }
  }
  removePermissionSet(permissionSet:PermissionSet) {
    this.permissionSets = this.permissionSets.filter(ps => !ps.equalTo(permissionSet));
  }
}
