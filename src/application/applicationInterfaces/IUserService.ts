import { License } from "../../domain/License/AggregateRoot/License";
import { Permission } from "../../domain/License/ValueObjects/Permission";
import { Hash } from "../../domain/User/ValueObjects/Hash";
import { LicenseAttribution } from "../../domain/User/Entities/LicenseAttribution";
import { Password } from "../../domain/User/ValueObjects/Password";
import { User, UserDto } from "../../domain/User/AggregateRoots/User";

export interface IUserService {
  create: (user: Omit<UserDto, "id"> & { password: string }) => Promise<User>;
  update: (user: UserDto, plainTextPassword?: string) => Promise<User>;
  remove: (user: User) => Promise<void>;

  getUserById: (id: string) => Promise<User>;

  getUserByEmail: (email: string) => Promise<User>;

  getLicenseAttributionsByUserId: (
    userId: string
  ) => Promise<LicenseAttribution[]>;

  createPassword: (plainTextPassword: string) => Promise<Hash>;

  isPasswordValid: (user: User, password:Password) => Promise<boolean>;
  assignNewLicense: (
    user: User,
    license: License,
    expirationDate: Date,
    suspended: boolean
  ) => Promise<void>;

   getUserActiveLicenses:(user: User) => Promise<License[]>;

   getUserPermissions:(user: User) => Promise<Permission[]>
}
