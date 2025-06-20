import { PrismaClient } from '../generated/prisma'
import config from '../config'

import { PrismaPg } from '@prisma/adapter-pg'

const connectionString = config.database_url

const adapter: PrismaPg = new PrismaPg({ connectionString });
const prisma = new PrismaClient();


//Prevent multiple instances of Prisma Client in development
declare global {
  var prisma: PrismaClient | undefined;
}

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
} 

export default prisma