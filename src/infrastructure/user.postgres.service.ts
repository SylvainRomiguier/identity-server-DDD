import { IUserService } from "../application/serviceInterfaces/IUserService";
import { Email } from "../domain/Email";
import { Hash } from "../domain/Hash";
import { User } from "../domain/User";
import { DBService } from "./db.prisma.service";

export class UserService implements IUserService {
  constructor(private dbService: DBService) {}
  async persistUser(user: User, hash?: Hash | undefined) {
    const prisma = await this.dbService.getClient();
    const existingUser = await prisma.user.findUnique({
      where: { id: user.get().id },
    });
    if (!existingUser) {
      if (!hash) {
        throw new Error(
          `A hash is mandatory to create a new user, user ${user.get().id}.`
        );
      }
      const newUser = await prisma.user.create({
        data: {
          id: user.get().id,
          firstName: user.get().firstName,
          lastName: user.get().lastName,
          userName: user.get().userName,
          email: user.get().email,
          password: hash.get().hashedPassword,
          salt: hash?.get().salt,
        },
      });
      await this.dbService.disconnect();
      return new User(newUser);
    }

    let newValues = {
      ...user.get(),
      password: hash?.get().hashedPassword,
      salt: hash?.get().salt,
    };
    const updatedUser = await prisma.user.update({
      where: { id: user.get().id },
      data: newValues,
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
    const user = await prisma.user.findUnique({ where: { id } });
    await this.dbService.disconnect();
    if (user) {
      return new User(user);
    }
    return undefined;
  }
  async getUserByEmail(email: Email) {
    const prisma = await this.dbService.getClient();
    const user = await prisma.user.findFirst({ where: { email: email.get() } });
    await this.dbService.disconnect();
    if (user) {
      return new User(user);
    }
    return undefined;
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
