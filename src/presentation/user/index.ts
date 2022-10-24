import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { createUser } from "../../dependency_injections";

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
    handler: addUser,
  });
  done();
}

async function addUser(req: FastifyRequest, res: FastifyReply) {
  const validatorResponse = validAddUserDto(
    req.body as {
      firstName: string;
      lastName: string;
      email: string;
      userName: string;
      password: string;
    }
  );
  if (validatorResponse.message) {
    res.code(400).send(validatorResponse.message);
    return;
  }

  try {
    if (validatorResponse.dto) {
      const userDto = {
        firstName: validatorResponse.dto.firstName,
        lastName: validatorResponse.dto.lastName,
        email: validatorResponse.dto.email,
        userName: validatorResponse.dto.userName,
      };
      const password = validatorResponse.dto.password;
      const user = await createUser.with(userDto, password);
      res.code(200).send(user.get());
    }
  } catch (e) {
    res.code(500).send((e as Error).message);
  }
}

function validAddUserDto(body: {
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
  password: string;
}) {
  if (
    !body.firstName ||
    !body.lastName ||
    !body.userName ||
    !body.password ||
    !body.email
  ) {
    return {
      message:
        "firstName, lastName, userName, email and password are mandatory.",
    };
  }
  return {
    dto: body,
  };
}
