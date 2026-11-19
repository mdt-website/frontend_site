import test from 'node:test';
import assert from 'node:assert/strict';
import { hashPassword, verifyPassword } from '../src/lib/password.js';
import { isEmail, normalizePhone, rateLimit } from '../src/lib/security.js';
import { csvCell, fromInputDateTime, toInputDateTime } from '../src/lib/format.js';

test('mot de passe : hash vérifiable, jamais en clair, sels différents', () => {
  const h1 = hashPassword('Secret-123456');
  const h2 = hashPassword('Secret-123456');
  assert.ok(h1.startsWith('s1$'));
  assert.ok(!h1.includes('Secret-123456'));
  assert.notEqual(h1, h2);
  assert.equal(verifyPassword('Secret-123456', h1), true);
  assert.equal(verifyPassword('mauvais', h1), false);
});

test('mot de passe : formats invalides rejetés sans exception', () => {
  assert.equal(verifyPassword('x', 's1$00$00'), false);
  assert.equal(verifyPassword('x', ''), false);
  assert.equal(verifyPassword('x', undefined), false);
  assert.equal(verifyPassword('x', 'bcrypt$autre'), false);
});

test('téléphone : normalisation', () => {
  assert.equal(normalizePhone('+229 01 41 37 37 41'), '+2290141373741');
  assert.equal(normalizePhone('(229) 0141-3737'), '2290141 3737'.replace(' ', ''));
  assert.equal(normalizePhone('123'), null);
  assert.equal(normalizePhone(''), null);
  assert.equal(normalizePhone(null), null);
});

test('email : validation', () => {
  assert.equal(isEmail('a@b.co'), true);
  assert.equal(isEmail('a@b'), false);
  assert.equal(isEmail('a b@c.d'), false);
});

test('limiteur de débit : bloque au-delà du maximum puis libère', async () => {
  const k = `t:${Math.random()}`;
  assert.equal(rateLimit(k, 2, 50), true);
  assert.equal(rateLimit(k, 2, 50), true);
  assert.equal(rateLimit(k, 2, 50), false);
  await new Promise((r) => setTimeout(r, 70));
  assert.equal(rateLimit(k, 2, 50), true);
});

test('CSV : échappe les guillemets et neutralise les formules', () => {
  assert.equal(csvCell('a "b"'), '"a ""b"""');
  assert.equal(csvCell('=HYPERLINK("x")'), '"\'=HYPERLINK(""x"")"');
  assert.equal(csvCell('+1'), '"\'+1"');
  assert.equal(csvCell(null), '""');
  assert.equal(csvCell(42), '"42"');
});

test('dates : conversion heure du Bénin (UTC+1) aller-retour', () => {
  const d = fromInputDateTime('2026-12-06T08:00');
  assert.equal(d.toISOString(), '2026-12-06T07:00:00.000Z');
  assert.equal(toInputDateTime(d), '2026-12-06T08:00');
  assert.ok(Number.isNaN(fromInputDateTime('').getTime()));
});

import { CAMPUSES, isCampus, subdomainUrl } from '../src/lib/campuses.js';

test('lieux : trois lieux valides, entrées inconnues refusées', () => {
  assert.deepEqual(Object.keys(CAMPUSES), ['calavi', 'cotonou', 'lome']);
  assert.equal(isCampus('lome'), true);
  assert.equal(isCampus('__proto__'), false);
  assert.equal(isCampus('toString'), false);
  assert.equal(isCampus(null), false);
});

test('sous-domaines : URL selon le domaine racine', () => {
  process.env.ROOT_DOMAIN = 'exemple.org';
  assert.equal(subdomainUrl('lome'), 'https://lome.exemple.org');
  process.env.ROOT_DOMAIN = 'localhost';
  assert.equal(subdomainUrl('app'), 'http://app.localhost:3100');
  delete process.env.ROOT_DOMAIN;
});

test('IP client : Cloudflare prioritaire', async () => {
  const { clientIp } = await import('../src/lib/security.js');
  const h = (o) => ({ get: (k) => o[k] ?? null });
  assert.equal(clientIp(h({ 'cf-connecting-ip': '1.2.3.4', 'x-forwarded-for': '9.9.9.9' })), '1.2.3.4');
  assert.equal(clientIp(h({ 'x-forwarded-for': '9.9.9.9, 8.8.8.8' })), '9.9.9.9');
  assert.equal(clientIp(h({})), 'local');
});
