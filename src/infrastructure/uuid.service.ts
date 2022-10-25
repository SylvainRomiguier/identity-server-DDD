import { v4 } from "uuid";
import { IUUIDService } from "../domain/serviceInterfaces/IUUIDService";

export class UUIDService implements IUUIDService {
    getRandomUUID() {
        return v4();
    }
}