import { PrismaClient } from '@prisma/client';

const g = globalThis;
export const db = g.__prisma || new PrismaClient();
if (process.env.NODE_ENV !== 'production') g.__prisma = db;
