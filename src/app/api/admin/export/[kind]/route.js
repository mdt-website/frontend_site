import { db } from '@/lib/db';
import { getUser } from '@/lib/auth';
import { can, DONATION_STATUS, REQUEST_TYPES, SENSITIVE_TYPES, STATUS } from '@/lib/crm';
import { csvCell } from '@/lib/format';

// Export CSV réservé aux utilisateurs connectés (mêmes droits que l'interface).
export async function GET(req, { params }) {
  const user = await getUser();
  if (!user) return new Response('Non autorisé', { status: 401 });
  const { kind } = await params;
  const sp = new URL(req.url).searchParams;
  let header; let rows;

  if (kind === 'requests') {
    const type = sp.get('type'); const status = sp.get('status');
    const list = await db.request.findMany({
      where: { ...(type in REQUEST_TYPES ? { type } : {}), ...(status in STATUS ? { status } : {}), ...(can.seeSensitive(user) ? {} : { type: { notIn: [...SENSITIVE_TYPES] } }) },
      orderBy: { createdAt: 'desc' }, include: { person: true }, take: 5000,
    });
    header = ['Date', 'Type', 'Statut', 'Nom', 'Téléphone', 'Email', 'Données'];
    rows = list.map((r) => [r.createdAt.toISOString(), REQUEST_TYPES[r.type], STATUS[r.status], r.person?.name, r.person?.phone, r.person?.email, r.data]);
  } else if (kind === 'people') {
    const list = await db.person.findMany({ orderBy: { createdAt: 'desc' }, take: 10000 });
    header = ['Nom', 'Téléphone', 'Email', 'Quartier', 'Créé le'];
    rows = list.map((p) => [p.name, p.phone, p.email, p.quarter, p.createdAt.toISOString()]);
  } else if (kind === 'subscribers') {
    const list = await db.subscriber.findMany({ orderBy: { createdAt: 'desc' } });
    header = ['Email', 'Inscrit le'];
    rows = list.map((s) => [s.email, s.createdAt.toISOString()]);
  } else if (kind === 'donations') {
    if (!can.seeDonations(user)) return new Response('Interdit', { status: 403 });
    const list = await db.donation.findMany({ orderBy: { createdAt: 'desc' }, include: { person: true }, take: 10000 });
    header = ['Date', 'Nom', 'Nature', 'Montant (FCFA)', 'Moyen', 'Statut'];
    rows = list.map((d) => [d.createdAt.toISOString(), d.person?.name, d.nature, d.amount, d.method, DONATION_STATUS[d.status]]);
  } else if (kind === 'attendance') {
    const service = sp.get('service');
    if (!service) return new Response('Culte manquant', { status: 400 });
    const list = await db.attendance.findMany({ where: { serviceId: service }, orderBy: { createdAt: 'asc' } });
    header = ['Nom', 'Téléphone', 'Heure'];
    rows = list.map((a) => [a.name, a.phone, a.createdAt.toISOString()]);
  } else {
    return new Response('Export inconnu', { status: 404 });
  }

  const csv = '﻿' + [header, ...rows].map((r) => r.map(csvCell).join(',')).join('\r\n');
  return new Response(csv, { headers: { 'Content-Type': 'text/csv; charset=utf-8', 'Content-Disposition': `attachment; filename="mdt-${kind}.csv"`, 'Cache-Control': 'no-store' } });
}
