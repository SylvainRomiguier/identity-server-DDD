import { PrismaClient } from "@prisma/client";

export class DBService {
    private _client:PrismaClient;
    constructor() {
        this._client = new PrismaClient();
    }

    async getClient() {
        await this._client.$connect();
        return this._client;
    }

    async disconnect() {
        await this._client.$disconnect();
    }
}