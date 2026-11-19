'use client';
import { useEffect, useState } from 'react';

// « Bonjour / Bon après-midi / Bonsoir » selon l'heure du visiteur (comme « Good Afternoon » sur sermons.joincci.org)
export default function Greeting() {
  const [g, setG] = useState('Bienvenue');
  useEffect(() => { const h = new Date().getHours(); setG(h < 12 ? 'Bonjour' : h < 18 ? 'Bon après-midi' : 'Bonsoir'); }, []);
  return <h2 className="h2">{g}</h2>;
}
