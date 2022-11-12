import { FastifyInstance } from "fastify";
import { addUserHandler, updateUserHandler, assignLicenseHandler } from "./handlers";

export default function (server:FastifyInstance, opts:any, done: () => void) {
  server.post("/user", {
    schema: {
      description: "Add a user",
      tags: ["user"],
      body: {
        firstName: { type: "string" },
        lastName: { type: "string" },
        userName: { type: "string" },
        email: { type: "string" },
        password: { type: "string" },
      },
      response: {
        200: {
          type: "object",
          properties: {
            id: { type: "string" },
            firstName: { type: "string" },
            lastName: { type: "string" },
            email: { type: "string" },
            userName: { type: "string" },
          },
        },
      },
      security: [
        {
          apiKey: [],
        },
      ],
    },
    handler: addUserHandler,
  });
  server.put("/user", {
    schema: {
      description: "Update a user",
      tags: ["user"],
      body: {
        id: { type: "string" },
        firstName: { type: "string" },
        lastName: { type: "string" },
        userName: { type: "string" },
        email: { type: "string" },
        password: { type: "string" },
      },
      response: {
        200: {
          type: "object",
          properties: {
            id: { type: "string" },
            firstName: { type: "string" },
            lastName: { type: "string" },
            email: { type: "string" },
            userName: { type: "string" },
          },
        },
      },
      security: [
        {
          apiKey: [],
        },
      ],
    },
    handler: updateUserHandler,
  });
  server.post("/user/assignLicense", {
    schema: {
      description: "Assign a license to a user",
      tags: ["user"],
      body: {
        userId: { type: "string" },
        licenseId: { type: "string" },
        expirationDate: {type: "string"},
        suspended: {type: "boolean"}
      },
      response: {
        200: {
          type: "object",
          properties: {
            id: { type: "string" },
            firstName: { type: "string" },
            lastName: { type: "string" },
            email: { type: "string" },
            userName: { type: "string" },
            licenses: {
              type: "array",
              items: {
                id: {type: "string"},
                name: {type: "string"}
              }
            }
          },
        },
      },
      security: [
        {
          apiKey: [],
        },
      ],
    },
    handler: assignLicenseHandler,
  });
  done();
}