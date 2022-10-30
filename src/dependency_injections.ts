import { AuthenticationService } from "./application/authentication.service";
import { LicenseService } from "./application/license.service";
import { UserService } from "./application/user.service";
import { DBService } from "./infrastructure/db.prisma.service";
import { LicenseRepository } from "./infrastructure/license.postgres.repository";
import { PasswordProvider } from "./infrastructure/password.crypto.service";
import { TokenProvider } from "./infrastructure/token.JWT.service";
import { UserRepository } from "./infrastructure/user.postgres.repository";
import { UUIDProvider } from "./infrastructure/uuid.service";

// Services
if (!process.env.PRIVATE_KEY || !process.env.PUBLIC_KEY) {
  console.log("a private key and a public key should be provided.");
  process.exit(1);
}
const dbService = new DBService();
const uuidService = new UUIDProvider();
const userRepository = new UserRepository(dbService);
const licenseRepository = new LicenseRepository(dbService);
const passwordService = new PasswordProvider();
const tokenService = new TokenProvider(
  process.env.PRIVATE_KEY,
  process.env.PUBLIC_KEY
);

// Application
export const userService = new UserService(
  uuidService,
  userRepository,
  passwordService,
  licenseRepository
);
export const licenseService = new LicenseService(
  licenseRepository,
  uuidService
);
export const authenticationService = new AuthenticationService(
  userService,
  tokenService
);
