import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { licenseService } from "../../dependency_injections";
import { addPermissionHandler } from "./handlers";

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