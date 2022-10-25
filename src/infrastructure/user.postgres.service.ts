import { IUserService } from "../domain/serviceInterfaces/IUserService";
import { Email } from "../domain/User/Email";
import { Hash } from "../domain/User/Hash";
import { NewUser } from "../domain/User/NewUser";
import { User } from "../domain/User/User";
import { DBService } from "./db.prisma.service";

export class UserService implements IUserService {
  constructor(private dbService: DBService) {}
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
