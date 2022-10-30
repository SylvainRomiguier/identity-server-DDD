import { Token } from "../../domain/Authentication/Token";
import { TokenPayload } from "../../domain/Authentication/TokenPayload";

export interface ITokenProvider {
    verify: (token:Token) => TokenPayload;
    sign: (payload: {userId:string}) => Token;
}