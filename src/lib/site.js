// Contenu central MDT (La Maison de la Transformation). Remplacé par l'API en phase 2.
export const SITE = {
  name: 'La Maison de la Transformation',
  short: 'MDT',
  vision: 'Une église où le Seigneur nous transforme à son image, de gloire en gloire.',
  address: "Ex (Big Man Hôtel), Zogbadjè, non loin du petit portail du Campus d'Abomey-Calavi",
  email: 'info@maisondelatransformation.com',
  phone: '+229 01 41 37 37 41',
  phoneHref: 'tel:+2290141373741',
  youtube: 'https://www.youtube.com/@LaMaisondelaTransformation',
  facebook: 'https://www.facebook.com/profile.php?id=61564409844332',
  instagram: 'https://www.instagram.com/lamaisonde_latransformation/',
  // Liens des applications mobiles : à renseigner dès que l'app est publiée (laisser vide = badge « Bientôt »).
  apps: { ios: '', android: '' },
};

export const NAV = [
  { href: '/about', label: 'À propos' },
  { href: '/ql', label: 'Liens rapides' },
  { href: '/campuses', label: 'Lieux' },
  { href: '/cell-church', label: 'Cellules' },
  { href: '/sermons', label: 'Sermons' },
  { href: '/map', label: 'MAP' },
  { href: '/give', label: 'Donner' },
];

export const FOOTER_COLS = [
  { title: 'Se connecter', links: [
    ['Devenir membre', '/membership'], ['Requête de prière', '/prayer-request'],
    ['Première visite', '/first-timers'], ['Communauté en ligne', '/online-community'] ] },
  { title: 'Ministères', links: [
    ['Louange & Adoration', '/ministries#louange'], ['Jeunesse', '/ministries#jeunesse'],
    ['Enfants', '/ministries#enfants'], ['Intercession', '/ministries#intercession'] ] },
  { title: 'Ressources', links: [
    ['Classes de membres', '/membership-class'], ['Célébrations', '/celebrations'],
    ['Accompagnement', '/counselling'], ['Pré-mariage', '/pre-marital-counselling'],
    ['Post-mariage', '/post-marital-counselling'], ['Aide sociale', '/welfare'], ['Formation en ligne', '/lms'] ] },
  { title: 'Médias', links: [
    ['Regarder en ligne', SITE.youtube], ['Sermons', '/sermons'], ['Événements', '/events'], ['Contact', '/contact'] ] },
];

export const QUICK_LINKS = [
  ['Expérience de discipulat MDT', '/lms'],
  ['Programme Legacy Fellows', '/legacy-fellows'],
  ['Legacy : projets à l’honneur', '/legacy-spotlight'],
  ['Célébrations', '/celebrations'],
  ['Enquête de satisfaction', '/feedback-survey'],
  ['Première visite', '/first-timers'],
  ['Rapport de présence du protocole', '/gpa'],
  ['Bénévoles de la ligne d’écoute', '/helpline-volunteers'],
  ['Devenir membre', '/membership'],
  ['Classe de membres (terminée)', '/membership-class/completed'],
  ['Classe de membres (rattrapage)', '/membership-class/makeup'],
  ['Classe de membres (nouvelle inscription)', '/membership-class/new'],
  ['Bénévoles des nouveaux lieux', '/volunteers'],
  ['Communauté en ligne', '/online-community'],
  ['Préparer sa vie', '/pfl'],
  ['Conseil post-mariage', '/post-marital-counselling'],
  ['Requête de prière', '/prayer-request'],
  ['Conseil pré-mariage', '/pre-marital-counselling'],
  ['Camp : inscription', '/camp'],
  ['Deuxième visite', '/second-timers'],
  ['Seniors Connect', '/seniors-connect'],
  ['Témoignage', '/testimony'],
  ['Aide sociale', '/welfare'],
  ['Jeunesse : retour d’expérience', '/yaf-feedback'],
  // Spécifique MDT
  ['Rejoindre une cellule', '/cell-church'], ['Rejoindre un groupe MAP', '/map'],
  ['Projet de construction', '/building-project'], ['Faire un don', '/give'], ['Mon visuel d’événement', '/dp'],
];

export const MINISTRIES = [
  { id: 'louange', title: 'Louange & Adoration', text: 'Le ministère de musique de la Maison : créer une atmosphère d’adoration et produire des chants qui approfondissent la relation avec Christ.', img: '/img/gallery1.jpg' },
  { id: 'jeunesse', title: 'Jeunesse', text: 'Une génération qui se lève pour Christ : enseignement, communion et mission pour les jeunes.', img: '/img/Link.jpg' },
  { id: 'enfants', title: 'Enfants', text: 'Un espace pour voir les enfants grandir dans la foi et être formés à devenir disciples à leur tour.', img: '/img/about.jpg' },
  { id: 'intercession', title: 'Intercession', text: 'Une maison de prière pour la ville et les nations.', img: '/img/Mum2.jpg' },
  { id: 'couples', title: 'Couples & Familles', text: 'Bâtir des foyers solides sur le Rocher.', img: '/img/ma1.jpg' },
  { id: 'accueil', title: 'Accueil & Protocole', text: 'Servir chaque visiteur avec excellence et joie.', img: '/img/gallery3.jpg' },
];

export const SERVICES = [
  { day: 'Dimanche', times: ['08h00 – 10h00', '17h00 – 20h00'], label: 'Cultes de célébration' },
];
