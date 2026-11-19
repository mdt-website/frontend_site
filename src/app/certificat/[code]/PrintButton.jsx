'use client';
export default function PrintButton() {
  return <p className="center mt"><button className="btn btn-navy" onClick={() => window.print()}>Imprimer ou enregistrer en PDF</button></p>;
}
