// Creates a global variable called `prisma` which is an instance of `Prisma`.
// This makes it available throughout your code.
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient; // This must be a `var` and not a `let / const`
}

import { PrismaClient } from '@prisma/client';
// Creates a local instance of `Prisma` which is connected to the database.
let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  // In production, we use the `prisma-client-lib` module to connect to the database.
  prisma = new PrismaClient();
} else {
  // In development, we use the `prisma-client-js` module to connect to the database.
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  // Sets the global instance to the local instance
  prisma = global.prisma;
}

export default prisma;