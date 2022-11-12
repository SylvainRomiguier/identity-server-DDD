import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { licenseService } from "../../dependency_injections";
import { addLicenseHandler, updateLicenseHandler, getLicenseHandler } from "./handlers";

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