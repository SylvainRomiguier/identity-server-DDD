import { Entity } from "../../common/models/Entity";
import { LicenseId } from "../../License/ValueObjects/LicenseId";
import { LicenseAttributionId } from "../ValueObjects/LicenseAttributionId";
import { UserId } from "../ValueObjects/UserId";

export type LicenseAttributionDto = {
  userId: string;
  licenseId: string;
  expirationDate: Date;
  suspended: boolean;
};

export class LicenseAttribution extends Entity<LicenseAttributionId> {
  private expirationDate: Date;
  private suspended: boolean;
  constructor(licenseAttribution: LicenseAttributionDto) {
    super(new LicenseAttributionId(new UserId(licenseAttribution.userId), new LicenseId(licenseAttribution.licenseId)));
    this.expirationDate = licenseAttribution.expirationDate;
    this.suspended = licenseAttribution.suspended;
  }
  get() {
    return {
      expirationDate: this.expirationDate,
      suspended: this.suspended,
    };
  }
}
