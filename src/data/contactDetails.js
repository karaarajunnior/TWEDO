export const CONTACT_EMAIL = 'tewedouganda@gmail.com';
export const CONTACT_EMAILS = [CONTACT_EMAIL];
export const CONTACT_MAILTO = CONTACT_EMAILS.join(',');

export const CONTACT_NUMBERS = [
  {
    label: '0777 676 436',
    tel: '+256777676436',
    whatsapp: '256777676436'
  }
];

export const buildWhatsappUrl = (message) =>
  `https://wa.me/${CONTACT_NUMBERS[0].whatsapp}?text=${encodeURIComponent(message)}`;
