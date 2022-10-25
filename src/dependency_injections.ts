import { AuthenticateUserFromToken } from "./domain/User/AuthenticateUserFromToken";
import { CreatePassword } from "./domain/User/CreatePassword";
import { CreateUser } from "./domain/User/CreateUser";
import { RemoveUser } from "./domain/User/RemoveUser";
import { UpdateUser } from "./domain/User/UpdateUser";
import { VerifyUserPassword } from "./domain/User/VerifyUserPassword";
import { DBService } from "./infrastructure/db.prisma.service";
import { PasswordService } from "./infrastructure/password.crypto.service";
import { TokenService } from "./infrastructure/token.JWT.service";
import { UserService } from "./infrastructure/user.postgres.service";
import { UUIDService } from "./infrastructure/uuid.service";

// Services
if (!process.env.PRIVATE_KEY || !process.env.PUBLIC_KEY) {
  console.log("a private key and a public key should be provided.");
  process.exit(1);
}
const dbService = new DBService();
const uuidService = new UUIDService();
const userService = new UserService(dbService);
const passwordService = new PasswordService();
const tokenService = new TokenService(
  process.env.PRIVATE_KEY,
  process.env.PUBLIC_KEY
);

// Application
export const createPassword = new CreatePassword(passwordService);
export const authenticateUserFromToken = new AuthenticateUserFromToken(
  userService,
  tokenService
);
export const verifyUserPassword = new VerifyUserPassword(
  userService,
  passwordService
);
export const createUser = new CreateUser(
  uuidService,
  userService,
  passwordService
);
export const updateUser = new UpdateUser(userService, passwordService);
export const removeUser = new RemoveUser(userService);
