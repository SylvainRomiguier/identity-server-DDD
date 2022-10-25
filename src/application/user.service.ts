import { License } from "../domain/License/License";
import { Hash } from "../domain/User/Hash";
import { NewUser } from "../domain/User/NewUser";
import { Password } from "../domain/User/Password";
import { User, UserDto } from "../domain/User/User";
import { IPasswordService } from "./serviceInterfaces/IPasswordService";
import { ITokenService } from "./serviceInterfaces/ITokenService";
import { IUserRepository } from "./serviceInterfaces/IUserRepository";
import { IUUIDService } from "./serviceInterfaces/IUUIDService";

export class UserService {
  constructor(
    private uuidService: IUUIDService,
    private userRepository: IUserRepository,
    private passwordService: IPasswordService,
    private tokenService: ITokenService
  ) {}
  async create(user: Omit<UserDto, "id"> & { password: string }) {
    const newUser = new NewUser({
      id: this.uuidService.getRandomUUID(),
      hash: await this.passwordService.createPassword(user.password),
      ...user,
    });
    const persistedUser = await this.userRepository.addUser(newUser);
    return persistedUser;
  }
  async update(user: UserDto, plainTextPassword?: string) {
    const userToUpdate = new User(user);
    let hash: Hash | undefined = undefined;
    if (plainTextPassword) {
      hash = await this.passwordService.createPassword(plainTextPassword);
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
  async createPassword(plainTextPassword: string): Promise<Hash> {
    const password = new Password(plainTextPassword);
    return this.passwordService.createPassword(password.get());
  }
  async getAuthenticateUserFromToken(token: string) {
    const userId = this.tokenService.verify(token);
    const user = await this.userRepository.getUserById(userId);
    if (user) {
      return user;
    }
    throw new Error(`User with id ${userId} was not found.`);
  }
  async isPasswordValid(
    user: User,
    plainTextPassword: string
  ): Promise<boolean> {
    const password = new Password(plainTextPassword);
    const hash = await this.userRepository.getUserHash(user.get().id);
    return this.passwordService.verifyPassword(password.get(), hash);
  }
  async assignNewLicense(user:User, license: License, expirationDate:Date, suspended:boolean) {
    const licenseAttribution = await user.assignNewLicense(license, expirationDate, suspended);
    await this.userRepository.saveLicenseAttribution(licenseAttribution);
  }
}
