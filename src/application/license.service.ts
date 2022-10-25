import { License, LicenseDto } from "../domain/License/License";
import { Permission } from "../domain/License/Permission";
import { PermissionSet, PermissionSetDto } from "../domain/License/PermissionSet";
import { ILicenseRepository } from "./serviceInterfaces/ILicenseRepository";
import { IUUIDService } from "./serviceInterfaces/IUUIDService";

export class LicenseService {
  constructor(
    private licenseRepository: ILicenseRepository,
    private uuidService: IUUIDService
  ) {}
  async create(license: Omit<LicenseDto, "id">) {
    const newLicense = new License({
      id: this.uuidService.getRandomUUID(),
      name: license.name,
      PermissionSets: [],
    });
    const createdLicense = await this.licenseRepository.createLicense(
      newLicense
    );
    return createdLicense;
  }
  async update(license: LicenseDto) {
    const licenseToUpdate = new License(license);
    const updatedLicense = await this.licenseRepository.updateLicense(
      licenseToUpdate
    );
    return updatedLicense;
  }

  async getLicenseById(id:string) {
    return this.licenseRepository.getLicenseById(id);
  }

  async createPermission(permissionName: string) {
    const permission = new Permission(permissionName);
    const createdPermission = await this.licenseRepository.createPermission(
      permission
    );
    return createdPermission;
  }

  async createPermissionSet(permissionSetName: string) {
    const permissionSet = new PermissionSet({
      id: this.uuidService.getRandomUUID(),
      name: permissionSetName,
    });
    const createdPermissionSet = await this.licenseRepository.createPermissionSet(permissionSet);
    return createdPermissionSet;
  }

  async updatePermissionSet(permissionSet: PermissionSetDto) {
    const permissionSetToUpdate = new PermissionSet(permissionSet);
    const updatedPermissionSet = await this.licenseRepository.updatePermissionSet(permissionSetToUpdate);
    return updatedPermissionSet;
  }

  async addPermissionToPermissionSet(permissionName:string, permissionSetId:string) {
    const permission = await this.licenseRepository.getPermissionByName(permissionName);
    const permissionSet = await this.licenseRepository.getPermissionSetById(permissionSetId);
    await this.licenseRepository.addPermissionToPermissionSet(permission, permissionSet);
  }

  async getAllPermissionsFromPermissionSetId(permissionSetId: string) {
    const permissions = await this.licenseRepository.getAllPermissionsFromPermissionSet(permissionSetId);
    return permissions;
  }
}
