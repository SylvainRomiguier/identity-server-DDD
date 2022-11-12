import { License } from "../../domain/License/AggregateRoot/License";
import { Permission } from "../../domain/License/ValueObjects/Permission";
import { PermissionSet } from "../../domain/License/Entities/PermissionSet";

export interface ILicenseRepository {
    createLicense: (license:License) => Promise<License>;
    updateLicense: (license:License) => Promise<License>;
    getLicenseById: (id:string) => Promise<License>;
    createPermissionSet: (permissionSet:PermissionSet) => Promise<PermissionSet>;
    updatePermissionSet: (permissionSet:PermissionSet) => Promise<PermissionSet>;
    getPermissionSetById: (id:string) => Promise<PermissionSet>;
    createPermission: (permission:Permission) => Promise<Permission>;
    getPermissionByName: (name:string) => Promise<Permission>;
    addPermissionToPermissionSet: (permission:Permission, permissionSet: PermissionSet) => Promise<void>;
    removePermissionFromPermissionSet: (permission:Permission, permissionSet: PermissionSet) => Promise<void>;
    getAllPermissionsFromPermissionSetId: (permissionSetId:string) => Promise<Permission[]>;
    getLicensesById: (ids:string[]) => Promise<License[]>;
    getAllPermissionsFromPermissionSetIds: (ids:string[]) => Promise<Permission[]>;
}