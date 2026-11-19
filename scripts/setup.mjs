// Initialise la base et crée le premier administrateur.
// Usage : npm run db:setup   (idempotent : ne recrée pas un admin existant)
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

const root = process.cwd();
const envFile = path.join(root, '.env.local');
const env = fs.existsSync(envFile) ? fs.readFileSync(envFile, 'utf8') : '';
const has = (k) => new RegExp(`^${k}=`, 'm').test(env);
const adds = [];
const adminEmail = process.env.ADMIN_EMAIL || 'admin@maisondelatransformation.com';
let adminPassword = null;

if (!has('DATABASE_URL')) adds.push('DATABASE_URL="file:./dev.db"');
if (!has('SESSION_SECRET')) adds.push(`SESSION_SECRET="${crypto.randomBytes(48).toString('base64url')}"`);
if (!has('ADMIN_EMAIL')) adds.push(`ADMIN_EMAIL="${adminEmail}"`);
if (!has('ADMIN_INITIAL_PASSWORD')) {
  adminPassword = crypto.randomBytes(12).toString('base64url');
  adds.push(`ADMIN_INITIAL_PASSWORD="${adminPassword}"`);
}
if (adds.length) fs.appendFileSync(envFile, (env && !env.endsWith('\n') ? '\n' : '') + adds.join('\n') + '\n');

const merged = fs.readFileSync(envFile, 'utf8');
for (const line of merged.split('\n')) {
  const m = line.match(/^([A-Z_]+)="?(.*?)"?$/);
  if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
}

execSync('npx prisma db push --skip-generate', { stdio: 'inherit' });
execSync('npx prisma generate', { stdio: 'inherit' });

const { PrismaClient } = await import('@prisma/client');
const db = new PrismaClient();

function hashPassword(pw) {
  const salt = crypto.randomBytes(16);
  return `s1$${salt.toString('hex')}$${crypto.scryptSync(pw, salt, 64).toString('hex')}`;
}

const existing = await db.user.findUnique({ where: { email: process.env.ADMIN_EMAIL } });
if (!existing) {
  await db.user.create({ data: { email: process.env.ADMIN_EMAIL, name: 'Administrateur', role: 'ADMIN', passwordHash: hashPassword(process.env.ADMIN_INITIAL_PASSWORD) } });
  console.log(`\nAdministrateur créé : ${process.env.ADMIN_EMAIL}`);
  console.log('Mot de passe initial : voir ADMIN_INITIAL_PASSWORD dans le fichier .env.local (non versionné).');
  console.log('Changez-le dès la première connexion (Back-office > Utilisateurs).\n');
} else {
  console.log('Administrateur déjà présent : aucun changement.');
}
await db.$disconnect();
