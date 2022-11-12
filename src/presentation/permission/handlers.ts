import { FastifyRequest, FastifyReply } from "fastify";
import { licenseService } from "../../dependency_injections";
import { validName } from "../validators";

export async function addPermissionHandler(req: FastifyRequest, res: FastifyReply) {
    const validatorResponse = validName(
      req.body
    );
    if (validatorResponse.message) {
      res.code(400).send(validatorResponse.message);
      return;
    }
  
    try {
      if (validatorResponse.dto) {
        const permission = await licenseService.createPermission(validatorResponse.dto.name);
        res.code(200).send(permission.name);
      }
    } catch (e) {
      res.code(500).send((e as Error).message);
    }
  }