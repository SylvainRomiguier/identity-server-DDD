import { FastifyRequest, FastifyReply } from "fastify";
import { licenseService } from "../../dependency_injections";
import { validName, validIdNamePermissionSetIds, validId } from "../validators";

export async function addLicenseHandler(
  req: FastifyRequest,
  res: FastifyReply
) {
  const validatorResponse = validName(req.body);
  if (validatorResponse.message) {
    res.code(400).send(validatorResponse.message);
    return;
  }

  try {
    if (validatorResponse.dto) {
      const license = await licenseService.create({
        ...validatorResponse.dto,
        PermissionSets: [],
      });
      res.code(200).send(license.get());
    }
  } catch (e) {
    res.code(500).send((e as Error).message);
  }
}

export async function updateLicenseHandler(
  req: FastifyRequest,
  res: FastifyReply
) {
  const validatorResponse = validIdNamePermissionSetIds(req.body);
  if (validatorResponse.message) {
    res.code(400).send(validatorResponse.message);
    return;
  }

  try {
    if (validatorResponse.dto) {
      const license = await licenseService.update({
        id: validatorResponse.dto.id,
        name: validatorResponse.dto.name,
        PermissionSets: validatorResponse.dto.permissionSetIds.map((psi) => ({
          id: psi,
          name: "dummy",
        })),
      });
      res.code(200).send(license.get());
    }
  } catch (e) {
    res.code(500).send((e as Error).message);
  }
}

export async function getLicenseHandler(
  req: FastifyRequest,
  res: FastifyReply
) {
  const validatorResponse = validId(req.query);
  if (validatorResponse.message) {
    res.code(400).send(validatorResponse.message);
    return;
  }

  try {
    if (validatorResponse.dto) {
      const license = await licenseService.getLicenseById(
        validatorResponse.dto.id
      );
      res.code(200).send({
        ...license.get(),
        permissionSets: license.get().permissionSets.map((ps) => ps.get()),
      });
    }
  } catch (e) {
    res.code(500).send((e as Error).message);
  }
}
