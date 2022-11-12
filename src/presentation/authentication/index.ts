import { FastifyInstance } from "fastify";
import { authorizeHandler, meHandler } from "./handlers";

export default function (server: FastifyInstance, opts: any, done: () => void) {
  server.post("/authentication/authorize", {
    schema: {
      description: "Check user and return a token",
      tags: ["authentication"],
      body: {
        email: { type: "string" },
        password: { type: "string" },
      },
      response: {
        200: {
          type: "object",
          properties: {
            token: { type: "string" },
          },
        },
        500: {
          type: "object",
          properties: {
            message: { type: "string" },
          },
        },
      },
      security: [
        {
          apiKey: [],
        },
      ],
    },
    handler: authorizeHandler,
  });
  server.get("/authentication/me", {
    schema: {
      description: "Check a token and return a user with permissions",
      tags: ["authentication"],
      response: {
        200: {
          type: "object",
          properties: {
            id: { type: "string" },
            firstName: { type: "string" },
            lastName: { type: "string" },
            userName: { type: "string" },
            email: { type: "string" },
            permissions: {
              type: "array",
              items: {
                name: {
                  type: "string",
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
    handler: meHandler,
  });
  done();
}