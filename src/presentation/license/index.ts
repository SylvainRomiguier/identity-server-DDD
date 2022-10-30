import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { licenseService } from "../../dependency_injections";

export default function (server: FastifyInstance, opts: any, done: () => void) {
  server.post("/license", {
    schema: {
      description: "Add a license",
      tags: ["license"],
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
    handler: addLicenseHandler,
  });
  server.put("/license", {
    schema: {
      description: "Update a license",
      tags: ["license"],
      body: {
        id: { type: "string" },
        name: { type: "string" },
        permissionSetIds: {
          type: "array",
          items: {
            type: "string",
          },
        },
      },
      response: {
        200: {
          type: "object",
          properties: {
            id: { type: "string" },
            name: { type: "string" },
            permissionSets: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id: { type: "string" },
                  name: { type: "string" },
                },
              },
            },
          },
        },
      },
      security: [
        {
          apiKey: [],
        },
      ],
    },
    handler: updateLicenseHandler,
  });
  server.get("/license", {
    schema: {
      description: "Update a license",
      tags: ["license"],
      querystring: {
        id: { type: "string" },
      },
      response: {
        200: {
          type: "object",
          properties: {
            id: { type: "string" },
            name: { type: "string" },
            permissionSets: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id: { type: "string" },
                  name: { type: "string" },
                },
              },
            },
          },
        },
      },
      security: [
        {
          apiKey: [],
        },
      ],
    },
    handler: getLicenseHandler,
  });
  done();
}

async function addLicenseHandler(req: FastifyRequest, res: FastifyReply) {
  const validatorResponse = validAddLicenseDto(
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

async function updateLicenseHandler(req: FastifyRequest, res: FastifyReply) {
  const validatorResponse = validUpdateLicenseDto(
    req.body as {
      id: string;
      name: string;
      permissionSetIds: string[];
    }
  );
  if (validatorResponse.message) {
    res.code(400).send(validatorResponse.message);
    return;
  }

  try {
    if (validatorResponse.dto) {
      const license = await licenseService.update({
        id: validatorResponse.dto.id,
        name: validatorResponse.dto.name,
        PermissionSets: validatorResponse.dto.permissionSetIds.map(psi => ({
            id: psi,
            name: "dummy"
        })),
      });
      res.code(200).send(license.get());
    }
  } catch (e) {
    res.code(500).send((e as Error).message);
  }
}

async function getLicenseHandler(req: FastifyRequest, res: FastifyReply) {
  const validatorResponse = validGetLicenseDto(
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
      const license = await licenseService.getLicenseById(
        validatorResponse.dto.id
      );
      res
        .code(200)
        .send({
          ...license.get(),
          permissionSets: license.get().permissionSets.map((ps) => ps.get()),
        });
    }
  } catch (e) {
    res.code(500).send((e as Error).message);
  }
}

function validAddLicenseDto(body: { name: string }) {
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

function validUpdateLicenseDto(body: {
  id: string;
  name: string;
  permissionSetIds: string[];
}) {
  if (!body.id || !body.name || !body.permissionSetIds) {
    return {
      message: "id, name and permission set ids are mandatory.",
    };
  }
  return {
    dto: {
      id: body.id,
      name: body.name,
      permissionSetIds: body.permissionSetIds,
    },
  };
}

function validGetLicenseDto(query: { id: string }) {
  if (!query.id) {
    return {
      message: "license id is mandatory.",
    };
  }
  return {
    dto: {
      id: query.id,
    },
  };
}
