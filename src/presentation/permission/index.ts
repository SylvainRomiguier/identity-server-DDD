import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { licenseService } from "../../dependency_injections";

export default function (server: FastifyInstance, opts: any, done: () => void) {
  server.post("/permission", {
    schema: {
      description: "Add a permission",
      tags: ["permission"],
      body: {
        name: { type: "string" },
      },
      response: {
        200: {
          type: "object",
          properties: {
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
    handler: addPermissionHandler,
  });
  done();
}

async function addPermissionHandler(req: FastifyRequest, res: FastifyReply) {
  const validatorResponse = validAddPermissionDto(
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
      const permission = await licenseService.createPermission(validatorResponse.dto.name);
      res.code(200).send(permission.get());
    }
  } catch (e) {
    res.code(500).send((e as Error).message);
  }
}

function validAddPermissionDto(body: { name: string }) {
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
