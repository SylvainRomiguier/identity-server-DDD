import { FastifyRequest, FastifyReply } from "fastify";
import { userService, licenseService } from "../../dependency_injections";
import { validLicenseAttribution, validUser, validUserWithPassword } from "../validators";

export async function addUserHandler(req: FastifyRequest, res: FastifyReply) {
    const validatorResponse = validUserWithPassword(
      req.body
    );
    if (validatorResponse.message) {
      res.code(400).send(validatorResponse.message);
      return;
    }
  
    try {
      if (validatorResponse.dto) {
        const user = await userService.create(validatorResponse.dto);
        res.code(200).send(user.get());
      }
    } catch (e) {
      res.code(500).send((e as Error).message);
    }
  }
  
  export async function updateUserHandler(req: FastifyRequest, res: FastifyReply) {
    const validatorResponse = validUser(
      req.body as {
        id:string;
        firstName: string;
        lastName: string;
        email: string;
        userName: string;
        password?: string;
      }
    );
    if (validatorResponse.message) {
      res.code(400).send(validatorResponse.message);
      return;
    }
  
    try {
      if (validatorResponse.dto) {
        const userDto = {
          id: validatorResponse.dto.id,
          firstName: validatorResponse.dto.firstName,
          lastName: validatorResponse.dto.lastName,
          email: validatorResponse.dto.email,
          userName: validatorResponse.dto.userName,
        };
        const password = validatorResponse.dto.password;
        const user = await userService.update(userDto, password);
        res.code(200).send(user.get());
      }
    } catch (e) {
      res.code(500).send((e as Error).message);
    }
  }
  
  export async function assignLicenseHandler(req: FastifyRequest, res: FastifyReply) {
    const validatorResponse = validLicenseAttribution(
      req.body as {
        userId: string;
        licenseId: string;
        expirationDate: string;
        suspended: boolean;
      }
    );
    console.log(req.body);
    if (validatorResponse.message) {
      res.code(400).send(validatorResponse.message);
      return;
    }
  
    try {
      if (validatorResponse.dto) {
        const user = await userService.getUserById(validatorResponse.dto.userId);
        const license = await licenseService.getLicenseById(validatorResponse.dto.licenseId);
         await userService.assignNewLicense(user, license, validatorResponse.dto.expirationDate, validatorResponse.dto.suspended);
        const licenseAttributions = userService.getLicenseAttributionsByUserId(validatorResponse.dto.userId);
        res.code(200).send({
          ...user.get(),
          licenses: (await licenseAttributions).map(la => la.get())
        });
      }
    } catch (e) {
      res.code(500).send((e as Error).message);
    }
  }