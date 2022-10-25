export type LicenseDto = {
  id: string;
  name: string;
};
export class License {
  private id: string;
  private name: string;
  constructor(license: LicenseDto) {
    this.id = license.id;
    this.name = license.name;
  }
  get() {
    return {
      id: this.id,
      name: this.name,
    };
  }
  equalTo(license: License) {
    return license.get().id === this.id;
  }
}
