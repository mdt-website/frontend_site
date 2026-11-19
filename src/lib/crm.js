// Constantes partagées entre les formulaires publics et le back-office.
export const REQUEST_TYPES = {
  membership: 'Devenir membre',
  class_enrol: 'Classes de membres : inscription',
  class_makeup: 'Classes de membres : rattrapage',
  class_certificate: 'Classes de membres : certificat',
  prayer: 'Requête de prière',
  first_timer: 'Première visite',
  second_timer: 'Deuxième visite',
  online_community: 'Communauté en ligne',
  counselling: 'Conseil pastoral',
  pre_marital: 'Conseil pré-mariage',
  post_marital: 'Conseil post-mariage',
  welfare: 'Aide sociale',
  celebration: 'Célébration',
  cell_join: 'Rejoindre une cellule',
  cell_register: 'Enregistrer une cellule',
  map_join: 'Rejoindre un MAP',
  volunteer: 'Bénévolat',
  testimony: 'Témoignage',
  contact: 'Message de contact',
  donation: 'Don annoncé',
  event_register: 'Inscription à un événement',
};

export const STATUS = { NEW: 'Nouvelle', IN_PROGRESS: 'En cours', DONE: 'Traitée', ARCHIVED: 'Archivée' };
export const DONATION_STATUS = { ANNOUNCED: 'Annoncé', CONFIRMED: 'Confirmé', REJECTED: 'Rejeté' };
export const ROLES = { ADMIN: 'Administrateur', PASTOR: 'Pasteur', LEADER: 'Responsable' };

// Demandes confidentielles : invisibles pour les simples responsables
export const SENSITIVE_TYPES = new Set(['prayer', 'counselling', 'pre_marital', 'post_marital', 'welfare', 'donation']);

export const can = {
  manageContent: (u) => !!u && ['ADMIN', 'PASTOR'].includes(u.role),
  manageUsers: (u) => !!u && u.role === 'ADMIN',
  seeSensitive: (u) => !!u && ['ADMIN', 'PASTOR'].includes(u.role),
  seeDonations: (u) => !!u && ['ADMIN', 'PASTOR'].includes(u.role),
};

export const FIELD_LABELS = {
  nom: 'Nom', telephone: 'Téléphone', email: 'Email', quartier: 'Quartier', bapteme: 'Baptisé(e)', sujet: 'Sujet',
  confidentiel: 'Confidentiel', connu: 'Comment nous a connus', message: 'Message', ville: 'Ville / Pays',
  categorie: 'Catégorie', partenaire: 'Fiancé(e)', date: 'Date', conjoint: 'Conjoint(e)', besoin: 'Besoin',
  ministere: 'Ministère', publier: 'Publication autorisée', zone: 'Quartier', jour: 'Jour et heure', evenement: 'Événement / célébration', personnes: 'Nombre de personnes',
  classe: 'Classe', nature: 'Nature', montant: 'Montant', moyen: 'Moyen', accord: 'Consentement',
};
