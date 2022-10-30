import { IUserRepository } from "../application/infrastructureInterfaces/IUserRepository";
import { LicenseAttribution } from "../domain/User/LicenseAttribution";
import { Email } from "../domain/User/Email";
import { Hash } from "../domain/User/Hash";
import { NewUser } from "../domain/User/NewUser";
import { User } from "../domain/User/User";
import { DBService } from "./db.prisma.service";

export class UserRepository implements IUserRepository {
  constructor(private dbService: DBService) {}
  async getAllLicenseAttributionsFromUser(userId: string) {
    const prisma = await this.dbService.getClient();
    const licensesAttributions = await prisma.licenseAttribution.findMany({
      where: { userId },
    });
    await this.dbService.disconnect();
    return licensesAttributions.map((la) => new LicenseAttribution(la));
  }
  async getActiveLicenseAttributionsFromUser(userId: string) {
    const prisma = await this.dbService.getClient();
    const licensesAttributions = await prisma.licenseAttribution.findMany({
      where: {
        userId,
        expirationDate: {
          gte: new Date(new Date().getUTCDate()),
        },
        suspended: false,
      },
    });
    await this.dbService.disconnect();
    return licensesAttributions.map((la) => new LicenseAttribution(la));
  }
  async saveLicenseAttribution(licenseAttribution: LicenseAttribution) {
    const prisma = await this.dbService.getClient();
    await prisma.licenseAttribution.create({ data: licenseAttribution.get() });
    await this.dbService.disconnect();
  }
  async addUser(user: NewUser) {
    const prisma = await this.dbService.getClient();
    const newUser = await prisma.user.create({
      data: {
        id: user.get().id,
        firstName: user.get().firstName,
        lastName: user.get().lastName,
        userName: user.get().userName,
        email: user.get().email,
        password: user.get().hash.get().hashedPassword,
        salt: user.get().hash.get().salt,
      },
    });
    await this.dbService.disconnect();
    return new User(newUser);
  }
  async updateUser(user: User, hash?: Hash | undefined) {
    const prisma = await this.dbService.getClient();
    const updatedUser = await prisma.user.update({
      where: { id: user.get().id },
      data: {
        firstName: user.get().firstName,
        lastName: user.get().lastName,
        userName: user.get().userName,
        email: user.get().email,
        password: hash?.get().hashedPassword,
        salt: hash?.get().salt,
      },
    });
    await this.dbService.disconnect();
    return new User(updatedUser);
  }
  async removeUser(id: string) {
    const prisma = await this.dbService.getClient();
    await prisma.user.delete({ where: { id } });
    await this.dbService.disconnect();
  }
  async getUserById(id: string) {
    const prisma = await this.dbService.getClient();
    const user = await prisma.user.findUniqueOrThrow({ where: { id } });
    await this.dbService.disconnect();
    return new User(user);
  }
  async getUserByEmail(email: Email) {
    const prisma = await this.dbService.getClient();
    const user = await prisma.user.findFirstOrThrow({
      where: { email: email.get() },
    });
    await this.dbService.disconnect();
    return new User(user);
  }
  async getUserHash(id: string) {
    const prisma = await this.dbService.getClient();
    const user = await prisma.user.findUnique({ where: { id } });
    await this.dbService.disconnect();
    if (user) {
      return new Hash(user.salt, user.password);
    }
    throw new Error(`Trying to find Hash for user ${id} who is unknown.`);
  }
}
