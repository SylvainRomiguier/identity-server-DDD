/*
  Warnings:

  - You are about to drop the `LicenseToPermissionSet` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PermissionToPermissionSet` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "LicenseToPermissionSet" DROP CONSTRAINT "LicenseToPermissionSet_licenseId_fkey";

-- DropForeignKey
ALTER TABLE "LicenseToPermissionSet" DROP CONSTRAINT "LicenseToPermissionSet_permissionSetId_fkey";

-- DropForeignKey
ALTER TABLE "PermissionToPermissionSet" DROP CONSTRAINT "PermissionToPermissionSet_permissionName_fkey";

-- DropForeignKey
ALTER TABLE "PermissionToPermissionSet" DROP CONSTRAINT "PermissionToPermissionSet_permissionSetId_fkey";

-- DropTable
DROP TABLE "LicenseToPermissionSet";

-- DropTable
DROP TABLE "PermissionToPermissionSet";
