export type PermissionSetDto = {
  id: string;
  name: string;
};

export class PermissionSet {
  private id: string;
  private name: string;
  constructor(permissionSet: PermissionSetDto) {
    this.id = permissionSet.id;
    this.name = permissionSet.name;
  }

  get() {
    return {
      id: this.id,
      name: this.name,
    };
  }

  equalTo(permissionSet: PermissionSet) {
    return permissionSet.get().id === this.id;
  }
}
