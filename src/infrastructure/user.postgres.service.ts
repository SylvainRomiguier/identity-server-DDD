import { PrismaClient } from "@prisma/client";
import { IUserService } from "../application/serviceInterfaces/IUserService";
import { Email } from "../domain/Email";
import { Hash } from "../domain/Hash";
import { User } from "../domain/User";

export class UserService implements IUserService {
  async persistUser(user: User, hash?: Hash | undefined) {
    const prisma = new PrismaClient();
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
          ...user.get(),
          password: hash.get().hashedPassword,
          salt: hash?.get().salt,
        },
      });
      await prisma.$disconnect();
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
    await prisma.$disconnect();
    return new User(updatedUser);
  }
  async removeUser(id: string) {
    const prisma = new PrismaClient();
    await prisma.user.delete({ where: { id } });
    await prisma.$disconnect();
  }
  async getUserById(id: string) {
    const prisma = new PrismaClient();
    const user = await prisma.user.findUnique({ where: { id } });
    await prisma.$disconnect();
    if (user) {
      return new User(user);
    }
    return undefined;
  }
  async getUserByEmail(email: Email) {
    const prisma = new PrismaClient();
    const user = await prisma.user.findFirst({ where: { email: email.get() } });
    await prisma.$disconnect();
    if (user) {
      return new User(user);
    }
    return undefined;
  }
  async getUserHash(id: string) {
    const prisma = new PrismaClient();
    const user = await prisma.user.findUnique({ where: { id } });
    await prisma.$disconnect();
    if (user) {
      return new Hash(user.salt, user.password);
    }
    throw new Error(`Trying to find Hash for user ${id} who is unknown.`);
  }
}
