import { License } from "../../License/AggregateRoot/License";
import { Email } from "../ValueObjects/Email";
import { UserId } from "../ValueObjects/UserId";
import { AggregateRoot } from "../../common/models/AggregateRoot";
import { LicenseAttribution } from "../Entities/LicenseAttribution";

export type UserDto = {
  id: string;
  lastName: string;
  firstName: string;
  email: string;
  userName: string;
};

export class User extends AggregateRoot<UserId> {
  protected lastName: string;
  protected firstName: string;
  protected email: Email;
  protected userName: string;
  constructor(user: UserDto) {
    super(new UserId(user.id));
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.userName = user.userName;
    this.email = new Email(user.email);
  }

  get() {
    return {
      id: this.id.value,
      firstName: this.firstName,
      lastName: this.lastName,
      userName: this.userName,
      fullName: `${this.firstName} ${this.lastName}`,
      email: this.email.value,
    };
  }

  async assignNewLicense(
    license: License,
    expirationDate: Date,
    suspended: boolean
  ): Promise<LicenseAttribution> {
    return new LicenseAttribution({
      userId: this.id.value,
      licenseId: license.get().id,
      expirationDate,
      suspended,
    });
  }
}
