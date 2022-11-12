import { Token } from "../../domain/User/ValueObjects/Token";
import { TokenPayload } from "../../domain/User/ValueObjects/TokenPayload";

export interface ITokenProvider {
    verify: (token:Token) => TokenPayload;
    sign: (payload: {userId:string}) => Token;
}