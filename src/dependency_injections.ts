import { LicenseService } from "./application/license.service";
import { UserService } from "./application/user.service";
import { DBService } from "./infrastructure/db.prisma.service";
import { LicenseRepository } from "./infrastructure/license.postgres.repository";
import { PasswordService } from "./infrastructure/password.crypto.service";
import { TokenService } from "./infrastructure/token.JWT.service";
import { UserRepository } from "./infrastructure/user.postgres.repository";
import { UUIDService } from "./infrastructure/uuid.service";

// Services
if (!process.env.PRIVATE_KEY || !process.env.PUBLIC_KEY) {
  console.log("a private key and a public key should be provided.");
  process.exit(1);
}
const dbService = new DBService();
const uuidService = new UUIDService();
const userRepository = new UserRepository(dbService);
const licenseRepository = new LicenseRepository(dbService);
const passwordService = new PasswordService();
const tokenService = new TokenService(
  process.env.PRIVATE_KEY,
  process.env.PUBLIC_KEY
);

// Application
export const userService = new UserService(uuidService, userRepository, passwordService, tokenService);
export const licenseService = new LicenseService(licenseRepository,uuidService);



