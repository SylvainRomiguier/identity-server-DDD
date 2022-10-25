import { LicenseAttributionDto } from "./LicenseAttribution";

export class ArchivedLicenseAttribution {
  private userId: string;
  private licenseId: string;
  private expirationDate: Date;
  private suspended: boolean;
  constructor(licenseAttribution: LicenseAttributionDto) {
    this.userId = licenseAttribution.userId;
    this.licenseId = licenseAttribution.licenseId;
    this.expirationDate = licenseAttribution.expirationDate;
    this.suspended = licenseAttribution.suspended;
  }
  get() {
    return {
      userId: this.userId,
      licenseId: this.licenseId,
      expirationDate: this.expirationDate,
      suspended: this.suspended,
    };
  }

  equalTo(licenseAttribution: ArchivedLicenseAttribution) {
    return (
      licenseAttribution.userId === this.userId &&
      licenseAttribution.licenseId === this.licenseId &&
      licenseAttribution.expirationDate === this.expirationDate
    );
  }
}
