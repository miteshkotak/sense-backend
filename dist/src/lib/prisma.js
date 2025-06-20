"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../generated/prisma");
const config_1 = __importDefault(require("../config"));
const prisma = globalThis.__prisma || new prisma_1.PrismaClient({
    log: ['query', 'info', 'warn', 'error'], // Enable logging
    datasources: {
        db: {
            url: config_1.default.database_url, // PostgreSQL connection string
        },
    },
});
if (process.env.NODE_ENV !== 'production') {
    global.prisma = prisma;
}
exports.default = prisma;
//# sourceMappingURL=prisma.js.map