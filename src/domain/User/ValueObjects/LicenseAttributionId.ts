import { ValueObject } from "../../common/models/ValueObject";
import { LicenseId } from "../../License/ValueObjects/LicenseId";
import { UserId } from "./UserId";

export class LicenseAttributionId extends ValueObject {
  private _userId: UserId;
  private _licenseId: LicenseId;
  constructor(userId:UserId, licenseId:LicenseId) {
    super();
    this._userId = userId;
    this._licenseId = licenseId;
  }
  get value() {
    return {
        userId: this._userId.value,
        licenseId: this._licenseId.value
    }
  }
  getEqualityComponents(): (string | number)[] {
    return [this._userId.value, this._licenseId.value];
  }
}
