import { License } from "../../domain/License/License";
import { Permission } from "../../domain/License/Permission";
import { Hash } from "../../domain/User/Hash";
import { LicenseAttribution } from "../../domain/User/LicenseAttribution";
import { User, UserDto } from "../../domain/User/User";

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

  isPasswordValid: (user: User, plainTextPassword: string) => Promise<boolean>;
  assignNewLicense: (
    user: User,
    license: License,
    expirationDate: Date,
    suspended: boolean
  ) => Promise<void>;

   getUserActiveLicenses:(user: User) => Promise<License[]>;

   getUserPermissions:(user: User) => Promise<Permission[]>
}
