import { License, LicenseDto } from "../domain/License/License";
import { ILicenseRepository } from "./serviceInterfaces/ILicenseRepository"
import { IUUIDService } from "./serviceInterfaces/IUUIDService";

export class LicenseService {
    constructor(private licenseRepository: ILicenseRepository, private uuidService: IUUIDService){}
    async create(license: Omit<LicenseDto, "id">) {
        const newLicense = new License({
            id: this.uuidService.getRandomUUID(),
            name: license.name,
            PermissionSets: []
        });
        const createdLicense = await this.licenseRepository.createLicense(newLicense);
        return createdLicense;
    }
    async update(license: LicenseDto) {
        const licenseToUpdate = new License(license);
        const updatedLicense = await this.licenseRepository.updateLicense(licenseToUpdate);
        return updatedLicense;
    }
}