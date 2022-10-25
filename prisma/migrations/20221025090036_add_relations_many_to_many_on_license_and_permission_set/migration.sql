-- CreateTable
CREATE TABLE "LicenseToPermissionSet" (
    "licenseId" UUID NOT NULL,
    "permissionSetId" UUID NOT NULL,

    CONSTRAINT "LicenseToPermissionSet_pkey" PRIMARY KEY ("licenseId","permissionSetId")
);

-- CreateTable
CREATE TABLE "PermissionToPermissionSet" (
    "permissionName" VARCHAR(255) NOT NULL,
    "permissionSetId" UUID NOT NULL,

    CONSTRAINT "PermissionToPermissionSet_pkey" PRIMARY KEY ("permissionName","permissionSetId")
);

-- AddForeignKey
ALTER TABLE "LicenseToPermissionSet" ADD CONSTRAINT "LicenseToPermissionSet_licenseId_fkey" FOREIGN KEY ("licenseId") REFERENCES "License"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LicenseToPermissionSet" ADD CONSTRAINT "LicenseToPermissionSet_permissionSetId_fkey" FOREIGN KEY ("permissionSetId") REFERENCES "PermissionSet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PermissionToPermissionSet" ADD CONSTRAINT "PermissionToPermissionSet_permissionName_fkey" FOREIGN KEY ("permissionName") REFERENCES "Permission"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PermissionToPermissionSet" ADD CONSTRAINT "PermissionToPermissionSet_permissionSetId_fkey" FOREIGN KEY ("permissionSetId") REFERENCES "PermissionSet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
