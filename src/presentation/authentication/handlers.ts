import { FastifyRequest, FastifyReply } from "fastify";
import {
  userService,
  authenticationService,
} from "../../dependency_injections";
import { Password } from "../../domain/User/ValueObjects/Password";
import { Token } from "../../domain/User/ValueObjects/Token";
import { validEmailPassword, validAuthorization } from "../validators";

export async function authorizeHandler(req: FastifyRequest, res: FastifyReply) {
  try {
    const validatorResponse = validEmailPassword(req.body);
    const user = await userService.getUserByEmail(validatorResponse.dto.email);
    const password = new Password(validatorResponse.dto.password);
    const token = await authenticationService.authorize(user, password);
    res.code(200).send({ token: token.value });
  } catch (e) {
    res.code(500).send({ message: (e as Error).message });
  }
}

export async function meHandler(req: FastifyRequest, res: FastifyReply) {
  const validatorResponse = validAuthorization(req.headers.authorization);
  if (validatorResponse.message) {
    res.code(400).send(validatorResponse.message);
    return;
  }

  try {
    if (validatorResponse.dto) {
      const userWithPermissions =
        await authenticationService.getUserWithPermissions(
          new Token(validatorResponse.dto.token)
        );
      res.code(200).send({
        user: userWithPermissions.user.get(),
        permissions: userWithPermissions.permissions.map((p) => p.name),
      });
    }
  } catch (e) {
    res.code(500).send((e as Error).message);
  }
}
