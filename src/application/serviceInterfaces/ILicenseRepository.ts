import { License } from "../../domain/License/License";
import { Permission } from "../../domain/License/Permission";
import { PermissionSet } from "../../domain/License/PermissionSet";

export interface ILicenseRepository {
    createLicense: (license:License) => Promise<License>;
    updateLicense: (license:License) => Promise<License>;
    createPermissionSet: (permissionSet:PermissionSet) => Promise<PermissionSet>;
    updatePermissionSet: (permissionSet:PermissionSet) => Promise<PermissionSet>;
    createPermission: (permission:Permission) => Promise<Permission>;
    addPermissionToPermissionSet: (permission:Permission, permissionSet: PermissionSet) => Promise<void>;
    removePermissionFromPermissionSet: (permission:Permission, permissionSet: PermissionSet) => Promise<void>;
    getAllPermissionsFromPermissionSet: (permissionSetId:string) => Promise<Permission[]>;
}