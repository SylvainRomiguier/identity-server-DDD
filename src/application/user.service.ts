import { License } from "../domain/License/AggregateRoot/License";
import { Email } from "../domain/User/ValueObjects/Email";
import { Hash } from "../domain/User/ValueObjects/Hash";
import { NewUser } from "../domain/User/AggregateRoots/NewUser";
import { Password } from "../domain/User/ValueObjects/Password";
import { User, UserDto } from "../domain/User/AggregateRoots/User";
import { IUserService } from "./applicationInterfaces/IUserService";
import { ILicenseRepository } from "./infrastructureInterfaces/ILicenseRepository";
import { IPasswordProvider } from "./infrastructureInterfaces/IPasswordProvider";
import { IUserRepository } from "./infrastructureInterfaces/IUserRepository";
import { IUUIDProvider } from "./infrastructureInterfaces/IUUIDProvider";

export class UserService implements IUserService {
  constructor(
    private uuidProvider: IUUIDProvider,
    private userRepository: IUserRepository,
    private passwordProvider: IPasswordProvider,
    private licenseRepository: ILicenseRepository
  ) {}
  async create(user: Omit<UserDto, "id"> & { password: string }) {
    const newUser = new NewUser(
      {
        id: this.uuidProvider.getRandomUUID(),
        ...user,
      },
      await this.passwordProvider.createPassword(user.password)
    );
    const persistedUser = await this.userRepository.addUser(newUser);
    return persistedUser;
  }
  async update(user: UserDto, plainTextPassword?: string) {
    const userToUpdate = new User(user);
    let hash: Hash | undefined = undefined;
    if (plainTextPassword) {
      hash = await this.passwordProvider.createPassword(plainTextPassword);
    }
    const updatedUser = await this.userRepository.updateUser(
      userToUpdate,
      hash
    );
    return updatedUser;
  }
  async remove(user: User) {
    await this.userRepository.removeUser(user.get().id);
  }

  async getUserById(id: string) {
    return this.userRepository.getUserById(id);
  }

  async getUserByEmail(email: string) {
    const validEmail = new Email(email);
    return this.userRepository.getUserByEmail(validEmail);
  }

  async getLicenseAttributionsByUserId(userId: string) {
    return this.userRepository.getAllLicenseAttributionsFromUser(userId);
  }

  async createPassword(plainTextPassword: string): Promise<Hash> {
    const password = new Password(plainTextPassword);
    return this.passwordProvider.createPassword(password.value);
  }
  async isPasswordValid(user: User, password: Password): Promise<boolean> {
    const hash = await this.userRepository.getUserHash(user.get().id);
    return this.passwordProvider.verifyPassword(password.value, hash);
  }
  async assignNewLicense(
    user: User,
    license: License,
    expirationDate: Date,
    suspended: boolean
  ) {
    const licenseAttribution = await user.assignNewLicense(
      license,
      expirationDate,
      suspended
    );
    await this.userRepository.saveLicenseAttribution(licenseAttribution);
  }
  async getUserActiveLicenses(user: User) {
    const activeLicenseAttributions =
      await this.userRepository.getActiveLicenseAttributionsFromUser(
        user.get().id
      );
    const activeLicenses = await this.licenseRepository.getLicensesById(
      activeLicenseAttributions.map((ala) => ala.id.value.licenseId)
    );
    return activeLicenses;
  }

  async getUserPermissions(user: User) {
    const activeLicenses = await this.getUserActiveLicenses(user);
    const permissionSetIds = activeLicenses.reduce(
      (allPermissionSetIds: string[], currentLicense) => {
        allPermissionSetIds = allPermissionSetIds.concat(
          currentLicense.get().permissionSets.map((ps) => ps.get().id)
        );
        return allPermissionSetIds;
      },
      []
    );
    const permissions =
      await this.licenseRepository.getAllPermissionsFromPermissionSetIds(
        permissionSetIds
      );
    return permissions;
  }
}
