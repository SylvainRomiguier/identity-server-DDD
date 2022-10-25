import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { isDate } from "util/types";
import { licenseService, userService } from "../../dependency_injections";

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

async function addUserHandler(req: FastifyRequest, res: FastifyReply) {
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
      const user = await userService.create(validatorResponse.dto);
      res.code(200).send(user.get());
    }
  } catch (e) {
    res.code(500).send((e as Error).message);
  }
}

async function updateUserHandler(req: FastifyRequest, res: FastifyReply) {
  const validatorResponse = validUpdateUserDto(
    req.body as {
      id:string;
      firstName: string;
      lastName: string;
      email: string;
      userName: string;
      password?: string;
    }
  );
  if (validatorResponse.message) {
    res.code(400).send(validatorResponse.message);
    return;
  }

  try {
    if (validatorResponse.dto) {
      const userDto = {
        id: validatorResponse.dto.id,
        firstName: validatorResponse.dto.firstName,
        lastName: validatorResponse.dto.lastName,
        email: validatorResponse.dto.email,
        userName: validatorResponse.dto.userName,
      };
      const password = validatorResponse.dto.password;
      const user = await userService.update(userDto, password);
      res.code(200).send(user.get());
    }
  } catch (e) {
    res.code(500).send((e as Error).message);
  }
}

async function assignLicenseHandler(req: FastifyRequest, res: FastifyReply) {
  const validatorResponse = validAssignLicenseDto(
    req.body as {
      userId: string;
      licenseId: string;
      expirationDate: string;
      suspended: boolean;
    }
  );
  console.log(req.body);
  if (validatorResponse.message) {
    res.code(400).send(validatorResponse.message);
    return;
  }

  try {
    if (validatorResponse.dto) {
      const user = await userService.getUserById(validatorResponse.dto.userId);
      const license = await licenseService.getLicenseById(validatorResponse.dto.licenseId);
       await userService.assignNewLicense(user, license, validatorResponse.dto.expirationDate, validatorResponse.dto.suspended);
      const licenseAttributions = userService.getLicenseAttributionsByUserId(validatorResponse.dto.userId);
      res.code(200).send({
        ...user.get(),
        licenses: (await licenseAttributions).map(la => la.get())
      });
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
    dto: {
      firstName: body.firstName,
      lastName: body.lastName,
      userName: body.userName,
      email: body.email,
      password: body.password
    },
  };
}

function validUpdateUserDto(body: {
  id:string;
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
  password?: string;
}) {
  if (
    !body.id ||
    !body.firstName ||
    !body.lastName ||
    !body.userName ||
    !body.email
  ) {
    return {
      message:
        "id, firstName, lastName, userName and email are mandatory.",
    };
  }
  return {
    dto: {
      id: body.id,
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      userName: body.userName,
      password: body.password
    },
  };
}

function validAssignLicenseDto(body: {
  userId: string;
  licenseId: string;
  expirationDate: string;
  suspended: boolean;
}) {
  if (
    !body.userId ||
    !body.licenseId ||
    !body.expirationDate ||
    body.suspended === undefined ||
    body.suspended === null
  ) {
    return {
      message:
        "user id, license id, expiration date and suspended are mandatory.",
    };
  }
  if(!isDate(new Date(body.expirationDate))) { return {message: "The date is not a valid date."}}
  return {
    dto: {
      userId: body.userId,
      licenseId: body.licenseId,
      expirationDate: new Date(body.expirationDate),
      suspended: body.suspended,
    },
  };
}
