// Indicatifs téléphoniques (Bénin et Togo en tête : la MDT y est implantée) et liste des pays.
export const DIAL_CODES = [
  ['Bénin', '+229'], ['Togo', '+228'], ['Côte d’Ivoire', '+225'], ['Nigeria', '+234'], ['Ghana', '+233'], ['Burkina Faso', '+226'],
  ['Niger', '+227'], ['Mali', '+223'], ['Sénégal', '+221'], ['Cameroun', '+237'], ['Gabon', '+241'], ['Congo', '+242'],
  ['RD Congo', '+243'], ['France', '+33'], ['Belgique', '+32'], ['Suisse', '+41'], ['Allemagne', '+49'], ['Royaume-Uni', '+44'],
  ['Canada / États-Unis', '+1'], ['Autre', '+'],
];

const CODES = 'AF AL DZ AD AO AR AM AU AT AZ BS BH BD BB BY BE BJ BT BO BA BW BR BN BG BF BI KH CM CA CV CF TD CL CN CO KM CG CD CR CI HR CU CY CZ DK DJ DO EC EG SV GQ ER EE SZ ET FI FR GA GM GE DE GH GR GN GW HT HN HK HU IS IN ID IR IQ IE IL IT JM JP JO KZ KE KR KW LB LS LR LY LU MG MW MY ML MT MR MU MX MD MA MZ NA NP NL NZ NE NG NO OM PK PA PY PE PH PL PT QA RO RU RW SN RS SL SG SK SI SO ZA ES LK SD SE CH SY TW TZ TH TG TN TR UG UA AE GB US UY UZ VE VN YE ZM ZW'.split(' ');

export function countryNames() {
  try {
    const dn = new Intl.DisplayNames(['fr'], { type: 'region' });
    return CODES.map((c) => dn.of(c)).sort((a, b) => a.localeCompare(b, 'fr'));
  } catch { return ['Bénin', 'Togo']; }
}
