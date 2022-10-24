export interface ITokenService {
    verify: (token:string) => Promise<string>;
}