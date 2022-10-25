export interface ITokenService {
    verify: (token:string) => string;
    sign: (payload: {userId:string}) => string;
}