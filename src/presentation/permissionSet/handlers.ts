import { FastifyRequest, FastifyReply } from "fastify";
import { licenseService } from "../../dependency_injections";
import { validName, validIdName, validPermissionSetIdPermissionName, validId } from "../validators";

export async function addpermissionSetHandler(req: FastifyRequest, res: FastifyReply) {
    const validatorResponse = validName(
      req.body 
    );
    if (validatorResponse.message) {
      res.code(400).send(validatorResponse.message);
      return;
    }
  
    try {
      if (validatorResponse.dto) {
        const permissionSet = await licenseService.createPermissionSet(
          validatorResponse.dto.name
        );
        res.code(200).send(permissionSet.get());
      }
    } catch (e) {
      res.code(500).send((e as Error).message);
    }
  }
  
  export async function updatepermissionSetHandler(
    req: FastifyRequest,
    res: FastifyReply
  ) {
    const validatorResponse = validIdName(
      req.body as {
        id: string;
        name: string;
      }
    );
    if (validatorResponse.message) {
      res.code(400).send(validatorResponse.message);
      return;
    }
  
    try {
      if (validatorResponse.dto) {
        const permissionSet = await licenseService.updatePermissionSet(
          validatorResponse.dto
        );
        res.code(200).send(permissionSet.get());
      }
    } catch (e) {
      res.code(500).send((e as Error).message);
    }
  }
  
  export async function addPermissionToPermissionSetHandler(
    req: FastifyRequest,
    res: FastifyReply
  ) {
    const validatorResponse = validPermissionSetIdPermissionName(
      req.body as {
        permissionSetId: string;
        permissionName: string;
      }
    );
    if (validatorResponse.message) {
      res.code(400).send(validatorResponse.message);
      return;
    }
  
    try {
      if (validatorResponse.dto) {
        await licenseService.addPermissionToPermissionSet(
          validatorResponse.dto.permissionName,
          validatorResponse.dto.permissionSetId
        );
        res.code(200).send("success");
      }
    } catch (e) {
      res.code(500).send((e as Error).message);
    }
  }
  
  export async function getPermissionsFromPermissionSetHandler(
      req: FastifyRequest,
      res: FastifyReply
    ) {
      const validatorResponse = validId(
        req.query 
      );
      if (validatorResponse.message) {
        res.code(400).send(validatorResponse.message);
        return;
      }
    
      try {
        if (validatorResponse.dto) {
          const permissions = await licenseService.getAllPermissionsFromPermissionSetId(
            validatorResponse.dto.id
          );
          res.code(200).send(permissions.map(p=> p.name));
        }
      } catch (e) {
        res.code(500).send((e as Error).message);
      }
    }