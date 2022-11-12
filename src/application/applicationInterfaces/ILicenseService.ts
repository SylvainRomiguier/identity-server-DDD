import { License, LicenseDto } from "../../domain/License/AggregateRoot/License";
import { PermissionSet, PermissionSetDto } from "../../domain/License/Entities/PermissionSet";
import { Permission } from "../../domain/License/ValueObjects/Permission";

export interface ILicenseService {
  create: (license: Omit<LicenseDto, "id">) => Promise<License>;
  update: (license: LicenseDto) => Promise<License>;
  getLicenseById: (id: string) => Promise<License>;
  createPermission: (permissionName: string) => Promise<Permission>;
  createPermissionSet: (permissionSetName: string) => Promise<PermissionSet>;
  updatePermissionSet: (
    permissionSet: PermissionSetDto
  ) => Promise<PermissionSet>;
  addPermissionToPermissionSet: (
    permissionName: string,
    permissionSetId: string
  ) => Promise<void>;
  getAllPermissionsFromPermissionSetId: (
    permissionSetId: string
  ) => Promise<Permission[]>;
}
