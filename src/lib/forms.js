// Spécification des formulaires, partagée par le navigateur (affichage) et le serveur (validation).
// Structure, champs, ordre et largeurs calqués sur les formulaires de joincci.org ; textes et listes adaptés à la MDT.
// width : full | half | third.  type : name | text | email | tel | date | time | select | radio | multi | textarea | consent
// showIf : { name, in: [valeurs] } : le champ n'apparaît (et n'est exigé) que si la condition est remplie.

export const CAMPUS_OPTIONS = ['MDT Calavi', 'MDT Cotonou', 'MDT Lomé', 'Communauté en ligne'];
// Unités de service : à valider avec l'église
export const UNITS = ['Accueil et Protocole', 'Ambiance et Propreté', 'Louange et Adoration', 'Technique (Son et Lumière)', 'Communication et Réseaux sociaux', 'Vidéo et Streaming', 'Photographie', 'Projection', 'Design', 'Suivi des nouveaux', 'Enfants', 'Jeunesse'];
const YN = ['Oui', 'Non'];
const AGES = ['Moins de 18 ans', '18 - 25', '26 - 30', '31 - 39', '40 - 50', 'Plus de 50 ans'];
const HEARD = ['Réseaux sociaux', 'Un membre de ma famille', 'Un ami', 'Un collègue', 'Autre'];

const f = (name, label, type = 'text', o = {}) => ({ name, label, type, width: 'full', ...o });
const NAME = (name = 'nom', label = 'Nom complet', o = {}) => f(name, label, 'name', { required: true, ...o });
const EMAIL = (o = {}) => f('email', 'Email', 'email', { width: 'half', ...o });
const PHONE = (o = {}) => f('telephone', 'Téléphone (de préférence WhatsApp)', 'tel', { width: 'half', placeholder: '+229 01 41 37 37 41', ...o });
const CAMPUS = (name = 'lieu', label = 'Lieu fréquenté', o = {}) => f(name, label, 'select', { required: true, options: CAMPUS_OPTIONS, ...o });
const CONSENT_ACCORD = f('accord', 'J’accepte d’être contacté(e) par l’église', 'consent', { required: true });

export const FORMS = {
  membership: {
    title: 'Formulaire de membre',
    fields: [
      NAME(), EMAIL({ required: true }), PHONE({ required: true }),
      f('localisation', 'Lieu de résidence (quartier, ville)', 'text', { required: true, width: 'half' }),
      f('naissance', 'Date de naissance', 'date', { required: true, width: 'half' }),
      f('age', 'Tranche d’âge', 'select', { required: true, options: AGES }),
      f('genre', 'Genre', 'radio', { required: true, options: ['Homme', 'Femme'] }),
      f('situation', 'Situation matrimoniale', 'select', { required: true, width: 'half', options: ['Célibataire', 'Marié(e)', 'Divorcé(e)', 'Veuf / Veuve', 'Je préfère ne pas répondre'] }),
      f('emploi', 'Situation professionnelle', 'select', { required: true, width: 'half', options: ['Salarié(e)', 'Entrepreneur (petite activité)', 'Entrepreneur (moyenne ou grande entreprise)', 'Étudiant(e)', 'Sans emploi / entre deux emplois'] }),
      f('classe', 'Avez-vous suivi la classe de membres ?', 'radio', { required: true, options: YN }),
      f('profession', 'Profession'),
      f('interet', 'Lequel de ces domaines vous intéresse ?', 'radio', { width: 'half', options: ['Sciences et technologie', 'Professions libérales', 'Affaires', 'Créatifs'] }),
      f('loisirs', 'Autres centres d’intérêt ou loisirs', 'text', { width: 'half' }),
      f('unite', 'Dans quelle unité de service êtes-vous ?', 'radio', { required: true, options: [...UNITS, 'Aucune'] }),
      CAMPUS(),
      NAME('urgence_nom', 'Contact d’urgence'),
      f('urgence_email', 'Email du contact d’urgence', 'email', { required: true, width: 'half' }),
      f('urgence_tel', 'Téléphone du contact d’urgence', 'tel', { required: true, width: 'half', placeholder: '+229 01 41 37 37 41' }),
    ],
  },

  prayer: {
    title: 'Requête de prière',
    fields: [
      NAME(), PHONE({ label: 'Téléphone', required: true }), EMAIL({ required: true }),
      f('contact_par', 'Moyen de contact préféré', 'radio', { required: true, options: ['Appel téléphonique', 'WhatsApp', 'Email'] }),
      f('sujet', 'Type de demande', 'select', { required: true, options: ['Requête de prière', 'Entretien avec un pasteur', 'Autre'] }),
      f('message', 'Motif de la demande', 'textarea', { required: true }),
      f('urgence', 'Urgence de la demande', 'radio', { required: true, width: 'half', options: ['Élevée', 'Moyenne', 'Faible'] }),
      f('preference', 'Pasteur préféré ou préférence de genre', 'radio', { required: true, width: 'half', options: ['Homme', 'Femme', 'Aucune préférence'] }),
      f('horaire', 'Meilleur moment pour vous joindre', 'radio', { required: true, options: ['Matin (8h – 12h)', 'Après-midi (12h – 16h)', 'Soir (16h – 20h)'] }),
    ],
  },

  first_timer: {
    title: 'Première visite',
    fields: [
      NAME('nom', 'Nom complet'), EMAIL({ required: true }), PHONE({ label: 'Téléphone', required: true }),
      f('genre', 'Genre', 'select', { required: true, options: ['Homme', 'Femme'] }),
      f('connu', 'Comment avez-vous connu la MDT ?', 'radio', { required: true, width: 'half', options: HEARD }),
      f('horaire', 'Moment préféré pour être appelé(e)', 'select', { required: true, width: 'half', options: ['À tout moment', '8h – 12h', '12h – 15h', '15h – 18h', '18h – 20h'] }),
      CAMPUS('lieu', 'Lieu visité'),
      f('message', 'Requête de prière', 'textarea'),
      f('accord', 'Oui, je suis d’accord pour que l’équipe de suivi du lieu visité me contacte au sujet de ma visite.', 'consent', { required: true }),
      f('infos', 'Je souhaite aussi recevoir des nouvelles des cultes, événements et actualités de la MDT.', 'consent'),
    ],
  },

  second_timer: {
    title: 'Deuxième visite',
    fields: [
      NAME('nom', 'Nom complet'), EMAIL({ required: true }), PHONE({ label: 'Téléphone', required: true }),
      CAMPUS('lieu', 'Lieu fréquenté', { width: 'half' }),
      f('genre', 'Genre', 'select', { required: true, width: 'half', options: ['Homme', 'Femme'] }),
      f('localisation', 'Adresse (quartier, ville)'),
      f('age', 'Tranche d’âge', 'select', { required: true, options: AGES }),
      f('classe', 'Souhaitez-vous vous inscrire à la classe de membres ?', 'select', { required: true, width: 'half', options: YN }),
      f('groupe', 'Souhaitez-vous rejoindre un groupe WhatsApp « Meet and Pray » ?', 'select', { required: true, width: 'half', options: YN }),
    ],
  },

  online_community: {
    title: 'Communauté en ligne',
    fields: [
      NAME(), EMAIL({ required: true }), PHONE({ label: 'Téléphone', required: true }),
      f('localisation', 'Localisation (ville, pays)', 'text', { required: true }),
      f('connu', 'Comment nous avez-vous connus ?', 'radio', { required: true, width: 'half', options: ['Réseaux sociaux', 'Invitation d’un ami ou d’un proche', 'Publicité en ligne', 'Autre'] }),
      f('premiere', 'Est-ce votre première participation à la MDT ?', 'radio', { required: true, width: 'half', options: YN }),
      f('apprecie', 'Qu’avez-vous le plus apprécié dans le culte d’aujourd’hui ?', 'textarea'),
      f('rejoindre', 'Souhaitez-vous rejoindre l’un des groupes suivants ?', 'select', { options: ['Communauté en ligne', 'Église de cellule', 'Équipe de bénévoles', 'Programme de discipulat'] }),
      f('priere', 'Requêtes de prière', 'textarea'),
      f('newsletter', 'Souhaitez-vous recevoir les nouvelles et lettres d’information ?', 'radio', { required: true, options: YN }),
    ],
  },

  class_enrol: {
    title: 'Classe de membres : nouvelle inscription',
    fields: [
      NAME(), EMAIL({ label: 'Adresse email', required: true }), PHONE({ required: true }),
      f('whatsapp', 'Pour les seules communications de la classe de membres, j’accepte d’être contacté(e) sur WhatsApp.', 'consent'),
      CAMPUS('lieu', 'Quel lieu de la MDT fréquentez-vous ?'),
      f('depuis', 'Depuis quand fréquentez-vous la MDT ?', 'date', { required: true, width: 'half' }),
      f('connu', 'Comment avez-vous connu la MDT ?', 'text', { required: true, width: 'half' }),
      f('equipe', 'Souhaitez-vous faire partie de l’équipe de service ?', 'radio', { required: true, options: ['Oui', 'Non', 'Pas encore décidé'] }),
      f('unites', 'Quelle unité de service vous intéresse ?', 'multi', { required: true, options: UNITS, showIf: { name: 'equipe', in: ['Oui', 'Pas encore décidé'] } }),
    ],
  },

  class_makeup: {
    title: 'Classe de membres : rattrapage',
    fields: [
      f('classes', 'Quel(s) cours avez-vous manqué(s) ?', 'multi', { required: true, options: ['MEM101', 'MEM102', 'MEM103', 'MEM104'] }),
      NAME(), EMAIL({ required: true }), PHONE({ required: true }),
      CAMPUS('lieu', 'Quel lieu de la MDT fréquentez-vous ?'),
      f('depuis', 'Depuis quand fréquentez-vous la MDT ?', 'date', { required: true, width: 'half' }),
      f('connu', 'Comment avez-vous connu la MDT ?', 'text', { required: true, width: 'half' }),
      f('equipe', 'Souhaitez-vous faire partie de l’équipe de service ?', 'radio', { required: true, options: YN }),
      f('unites', 'Indiquez l’unité de service qui vous intéresse', 'multi', { required: true, options: UNITS, showIf: { name: 'equipe', in: ['Oui'] } }),
    ],
  },

  class_certificate: {
    title: 'Classe de membres : classe terminée',
    fields: [
      NAME(), f('email', 'Email', 'email', { required: true }),
      f('termine', 'Quel jour avez-vous terminé l’école des membres ?', 'date', { required: true }),
      CAMPUS('lieu', 'Quel lieu de la MDT fréquentez-vous ?'),
    ],
  },

  pre_marital: {
    title: 'Accompagnement pré-mariage',
    fields: [
      NAME('nom', 'Votre nom'), NAME('partenaire', 'Nom de votre partenaire'),
      CAMPUS('lieu', 'Votre lieu MDT'),
      f('partenaire_mdt', 'Votre partenaire fréquente-t-il / elle la MDT ?', 'radio', { required: true, width: 'third', options: YN }),
      CAMPUS('partenaire_lieu', 'Lieu MDT de votre partenaire', { width: 'third', showIf: { name: 'partenaire_mdt', in: ['Oui'] } }),
      f('partenaire_eglise', 'Nom de l’église de votre partenaire', 'text', { required: true, width: 'third', showIf: { name: 'partenaire_mdt', in: ['Non'] } }),
      f('unite', 'Votre unité de service', 'multi', { options: UNITS }),
      f('partenaire_unite', 'Unité de service de votre partenaire', 'multi', { options: [...UNITS, 'Autre'] }),
      f('date', 'Date du mariage', 'date', { required: true, width: 'half' }),
      f('heure', 'Heure proposée pour l’entrée à l’église', 'time', { required: true, width: 'half' }),
      f('localisation', 'Adresse', 'text', { required: true }),
      f('officiant', 'Église qui célébrera le mariage', 'radio', { required: true, options: ['La Maison de la Transformation', 'Autre'] }),
      EMAIL({ label: 'Votre adresse email', required: true }),
      f('partenaire_email', 'Adresse email de votre partenaire', 'email', { required: true, width: 'half' }),
      PHONE({ label: 'Votre téléphone', required: true }),
      f('partenaire_tel', 'Téléphone de votre partenaire', 'tel', { required: true, width: 'half', placeholder: '+229 01 41 37 37 41' }),
    ],
  },

  post_marital: {
    title: 'Accompagnement post-mariage',
    fields: [
      NAME('nom', 'Votre nom'), NAME('conjoint', 'Nom de votre conjoint(e)'),
      f('date', 'Date du mariage', 'date', { required: true, width: 'half' }),
      f('enfants', 'Avez-vous des enfants ?', 'radio', { required: true, width: 'half', options: YN }),
      f('localisation', 'Pays et lieu de résidence', 'text', { required: true }),
      CAMPUS('lieu', 'Votre lieu MDT'),
      f('conjoint_mdt', 'Votre conjoint(e) fréquente-t-il / elle la MDT ?', 'radio', { required: true, width: 'half', options: YN }),
      f('conjoint_eglise', 'Nom de l’église de votre conjoint(e)', 'text', { required: true, width: 'half', showIf: { name: 'conjoint_mdt', in: ['Non'] } }),
      f('message', 'Pourquoi avez-vous besoin d’un accompagnement ?', 'textarea', { required: true }),
      f('conseiller', 'Avez-vous une préférence pour le type de conseiller ?', 'radio', { required: true, options: ['Non', 'Oui, précisez dans le motif'] }),
      EMAIL({ label: 'Votre adresse email', required: true }),
      f('conjoint_email', 'Adresse email de votre conjoint(e)', 'email', { required: true, width: 'half' }),
      PHONE({ label: 'Votre téléphone', required: true }),
      f('conjoint_tel', 'Téléphone de votre conjoint(e)', 'tel', { required: true, width: 'half', placeholder: '+229 01 41 37 37 41' }),
    ],
  },

  welfare: {
    title: 'Demande d’aide sociale',
    fields: [
      NAME(), f('telephone', 'Téléphone', 'tel', { required: true, width: 'third', placeholder: '+229 01 41 37 37 41' }), f('email', 'Email', 'email', { required: true, width: 'third' }),
      CAMPUS('lieu', 'Quel lieu fréquentez-vous ?', { width: 'third' }),
      f('localisation', 'Adresse', 'text', { required: true }),
      f('depuis', 'Depuis quand êtes-vous à la MDT ?', 'date'),
      f('classe', 'Avez-vous suivi la classe de membres ?', 'radio', { required: true, width: 'half', options: YN }),
      f('ouvrier', 'Faites-vous partie de l’équipe de service ?', 'radio', { required: true, width: 'half', options: YN }),
      f('unites', 'Si oui, dans quelle unité ?', 'multi', { required: true, options: UNITS, showIf: { name: 'ouvrier', in: ['Oui'] } }),
      f('map', 'À quel groupe MAP appartenez-vous ?', 'text', { required: true, width: 'half' }),
      f('besoin', 'De quel soutien avez-vous besoin ?', 'text', { required: true, width: 'half' }),
      f('message', 'Pourquoi avez-vous besoin de ce soutien ?', 'textarea', { required: true }),
      f('metier', 'Que faites-vous dans la vie ?', 'text', { required: true }),
      f('dette', 'Avez-vous des dettes ?', 'radio', { required: true, options: YN }),
      f('dette_detail', 'De quelle nature ?', 'textarea', { required: true, showIf: { name: 'dette', in: ['Oui'] } }),
      f('montant', 'Quel montant de soutien demandez-vous ?', 'radio', { required: true, options: ['10 000 – 25 000 FCFA', '25 000 – 50 000 FCFA', '50 000 – 100 000 FCFA', 'Autre'] }),
    ],
  },

  celebration: {
    title: 'Célébrations',
    fields: [
      NAME('nom', 'Nom complet'), NAME('conjoint', 'Nom de votre conjoint(e)'),
      EMAIL({ required: true }), PHONE({ label: 'Téléphone', required: true }),
      CAMPUS('lieu', 'Lieu MDT'),
      f('anciennete', 'Depuis combien de temps êtes-vous à la MDT ?', 'text', { required: true }),
      f('classe', 'Avez-vous suivi la classe de membres ?', 'radio', { required: true, options: YN }),
      f('evenement', 'Choisissez votre prochaine célébration', 'radio', { required: true, options: ['Action de grâce de mariage', 'Présentation d’enfant', 'Cérémonie de nomination', 'Autre'] }),
      f('ouvrier', 'Faites-vous partie de l’équipe de service ?', 'radio', { required: true, options: YN }),
      f('date', 'Date proposée', 'date', { required: true }),
    ],
  },

  testimony: {
    title: 'Témoignage',
    intro: 'Veuillez partager votre témoignage…',
    fields: [
      NAME(), PHONE({ label: 'Téléphone', required: true }), EMAIL({ required: true }),
      CAMPUS('lieu', 'Lieu', { width: 'half' }),
      f('mode', 'Comment souhaitez-vous partager votre témoignage ?', 'select', { required: true, width: 'half', options: ['Par écrit', 'Par vidéo (lien)', 'Les deux'] }),
      f('message', 'Écrivez votre témoignage', 'textarea', { required: true, showIf: { name: 'mode', in: ['Par écrit', 'Les deux'] } }),
      f('video', 'Lien de votre vidéo (YouTube, Drive, WhatsApp…)', 'text', { required: true, showIf: { name: 'mode', in: ['Par vidéo (lien)', 'Les deux'] } }),
      f('justificatif', 'Disposez-vous d’un résultat ou d’un document qui confirme votre témoignage ? (nous vous le demanderons ensuite)', 'select', { required: true, options: ['Oui', 'Non'] }),
      f('presentiel', 'Souhaitez-vous partager votre témoignage en personne pendant le culte ?', 'select', { required: true, width: 'half', options: YN }),
      f('culte', 'Quel culte ?', 'select', { required: true, width: 'half', options: ['Premier culte (08h00)', 'Deuxième culte (17h00)'], showIf: { name: 'presentiel', in: ['Oui'] } }),
      f('publier', 'J’autorise la publication de mon témoignage', 'consent'),
    ],
  },

  donation: {
    title: 'Annoncer un don',
    fields: [
      NAME(), PHONE({ label: 'Téléphone', required: true }), EMAIL(),
      CAMPUS('lieu', 'Donner à quel lieu ?'),
      f('nature', 'Que souhaitez-vous donner ?', 'radio', { required: true, options: ['Offrande', 'Dîme', 'Loyer', 'Projet de construction', 'Spécial'] }),
      f('montant', 'Montant (FCFA)', 'text', { width: 'half', placeholder: '25 000' }),
      f('moyen', 'Moyen de paiement', 'select', { width: 'half', options: ['MTN MoMo', 'Moov Money', 'Virement bancaire', 'Sur place'] }),
    ],
  },

  helpline_volunteer: {
    title: 'Bénévoles de la ligne d’écoute',
    fields: [
      NAME(), f('genre', 'Genre', 'select', { required: true, width: 'half', options: ['Homme', 'Femme'] }), EMAIL({ required: true }),
      f('telephone', 'Numéro de téléphone', 'tel', { required: true }),
      CAMPUS('lieu', 'Lieu fréquenté'),
      f('profession', 'Profession', 'select', { required: true, options: ['Conseiller certifié', 'Psychiatre', 'Psychologue', 'Thérapeute', 'Autres'] }),
      f('profession_autre', 'Si autres, précisez', 'text', { required: true, showIf: { name: 'profession', in: ['Autres'] } }),
      f('licence', 'Quand avez-vous obtenu votre licence ?', 'date', { required: true }),
      f('justificatif', 'Lien vers vos diplômes et attestations (Drive, Dropbox…)', 'url', { required: true }),
    ],
  },

  seniors_connect: {
    title: 'Seniors Connect : base de données',
    fields: [
      NAME(), PHONE({ label: 'Téléphone', required: true }), EMAIL({ required: true }),
      CAMPUS('lieu', 'Quel lieu MDT fréquentez-vous actuellement ?'),
      f('localisation', 'Adresse', 'text'),
      f('genre', 'Genre', 'select', { required: true, width: 'half', options: ['Homme', 'Femme'] }),
      f('relation', 'Situation matrimoniale', 'select', { required: true, width: 'half', options: ['Célibataire', 'Marié(e)', 'Divorcé(e)', 'Veuf / Veuve', 'Séparé(e)'] }),
      f('annee', 'En quelle année avez-vous rejoint la MDT ?', 'text', { required: true, width: 'half' }),
      f('age', 'Tranche d’âge', 'select', { width: 'half', options: ['40 - 50', '50 - 60', '60 ans et plus'] }),
    ],
  },

  feedback: {
    title: 'Enquête de satisfaction',
    anonymous: true,
    fields: [
      f('email', 'Email', 'email'),
      CAMPUS('lieu', 'Lieux', { required: false }),
      f('programme', 'Programme spécial', 'select', { options: ['Culte de célébration', 'Mercredi de Gloire', 'Classe de membres', 'Veillée des célibataires', 'Conférence mariage', 'Conférence parentalité', 'Conférence des hommes', 'Conférence des femmes', 'Camp', 'Jeunesse', 'Autre'] }),
      f('s1', 'Enseignement', 'section'),
      f('enseignement', 'Comment évaluez-vous la qualité de l’enseignement ? (1 : faible, 5 : excellent)', 'rating'),
      f('enseignement_note', 'Qu’avez-vous retenu de l’enseignement ?', 'textarea'),
      f('s2', 'Louange et adoration', 'section'),
      f('louange', 'Comment évaluez-vous la louange ? (1 : faible, 5 : excellent)', 'rating'),
      f('s3', 'Accueil et organisation', 'section'),
      f('accueil', 'Comment évaluez-vous l’accueil ? (1 : faible, 5 : excellent)', 'rating'),
      f('organisation', 'Comment évaluez-vous l’organisation (horaires, places, son) ? (1 : faible, 5 : excellent)', 'rating'),
      f('s4', 'Vos suggestions', 'section'),
      f('message', 'Autres suggestions ou commentaires', 'textarea'),
    ],
  },

  protocol_attendance: {
    title: 'Rapport de présence du protocole',
    fields: [
      NAME(), EMAIL({ required: true }), PHONE({ label: 'Téléphone', required: true }),
      CAMPUS('lieu', 'Lieu', { width: 'half' }),
      f('culte', 'Type de culte', 'select', { required: true, width: 'half', options: ['Culte du dimanche', 'Culte de semaine', 'Culte spécial'] }),
      f('total', 'Total général', 'number', { required: true, width: 'half' }),
      f('hommes', 'Hommes adultes', 'number', { required: true, width: 'half' }),
      f('femmes', 'Femmes adultes', 'number', { required: true, width: 'half' }),
      f('ados', 'Adolescents', 'number', { required: true, width: 'half' }),
      f('enfants', 'Enfants', 'number', { required: true }),
      f('message', 'Commentaire', 'textarea', { required: true }),
    ],
  },

  youth_feedback: {
    title: 'Jeunesse : retour d’expérience',
    anonymous: true,
    fields: [
      f('experience', 'Comment évaluez-vous votre expérience globale ? (1 : faible, 5 : excellente)', 'rating', { required: true }),
      f('enseignements', 'Les enseignements étaient-ils pertinents et marquants ? (1 : pas pertinents, 5 : très pertinents)', 'rating', { required: true }),
      f('interactif', 'L’événement était-il assez dynamique et interactif ?', 'radio', { required: true, options: YN }),
      f('musique', 'Comment évaluez-vous la musique ? (1 : faible, 5 : excellente)', 'rating', { required: true }),
      f('moment', 'Quel artiste ou quel moment vous a le plus marqué ?', 'text', { required: true }),
      f('jeux', 'Comment évaluez-vous les jeux et activités ? (1 : ennuyeux, 5 : très amusant)', 'rating'),
      f('jeu_prefere', 'Quel jeu ou quelle activité avez-vous préféré ?', 'text', { required: true }),
      f('jeux_inclusifs', 'Les jeux étaient-ils inclusifs pour tous ?', 'radio', { required: true, options: YN }),
      f('organisation', 'Comment évaluez-vous l’organisation (accueil, places, horaires) ? (1 : faible, 5 : excellente)', 'rating', { required: true }),
      f('lieu_ok', 'Le lieu était-il confortable et accessible ?', 'radio', { required: true, options: YN }),
      f('lieu_pb', 'Si non, quelles ont été les difficultés ?', 'text', { showIf: { name: 'lieu_ok', in: ['Non'] } }),
      f('message', 'Autres suggestions ou commentaires', 'textarea', { required: true }),
    ],
  },

  pfl: {
    title: 'Préparer sa vie',
    fields: [
      f('email', 'Email', 'email', { required: true }), NAME(), f('telephone', 'Téléphone', 'tel', { required: true }),
      f('cours', 'Filière', 'text', { required: true }),
      f('institution', 'Établissement', 'radio', { required: true, options: ['Université d’Abomey-Calavi', 'Université de Lomé', 'Autres'] }),
      f('niveau', 'Niveau', 'radio', { required: true, options: ['Licence 1', 'Licence 2', 'Licence 3', 'Master 1', 'Master 2', 'Doctorat', 'Autres'] }),
      f('interet', 'Domaine d’intérêt', 'radio', { required: true, options: ['Affaires', 'Carrière', 'Entrepreneuriat créatif', 'Travail indépendant', 'Autres'] }),
      f('connu', 'Comment avez-vous entendu parler de la formation ?', 'radio', { required: true, options: ['Instagram', 'Facebook', 'Annonces à l’église', 'Un ami', 'Un influenceur', 'Une lettre d’information'] }),
      f('objectif', 'Qu’espérez-vous obtenir de cette formation ?', 'text', { required: true }),
    ],
  },

  camp_registration: {
    title: 'Camp : inscription',
    fields: [
      NAME(), f('email', 'Adresse email', 'email'), f('telephone', 'Téléphone (de préférence WhatsApp)', 'tel', { required: true }),
      CAMPUS('lieu', 'Quel lieu, cellule ou communauté MDT fréquentez-vous ?', { width: 'half' }),
      f('unite', 'Dans quelle unité de service êtes-vous ?', 'select', { required: true, width: 'half', options: [...UNITS, 'Je n’ai pas encore rejoint d’unité'] }),
      f('presence', 'Souhaitez-vous participer sur place ?', 'multi', { required: true, options: ['Oui, je veux participer', 'Non, je ne peux pas', 'Peut-être, pas encore sûr(e)'] }),
      f('nuits', 'Combien de jours comptez-vous participer ?', 'multi', { required: true, options: ['3 nuits', '2 nuits', '1 nuit'] }),
      f('jours', 'Quels jours comptez-vous participer ?', 'multi', { required: true, options: ['Jeudi', 'Vendredi', 'Samedi', 'Dimanche (départ avant 11h)'] }),
      f('chambre', 'Type de chambre souhaité (tarifs communiqués après inscription)', 'multi', { required: true, options: ['Chambre double (convient aux familles)', 'Chambre simple'] }),
      f('enfants', 'Viendrez-vous avec des enfants ?', 'radio', { required: true, options: YN }),
      f('enfants_detail', 'Combien d’enfants de 4 à 11 ans ? Précisez l’âge de chacun', 'text', { required: true, showIf: { name: 'enfants', in: ['Oui'] } }),
      f('transport', 'Avez-vous besoin d’un transport depuis votre lieu ?', 'multi', { required: true, options: ['Oui, je souhaite rejoindre un car subventionné', 'Non, j’organise mon transport'] }),
      f('regime', 'Indiquez vos éventuelles contraintes alimentaires', 'text'),
      f('besoins', 'Vous ou un membre de votre famille avez-vous des besoins spécifiques ou d’accessibilité ?', 'multi', { required: true, options: YN }),
      f('benevole', 'Souhaitez-vous servir dans un département ?', 'multi', { options: ['Oui, je souhaite servir', 'Non, merci'] }),
      f('departement', 'Choisissez le département', 'multi', { options: ['Entraide', 'Protocole', 'Enfants', 'Médias (photo et vidéo)', 'Ambiance ou son', 'Réseaux sociaux', 'Santé'] }),
      f('infos', 'Souhaitez-vous être ajouté(e) à la liste d’information du camp ?', 'multi', { required: true, options: ['Oui, tenez-moi informé(e)', 'Non, merci'] }),
      f('message', 'Commentaires ou questions complémentaires', 'textarea'),
      f('accord', 'Je comprends que ce formulaire ne garantit pas une place tant que les instructions de réservation et de paiement n’ont pas été envoyées et suivies.', 'consent', { required: true }),
    ],
  },

  legacy_fellow: {
    title: 'Programme Legacy Fellows : candidature',
    fields: [
      NAME('nom', 'Nom complet (prénom, nom)'), f('email', 'Adresse email', 'email', { required: true }), f('telephone', 'Téléphone (de préférence WhatsApp)', 'tel', { required: true }),
      f('genre', 'Genre', 'select', { required: true, options: ['Homme', 'Femme'] }),
      CAMPUS('lieu', 'Lieu MDT'),
      f('certificat', 'Lien vers votre certificat de membre (partagez le lien ci-dessous)', 'url', { required: true }),
      f('lettre', 'Lien vers la lettre de recommandation du pasteur résident', 'url', { required: true }),
      f('residence', 'Pays de résidence', 'country', { required: true }),
      f('nationalite', 'Nationalité', 'country', { required: true }),
      f('parcours', 'Bref résumé de votre parcours (150 mots maximum)', 'textarea', { required: true }),
      f('projet', 'Avez-vous actuellement un projet d’héritage ?', 'radio', { required: true, options: ['Oui', 'Non', 'Peut-être'] }),
      f('projet_desc', 'Si oui, décrivez brièvement votre projet (avec l’impact prévu)', 'textarea', { required: true, showIf: { name: 'projet', in: ['Oui'] } }),
      f('probleme', 'Quel problème votre projet cherche-t-il à résoudre, et pourquoi est-ce important pour vous ?', 'textarea', { required: true }),
      f('cible', 'Quel est votre public cible ou groupe bénéficiaire ?', 'text', { required: true }),
      f('stade', 'À quel stade est actuellement votre projet ?', 'radio', { required: true, options: ['Idée', 'Planification', 'Phase pilote', 'Déjà en cours', 'Autre'] }),
      f('theme', 'Expliquez brièvement comment le projet incarne le thème de l’année Legacy : montrer concrètement l’amour de Dieu et l’amour des autres.', 'textarea', { required: true }),
      f('video', 'Enregistrez une vidéo d’une minute présentant votre projet et son impact (lien)', 'url', { required: true }),
      f('pourquoi', 'Pourquoi voulez-vous faire partie de la fraternité Legacy ?', 'textarea', { required: true }),
      f('croissance', 'Comment cette fraternité vous aidera-t-elle à grandir personnellement et professionnellement ?', 'textarea', { required: true }),
      f('heritage', 'Quel héritage espérez-vous laisser à travers votre projet ou l’œuvre de votre vie ?', 'textarea', { required: true }),
      f('disponible', 'Êtes-vous disponible pour 3 mois de fraternité virtuelle, avec des sessions toutes les deux semaines et des points réguliers ?', 'radio', { required: true, options: ['Oui', 'Non', 'Peut-être'] }),
      f('connu', 'Comment avez-vous entendu parler de la fraternité Legacy ?', 'radio', { required: true, options: ['Instagram', 'Lettre d’information de l’église', 'Un ami', 'Annonce à l’église', 'Groupe WhatsApp de l’église'] }),
    ],
  },

  legacy_spotlight: {
    title: 'Legacy : projets à l’honneur',
    fields: [
      NAME('nom', 'Nom complet (prénom, nom)'), f('email', 'Adresse email', 'email', { required: true }), f('telephone', 'Téléphone (de préférence WhatsApp)', 'tel', { required: true }),
      f('genre', 'Genre', 'select', { required: true, options: ['Homme', 'Femme'] }),
      CAMPUS('lieu', 'Lieu MDT'),
      f('reseaux', 'Comptes de réseaux sociaux (Instagram, X…)', 'text', { required: true }),
      f('certificat', 'Lien vers votre certificat de membre (partagez le lien ci-dessous)', 'url', { required: true }),
      f('projet', 'Titre et bref résumé de votre projet (150 mots maximum), avec l’impact visé', 'textarea', { required: true }),
      f('cible', 'Quel est votre public cible ou bénéficiaire, et le lieu du projet ?', 'textarea', { required: true }),
      f('probleme', 'Quel problème votre projet visait-il à résoudre, et pourquoi est-ce important pour vous ?', 'textarea', { required: true }),
      f('theme', 'Expliquez brièvement comment le projet incarne le thème de l’année Legacy : montrer concrètement l’amour de Dieu et l’amour des autres.', 'textarea', { required: true }),
      f('resultats', 'Indiquez les résultats clés et les effets directs du projet (ex. : « 50 enfants ont reçu des kits scolaires »)', 'textarea', { required: true }),
      f('medias', 'Lien vers une vidéo témoignage d’une minute, des photos et une vidéo de synthèse du projet', 'url', { required: true }),
      f('partenaires', 'Noms et comptes Instagram des co-réalisateurs, le cas échéant', 'text'),
    ],
  },

  volunteer: {
    title: 'Bénévoles',
    fields: [
      NAME(), EMAIL({ required: true }), PHONE({ label: 'Téléphone WhatsApp', required: true }),
      f('classe', 'Avez-vous suivi la classe de membres ?', 'select', { required: true, options: YN }),
      f('ouvrier', 'Faites-vous actuellement partie d’une équipe de service ?', 'radio', { required: true, options: YN }),
      f('unite_actuelle', 'Dans quelle unité êtes-vous ?', 'select', { required: true, width: 'half', options: UNITS, showIf: { name: 'ouvrier', in: ['Oui'] } }),
      f('ministere', 'Dans quelle unité souhaitez-vous servir ?', 'select', { required: true, width: 'half', options: UNITS }),
      CAMPUS('lieu', 'Lieu', { required: false }),
    ],
  },
};

export const NO_PERSON = new Set(Object.entries(FORMS).filter(([, v]) => v.anonymous).map(([k]) => k));
export const FORM_TYPES = Object.keys(FORMS);

// Champs visibles selon showIf
export const isShown = (field, values) => !field.showIf || field.showIf.in.includes(values[field.showIf.name]);
