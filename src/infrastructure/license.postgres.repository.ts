import { ILicenseRepository } from "../application/infrastructureInterfaces/ILicenseRepository";
import { License } from "../domain/License/AggregateRoot/License";
import { Permission } from "../domain/License/ValueObjects/Permission";
import { PermissionSet } from "../domain/License/Entities/PermissionSet";
import { DBService } from "./db.prisma.service";

export class LicenseRepository implements ILicenseRepository {
  constructor(private dbService: DBService) {}
  async getAllPermissionsFromPermissionSetIds(ids: string[]) {
    const prisma = await this.dbService.getClient();
    const permissionSets = await prisma.permissionSet.findMany({
      where: {
        id: { in: ids },
      },
      include: {
        Permissions: true
      }
    });
    await this.dbService.disconnect();
    const permissions: string[] = permissionSets.reduce((allPermissions:string[], currentPermissionSet) => {
      allPermissions = allPermissions.concat(currentPermissionSet.Permissions.map(p => p.name))
      return allPermissions;
    }, []);
    const uniquePermissions:string[] = [...new Set(permissions)];
    return uniquePermissions.map(up => new Permission(up));
  }
  async getLicensesById(ids: string[]) {
    const prisma = await this.dbService.getClient();
    const licenses = await prisma.license.findMany({
      where: {
        id: { in: ids },
      },
      include: {
        PermissionSets: true,
      },
    });
    await this.dbService.disconnect();
    return licenses.map((l) => new License(l));
  }
  async getPermissionSetById(id: string) {
    const prisma = await this.dbService.getClient();
    const permissionSet = await prisma.permissionSet.findUniqueOrThrow({
      where: { id },
    });
    await this.dbService.disconnect();
    return new PermissionSet(permissionSet);
  }
  async getPermissionByName(name: string) {
    const prisma = await this.dbService.getClient();
    const permission = await prisma.permission.findUniqueOrThrow({
      where: { name },
    });
    await this.dbService.disconnect();
    return new Permission(permission.name);
  }
  async getLicenseById(id: string) {
    const prisma = await this.dbService.getClient();
    const license = await prisma.license.findUniqueOrThrow({
      where: { id },
      include: {
        PermissionSets: true,
      },
    });
    await this.dbService.disconnect();
    return new License(license);
  }

  async getAllPermissionsFromPermissionSetId(permissionSetId: string) {
    const prisma = await this.dbService.getClient();
    const permissionSet = await prisma.permissionSet.findUnique({
      where: { id: permissionSetId },
      include: { Permissions: true },
    });
    await this.dbService.disconnect();
    return permissionSet?.Permissions.map((p) => new Permission(p.name)) ?? [];
  }
  async createPermissionSet(permissionSet: PermissionSet) {
    const prisma = await this.dbService.getClient();
    const createdPermissionSet = await prisma.permissionSet.create({
      data: permissionSet.get(),
    });
    await this.dbService.disconnect();
    return new PermissionSet(createdPermissionSet);
  }
  async updatePermissionSet(permissionSet: PermissionSet) {
    const prisma = await this.dbService.getClient();
    const createdPermissionSet = await prisma.permissionSet.update({
      where: { id: permissionSet.get().id },
      data: { name: permissionSet.get().name },
    });
    await this.dbService.disconnect();
    return new PermissionSet(createdPermissionSet);
  }
  async addPermissionToPermissionSet(
    permission: Permission,
    permissionSet: PermissionSet
  ) {
    const prisma = await this.dbService.getClient();
    await prisma.permissionSet.update({
      where: { id: permissionSet.get().id },
      data: {
        Permissions: {
          connect: [{ name: permission.name }],
        },
      },
    });

    await this.dbService.disconnect();
  }
  async removePermissionFromPermissionSet(
    permission: Permission,
    permissionSet: PermissionSet
  ) {
    const prisma = await this.dbService.getClient();
    await prisma.permissionSet.update({
      where: { id: permissionSet.get().id },
      data: {
        Permissions: {
          disconnect: [{ name: permission.name }],
        },
      },
    });
    await this.dbService.disconnect();
  }
  async createPermission(permission: Permission) {
    const prisma = await this.dbService.getClient();
    const createdPermission = await prisma.permission.create({
      data: { name: permission.name },
    });
    await this.dbService.disconnect();
    return new Permission(createdPermission.name);
  }
  async createLicense(license: License) {
    const prisma = await this.dbService.getClient();
    const createdLicense = await prisma.license.create({
      data: {
        id: license.get().id,
        name: license.get().name,
      },
      include: {
        PermissionSets: true,
      },
    });
    await this.dbService.disconnect();
    return new License(createdLicense);
  }
  async updateLicense(license: License) {
    const prisma = await this.dbService.getClient();
    const updatedLicense = await prisma.license.update({
      where: { id: license.get().id },
      data: {
        name: license.get().name,
        PermissionSets: {
          set: license.get().permissionSets.map((ps) => ({
            id: ps.get().id,
          })),
        },
      },
      include: {
        PermissionSets: true,
      },
    });
    await this.dbService.disconnect();
    return new License(updatedLicense);
  }
}
