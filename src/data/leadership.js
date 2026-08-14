const toAssetUrl = (assetPath) => `/assets/${assetPath.split('/').map(encodeURIComponent).join('/')}`;

export const primaryContact = {
  email: 'tewedouganda@gmail.com',
  localPhone: '0777676436',
  internationalPhone: '+256777676436'
};

export const founders = [
  {
    name: 'Among Dinah Grace',
    role: 'Director',
    qualification: "Bachelor's degree in Social Work and Social Administration",
    image: toAssetUrl('leadership/board/board-grace.jpg')
  },
  // {
  //   name: 'Oluka Samuel Akol',
  //   role: 'Co-Director',
  //   qualification: "Bachelor's degree in Human Medicine and Surgery",
  //   image: toAssetUrl('district_meeting/WhatsApp Image 2026-05-11 at 19.29.34.jpeg')
  // }
];

export const boardOfDirectors = [
  {
    name: 'Akurut Angella',
    role: 'Board Chair',
    image: toAssetUrl('district_meeting/WhatsApp Image 2026-05-11 at 19.29.35.jpeg')
  },
  {
    name: 'Ekodeu Ricard',
    role: 'Board Member',
    image: toAssetUrl('district_meeting/WhatsApp Image 2026-05-11 at 19.29.37.jpeg')
  },
  {
    name: 'Rev. Fr Opure Deo',
    role: 'Board Treasurer',
    image: toAssetUrl('district_meeting/WhatsApp Image 2026-05-11 at 19.29.40.jpeg')
  },
  {
    name: 'Edith',
    role: 'Board Member',
    image: toAssetUrl('info_gathering/WhatsApp Image 2026-05-11 at 19.30.14.jpeg')
  },
  {
    name: 'Among Dinah Grace',
    role: 'Board Secretary',
    image: toAssetUrl('leadership/board/board-grace.jpg')
  }
];

export const leadershipPhotos = [...founders, ...boardOfDirectors];
