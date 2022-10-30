export class Token {
    private _token:string;
    constructor(token: string) {
        this._token = token;
    }
    get () {
        return this._token;
    }
}