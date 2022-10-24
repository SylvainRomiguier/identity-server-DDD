-- CreateTable
CREATE TABLE "Permission" (
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "Permission_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "PermissionSet" (
    "id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "PermissionSet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "License" (
    "id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "License_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ArchivedLicenseAttribution" (
    "expirationDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "suspended" BOOLEAN NOT NULL DEFAULT false,
    "licenseId" UUID NOT NULL,
    "userId" UUID NOT NULL,

    CONSTRAINT "ArchivedLicenseAttribution_pkey" PRIMARY KEY ("userId","licenseId","expirationDate")
);

-- CreateTable
CREATE TABLE "LicenseAttribution" (
    "expirationDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "suspended" BOOLEAN NOT NULL DEFAULT false,
    "licenseId" UUID NOT NULL,
    "userId" UUID NOT NULL,

    CONSTRAINT "LicenseAttribution_pkey" PRIMARY KEY ("userId","licenseId")
);

-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "firstName" VARCHAR(255) NOT NULL,
    "lastName" VARCHAR(255) NOT NULL,
    "userName" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "salt" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PermissionToPermissionSet" (
    "A" VARCHAR(255) NOT NULL,
    "B" UUID NOT NULL
);

-- CreateTable
CREATE TABLE "_LicenseToPermissionSet" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "PermissionSet_name_key" ON "PermissionSet"("name");

-- CreateIndex
CREATE UNIQUE INDEX "License_name_key" ON "License"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_PermissionToPermissionSet_AB_unique" ON "_PermissionToPermissionSet"("A", "B");

-- CreateIndex
CREATE INDEX "_PermissionToPermissionSet_B_index" ON "_PermissionToPermissionSet"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_LicenseToPermissionSet_AB_unique" ON "_LicenseToPermissionSet"("A", "B");

-- CreateIndex
CREATE INDEX "_LicenseToPermissionSet_B_index" ON "_LicenseToPermissionSet"("B");

-- AddForeignKey
ALTER TABLE "ArchivedLicenseAttribution" ADD CONSTRAINT "ArchivedLicenseAttribution_licenseId_fkey" FOREIGN KEY ("licenseId") REFERENCES "License"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArchivedLicenseAttribution" ADD CONSTRAINT "ArchivedLicenseAttribution_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LicenseAttribution" ADD CONSTRAINT "LicenseAttribution_licenseId_fkey" FOREIGN KEY ("licenseId") REFERENCES "License"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LicenseAttribution" ADD CONSTRAINT "LicenseAttribution_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PermissionToPermissionSet" ADD CONSTRAINT "_PermissionToPermissionSet_A_fkey" FOREIGN KEY ("A") REFERENCES "Permission"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PermissionToPermissionSet" ADD CONSTRAINT "_PermissionToPermissionSet_B_fkey" FOREIGN KEY ("B") REFERENCES "PermissionSet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LicenseToPermissionSet" ADD CONSTRAINT "_LicenseToPermissionSet_A_fkey" FOREIGN KEY ("A") REFERENCES "License"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LicenseToPermissionSet" ADD CONSTRAINT "_LicenseToPermissionSet_B_fkey" FOREIGN KEY ("B") REFERENCES "PermissionSet"("id") ON DELETE CASCADE ON UPDATE CASCADE;
