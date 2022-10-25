import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { licenseService } from "../../dependency_injections";

export default function (server: FastifyInstance, opts: any, done: () => void) {
  server.post("/permissionSet", {
    schema: {
      description: "Add a permission set",
      tags: ["permission set"],
      body: {
        name: { type: "string" },
      },
      response: {
        200: {
          type: "object",
          properties: {
            id: { type: "string" },
            name: { type: "string" },
          },
        },
      },
      security: [
        {
          apiKey: [],
        },
      ],
    },
    handler: addpermissionSetHandler,
  });
  server.put("/permissionSet", {
    schema: {
      description: "Update a permissionSet",
      tags: ["permission set"],
      body: {
        id: { type: "string" },
        name: { type: "string" },
      },
      response: {
        200: {
          type: "object",
          properties: {
            id: { type: "string" },
            name: { type: "string" },
          },
        },
      },
      security: [
        {
          apiKey: [],
        },
      ],
    },
    handler: updatepermissionSetHandler,
  });
  server.put("/permissionSet/addPermission", {
    schema: {
      description: "Add a permission to permission set",
      tags: ["permission set"],
      body: {
        permissionSetId: { type: "string" },
        permissionName: { type: "string" },
      },
      response: {
        200: {
          type: "string"
        },
      },
      security: [
        {
          apiKey: [],
        },
      ],
    },
    handler: addPermissionToPermissionSetHandler,
  });
  server.get("/permissionSet/allPermissions", {
    schema: {
      description: "Get all permissions from a permissionSet",
      tags: ["permission set"],
      querystring: {
        id: { type: "string" },
      },
      response: {
        200: {
          type: "array",
          items: {
            name: { type: "string" },
          },
        },
      },
      security: [
        {
          apiKey: [],
        },
      ],
    },
    handler: getPermissionsFromPermissionSetHandler,
  });
  done();
}

async function addpermissionSetHandler(req: FastifyRequest, res: FastifyReply) {
  const validatorResponse = validAddpermissionSetDto(
    req.body as {
      name: string;
    }
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

async function updatepermissionSetHandler(
  req: FastifyRequest,
  res: FastifyReply
) {
  const validatorResponse = validUpdatepermissionSetDto(
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

async function addPermissionToPermissionSetHandler(
  req: FastifyRequest,
  res: FastifyReply
) {
  const validatorResponse = validAddPermissionToPermissionSetDto(
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

async function getPermissionsFromPermissionSetHandler(
    req: FastifyRequest,
    res: FastifyReply
  ) {
    const validatorResponse = validGetPermissionsFromPermissionSetDto(
      req.query as {
        id: string;
      }
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
        res.code(200).send(permissions.map(p=> p.get()));
      }
    } catch (e) {
      res.code(500).send((e as Error).message);
    }
  }

function validAddpermissionSetDto(body: { name: string }) {
  if (!body.name) {
    return {
      message: "name is mandatory.",
    };
  }
  return {
    dto: {
      name: body.name,
    },
  };
}

function validGetPermissionsFromPermissionSetDto(query: { id: string }) {
    if (!query.id) {
      return {
        message: "permission set id is mandatory.",
      };
    }
    return {
      dto: {
        id: query.id,
      },
    };
  }

function validUpdatepermissionSetDto(body: { id: string; name: string }) {
  if (!body.id || !body.name) {
    return {
      message: "id and name are mandatory.",
    };
  }
  return {
    dto: {
      id: body.id,
      name: body.name,
    },
  };
}

function validAddPermissionToPermissionSetDto(body: {
  permissionSetId: string;
  permissionName: string;
}) {
  if (!body.permissionSetId || !body.permissionName) {
    return {
      message: "permission set id and permission name are mandatory.",
    };
  }
  return {
    dto: {
      permissionSetId: body.permissionSetId,
      permissionName: body.permissionName,
    },
  };
}
