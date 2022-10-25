import fastify from "fastify";
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";
import userRoutes from "./presentation/user";
import "./dependency_injections";

const server = fastify({ logger: true });

const start = async () => {
  try {
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
        tags: [{ name: "user", description: "User related end-points" }],
        definitions: {
          User: {
            type: "object",
            required: ["id", "email"],
            properties: {
              id: { type: "string", format: "uuid" },
              firstName: { type: "string" },
              lastName: { type: "string" },
              userName: { type: "string" },
              email: { type: "string", format: "email" },
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
