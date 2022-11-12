import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { licenseService } from "../../dependency_injections";
import { addpermissionSetHandler, addPermissionToPermissionSetHandler, getPermissionsFromPermissionSetHandler, updatepermissionSetHandler } from "./handlers";

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