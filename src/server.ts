import fastify from "fastify";
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";
import cors from '@fastify/cors';
import userRoutes from "./presentation/user";
import licenseRoutes from "./presentation/license";
import permissionRoutes from "./presentation/permission";
import permissionSetRoutes from "./presentation/permissionSet";
import authenticationRoutes from "./presentation/authentication";
import "./dependency_injections";

const server = fastify({ logger: true });

const start = async () => {
  try {
    await server.register(cors, {
      origin: "*",
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH"]
    });
    await server.register(swagger, {
      swagger: {
        info: {
          title: "Identity and Licenses management server",
          description: "",
          version: "0.1.0",
        },
        externalDocs: {
          url: "https://swagger.io",
          description: "Find more info here",
        },
        host: "localhost:3000",
        schemes: ["http"],
        consumes: ["application/json"],
        produces: ["application/json"],
        tags: [
          { name: "user", description: "User related end-points" },
          { name: "license", description: "License related end-points" },
          { name: "permission", description: "Permissions related end-points" },
          { name: "permission set", description: "Permission Sets related end-points" },
        ],
        definitions: {
          User: {
            type: "object",
            required: ["id", "email", "firstName", "lastName", "userName"],
            properties: {
              id: { type: "string", format: "uuid" },
              firstName: { type: "string" },
              lastName: { type: "string" },
              userName: { type: "string" },
              email: { type: "string", format: "email" },
            },
          },
          PermissionSet: {
            type: "object",
            required: ["id", "name"],
            properties: {
              id: { type: "string", format: "uuid" },
              name: { type: "string" },
            },
          },
          License: {
            type: "object",
            required: ["id", "name", "permissionSets"],
            properties: {
              id: { type: "string", format: "uuid" },
              name: { type: "string" },
              permissionSets: {
                type: "array",
                items: {
                  type: "PermissionSet",
                },
              },
            },
          },
        },
        securityDefinitions: {
          apiKey: {
            type: "apiKey",
            name: "apiKey",
            in: "header",
          },
        },
      },
    });

    await server.register(userRoutes);
    await server.register(licenseRoutes);
    await server.register(permissionRoutes);
    await server.register(permissionSetRoutes);
    await server.register(authenticationRoutes);

    await server.register(swaggerUi, {
      routePrefix: "/documentation",
      uiConfig: {
        docExpansion: "full",
        deepLinking: false,
      },
    });

    await server.ready();
    server.swagger();
    await server.listen({ port: 3000 });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};
start();
