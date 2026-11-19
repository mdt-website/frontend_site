import { ImageResponse } from 'next/og';
import QRCode from 'qrcode';
import { db } from '@/lib/db';
import { getUser } from '@/lib/auth';
import { can } from '@/lib/crm';
import { CAMPUSES, subdomainUrl } from '@/lib/campuses';

// Image du code de présence à projeter pendant le culte (paysage ou portrait), avec QR vers la page de pointage.
export async function GET(req) {
  const user = await getUser();
  if (!can.manageContent(user)) return new Response('Accès refusé', { status: 403 });
  const url = new URL(req.url);
  const service = await db.service.findUnique({ where: { id: url.searchParams.get('service') || '' } });
  if (!service) return new Response('Culte introuvable', { status: 404 });
  const portrait = url.searchParams.get('format') === 'portrait';
  const [w, h] = portrait ? [1080, 1920] : [1920, 1080];
  const qr = await QRCode.toDataURL(subdomainUrl('app'), { margin: 1, width: 600, color: { dark: '#0b1633', light: '#ffffff' } });
  const campus = CAMPUSES[service.campus]?.name || 'La Maison de la Transformation';

  const img = new ImageResponse((
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: portrait ? 'column' : 'row', alignItems: 'center', justifyContent: 'center', gap: 80, background: '#0b1633', color: '#fff', padding: 80 }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
        <div style={{ display: 'flex', fontSize: 44, letterSpacing: 8, color: '#E7CF84' }}>{campus.toUpperCase()}</div>
        <div style={{ display: 'flex', fontSize: 60 }}>Code de présence</div>
        <div style={{ display: 'flex', fontSize: portrait ? 320 : 380, fontWeight: 800, letterSpacing: 24, color: '#E7CF84', lineHeight: 1 }}>{service.code}</div>
        <div style={{ display: 'flex', fontSize: 38, opacity: 0.8 }}>Saisissez ce code sur la page de pointage</div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, background: '#fff', padding: 28, borderRadius: 24 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={qr} width={portrait ? 560 : 520} height={portrait ? 560 : 520} alt="" />
        <div style={{ display: 'flex', color: '#0b1633', fontSize: 30 }}>Scannez pour pointer</div>
      </div>
    </div>
  ), { width: w, height: h });
  if (url.searchParams.get('download')) img.headers.set('Content-Disposition', `attachment; filename="code-${service.code}-${portrait ? 'portrait' : 'paysage'}.png"`);
  return img;
}
