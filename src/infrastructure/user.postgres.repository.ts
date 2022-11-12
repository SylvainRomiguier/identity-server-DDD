import { IUserRepository } from "../application/infrastructureInterfaces/IUserRepository";
import { LicenseAttribution } from "../domain/User/Entities/LicenseAttribution";
import { Email } from "../domain/User/ValueObjects/Email";
import { Hash } from "../domain/User/ValueObjects/Hash";
import { NewUser } from "../domain/User/AggregateRoots/NewUser";
import { User } from "../domain/User/AggregateRoots/User";
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
    await prisma.licenseAttribution.create({ data: {
      userId: licenseAttribution.id.value.userId,
      licenseId: licenseAttribution.id.value.licenseId,
      expirationDate: licenseAttribution.get().expirationDate,
      suspended: licenseAttribution.get().suspended
    } });
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
        password: user.hash.hashedPassword,
        salt: user.hash.salt,
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
        password: hash?.value.hashedPassword,
        salt: hash?.value.salt,
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
      where: { email: email.value },
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
