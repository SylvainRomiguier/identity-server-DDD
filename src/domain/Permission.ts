export class Permission {
  private name: string;
  constructor(permissionName: string) {
    this.name = permissionName;
  }
  get() {
    return this.name;
  }
  equalTo(permission: Permission) {
    return permission.get() === this.name;
  }
}
