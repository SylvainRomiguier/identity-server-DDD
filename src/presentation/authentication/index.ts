import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import {
  authenticationService,
  userService,
} from "../../dependency_injections";
import { Token } from "../../domain/Authentication/Token";

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
      },
      security: [
        {
          apiKey: [],
        },
      ],
    },
    handler: authorizeHandler,
  });
  server.put("/authentication/me", {
    schema: {
      description: "Check a token and return a user with permissions",
      tags: ["authentication"],
      body: {
        token: { type: "string" },
      },
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

async function authorizeHandler(req: FastifyRequest, res: FastifyReply) {
  const validatorResponse = validAuthorizeDto(
    req.body as {
      email: string;
      password: string;
    }
  );
  if (validatorResponse.message) {
    res.code(400).send(validatorResponse.message);
    return;
  }

  try {
    if (validatorResponse.dto) {
      const user = await userService.getUserByEmail(
        validatorResponse.dto.email
      );
      const token = await authenticationService.authorize(
        user,
        validatorResponse.dto.password
      );
      res.code(200).send(token.get());
    }
  } catch (e) {
    res.code(500).send((e as Error).message);
  }
}

async function meHandler(req: FastifyRequest, res: FastifyReply) {
  const validatorResponse = validMeDto(req.headers.authorization);
  if (validatorResponse.message) {
    res.code(400).send(validatorResponse.message);
    return;
  }

  try {
    if (validatorResponse.dto) {
        const user = await authenticationService.getUser(new Token(validatorResponse.dto.token));
      res.code(200).send(user.get());
    }
  } catch (e) {
    res.code(500).send((e as Error).message);
  }
}

function validAuthorizeDto(body: { email: string; password: string }) {
  if (!body.email || !body.password) {
    return {
      message: "Email and password are mandatory.",
    };
  }
  return {
    dto: {
      email: body.email,
      password: body.password,
    },
  };
}

function validMeDto(authorization?: string) {
  if (!authorization || authorization.split(" ").length !== 2) {
    return {
      message: "Authorization is mandatory.",
    };
  }
  return {
    dto: {
      token: authorization.split(" ")[1],
    },
  };
}
