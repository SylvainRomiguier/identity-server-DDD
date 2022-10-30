import { v4 } from "uuid";
import { IUUIDProvider} from "../application/infrastructureInterfaces/IUUIDProvider";

export class UUIDProvider implements IUUIDProvider {
    getRandomUUID() {
        return v4();
    }
}