/*
This setup helps in managing the PrismaClient instance efficiently, 
especially in development environments where hot-reloading can cause 
multiple instances to be created.
*/

import { PrismaClient } from '@prisma/client';

declare global {
  var prisma: PrismaClient | undefined;
}

const client = globalThis.prisma || new PrismaClient();
if(process.env.NODE_ENV !== 'production') {
  globalThis.prisma = client;
}

export default client;