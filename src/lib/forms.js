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

export const FORM_TYPES = Object.keys(FORMS);

// Champs visibles selon showIf
export const isShown = (field, values) => !field.showIf || field.showIf.in.includes(values[field.showIf.name]);
