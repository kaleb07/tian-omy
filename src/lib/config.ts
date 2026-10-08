export type EventDetail = {
  label: string;
  dateLabel: string;
  timeLabel: string;
  venueName: string;
  venueAddress: string;
  mapsUrl: string;
};

export type BankAccount = {
  bank: string;
  accountNumber: string;
  accountHolder: string;
};

export type GalleryImage = {
  src: string;
  alt: string;
};

const cloudinaryBackground = {
  "BUD07950.jpg": "https://res.cloudinary.com/dnq9io0mf/image/upload/v1791476280/kristian-omy/background/BUD07950.jpg",
  "BUD07941-Edit.jpg": "https://res.cloudinary.com/dnq9io0mf/image/upload/v1791476277/kristian-omy/background/BUD07941-Edit.jpg",
  "BUD08745-Edit.jpg": "https://res.cloudinary.com/dnq9io0mf/image/upload/v1791476273/kristian-omy/background/BUD08745-Edit.jpg",
  "BUD08564.jpg": "https://res.cloudinary.com/dnq9io0mf/image/upload/v1791476271/kristian-omy/background/BUD08564.jpg",
  "BUD09046-Edit.jpg": "https://res.cloudinary.com/dnq9io0mf/image/upload/v1791476264/kristian-omy/background/BUD09046-Edit.jpg",
} as const;

const cloudinaryCover = {
  "cover.jpg": "https://res.cloudinary.com/dnq9io0mf/image/upload/v1791476344/kristian-omy/cover/cover.jpg",
  "flower-side.png": "https://res.cloudinary.com/dnq9io0mf/image/upload/v1791476326/kristian-omy/cover/flower-side.png",
  "cover.svg": "https://res.cloudinary.com/dnq9io0mf/image/upload/v1791476352/kristian-omy/cover.svg",
} as const;

const cloudinaryEventDetails = {
  "BUD08507.jpg": "https://res.cloudinary.com/dnq9io0mf/image/upload/v1791476362/kristian-omy/eventDetails/BUD08507.jpg",
} as const;

const cloudinaryFooter = {
  "BUD08632.jpg": "https://res.cloudinary.com/dnq9io0mf/image/upload/v1791476420/kristian-omy/footer/BUD08632.jpg",
} as const;

const cloudinaryHero = {
  "BUD07950.jpg": "https://res.cloudinary.com/dnq9io0mf/image/upload/v1791476429/kristian-omy/hero/BUD07950.jpg",
  "BUD08410.jpg": "https://res.cloudinary.com/dnq9io0mf/image/upload/v1791476385/kristian-omy/hero/BUD08410.jpg",
  "BUD08507.jpg": "https://res.cloudinary.com/dnq9io0mf/image/upload/v1791476416/kristian-omy/hero/BUD08507.jpg",
} as const;

const cloudinaryLetterName = {
  "letter-name.png": "https://res.cloudinary.com/dnq9io0mf/image/upload/v1791476371/kristian-omy/letterName/letter-name.png",
} as const;

const cloudinarySelfie = {
  "bride.jpg": "https://res.cloudinary.com/dnq9io0mf/image/upload/v1791476439/kristian-omy/selfie/bride.jpg",
  "groom-v2.jpg": "https://res.cloudinary.com/dnq9io0mf/image/upload/v1791476431/kristian-omy/selfie/groom-v2.jpg",
} as const;

const cloudinaryGallery = {
  "BUD08667.jpg": "https://res.cloudinary.com/dnq9io0mf/image/upload/v1791476422/kristian-omy/gallery/BUD08667.jpg",
  "BUD08745-Edit.jpg": "https://res.cloudinary.com/dnq9io0mf/image/upload/v1791476395/kristian-omy/gallery/BUD08745-Edit.jpg",
  "BUD08925-Edit.jpg": "https://res.cloudinary.com/dnq9io0mf/image/upload/v1791476377/kristian-omy/gallery/BUD08925-Edit.jpg",
  "BUD08932-Edit.jpg": "https://res.cloudinary.com/dnq9io0mf/image/upload/v1791476388/kristian-omy/gallery/BUD08932-Edit.jpg",
  "BUD09046-Edit.jpg": "https://res.cloudinary.com/dnq9io0mf/image/upload/v1791476379/kristian-omy/gallery/BUD09046-Edit.jpg",
  "BUD09201.jpg": "https://res.cloudinary.com/dnq9io0mf/image/upload/v1791476407/kristian-omy/gallery/BUD09201.jpg",
  "BUD09238.jpg": "https://res.cloudinary.com/dnq9io0mf/image/upload/v1791476436/kristian-omy/gallery/BUD09238.jpg",
  "BUD09448.jpg": "https://res.cloudinary.com/dnq9io0mf/image/upload/v1791476403/kristian-omy/gallery/BUD09448.jpg",
  "cover.jpg": "https://res.cloudinary.com/dnq9io0mf/image/upload/v1791476389/kristian-omy/gallery/cover.jpg",
} as const;

// TODO: ganti seluruh nilai di bawah ini dengan data pernikahan sesungguhnya.
export const weddingConfig = {
  groom: {
    name: "Tian",
    fullName: "Kristian Dwi Hartono Putro",
    parents: "Putra dari Bapak Djoko Soehartono Putro & Ibu Sri Soeryani",
    photo: cloudinarySelfie["groom-v2.jpg"],
    instagram: "https://www.instagram.com/kristiandwihp?igsi=MTBrbGx5eDNrajhoZg==",
  },
  bride: {
    name: "Omy",
    fullName: "Naomy Simanungkalit",
    parents: "Putri dari Bapak Sintong Simanungkalit & Ibu Hertaida Siburian",
    photo: cloudinarySelfie["bride.jpg"],
    instagram: "https://www.instagram.com/omykalit?igsi=MWhvOXJsZGlxbTh6aw==",
  },

  // Format ISO dengan offset zona waktu, dipakai untuk hitung mundur.
  weddingDateISO: "2026-11-07T09:00:00+07:00",

  event: {
    label: "Pemberkatan & Resepsi",
    dateLabel: "Sabtu, 7 November 2026",
    timeLabel: "09.00 WIB – Selesai",
    venueName: "Gereja GSRI Sipitupitu",
    venueAddress: "Narumonda VI, Siantar Narumonda, Toba, Sumatera Utara",
    mapsUrl: "https://maps.app.goo.gl/LzJUkwyZtwNw4nGQ9",
  } satisfies EventDetail,

  // Dipakai oleh desain v2 (src/components-v2), yang menampilkan dua acara terpisah.
  ceremony: {
    label: "Pemberkatan Nikah",
    dateLabel: "Sabtu, 7 November 2026",
    timeLabel: "09.00 WIB – Selesai",
    venueName: "Gereja GSRI Sipitupitu",
    venueAddress: "Narumonda VI, Siantar Narumonda, Toba, Sumatera Utara",
    mapsUrl: "https://maps.app.goo.gl/LzJUkwyZtwNw4nGQ9",
  } satisfies EventDetail,

  reception: {
    label: "Resepsi",
    dateLabel: "Sabtu, 7 November 2026",
    timeLabel: "11.30 WIB – Selesai",
    venueName: "Gereja GSRI Sipitupitu",
    venueAddress: "Narumonda VI, Siantar Narumonda, Toba, Sumatera Utara",
    mapsUrl: "https://maps.app.goo.gl/LzJUkwyZtwNw4nGQ9",
  } satisfies EventDetail,

  heroImages: [
    cloudinaryHero["BUD07950.jpg"],
    cloudinaryHero["BUD08410.jpg"],
    cloudinaryHero["BUD08507.jpg"],
  ],
  homeHero: cloudinaryHero["BUD08507.jpg"],

  coverPhoto: cloudinaryCover["cover.jpg"],
  coverFlower: cloudinaryCover["flower-side.png"],
  coverSvg: cloudinaryCover["cover.svg"],
  coverBackground: cloudinaryBackground["BUD07950.jpg"],
  eventDetailsPhoto: cloudinaryEventDetails["BUD08507.jpg"],
  footerPhoto: cloudinaryFooter["BUD08632.jpg"],
  introBackground: cloudinaryBackground["BUD09046-Edit.jpg"],
  letterName: cloudinaryLetterName["letter-name.png"],
  backgroundImages: [
    cloudinaryBackground["BUD07941-Edit.jpg"],
    cloudinaryBackground["BUD08564.jpg"],
    cloudinaryBackground["BUD08745-Edit.jpg"],
    cloudinaryBackground["BUD09046-Edit.jpg"],
  ],

  gallery: [
    { src: cloudinaryGallery["BUD08667.jpg"], alt: "Foto 1" },
    { src: cloudinaryGallery["BUD08745-Edit.jpg"], alt: "Foto 2" },
    { src: cloudinaryGallery["BUD08925-Edit.jpg"], alt: "Foto 3" },
    { src: cloudinaryGallery["BUD08932-Edit.jpg"], alt: "Foto 4" },
    { src: cloudinaryGallery["BUD09046-Edit.jpg"], alt: "Foto 5" },
    { src: cloudinaryGallery["BUD09201.jpg"], alt: "Foto 6" },
    { src: cloudinaryGallery["BUD09238.jpg"], alt: "Foto 7" },
    { src: cloudinaryGallery["BUD09448.jpg"], alt: "Foto 8" },
  ] satisfies GalleryImage[],
  galleryCover: cloudinaryGallery["cover.jpg"],

  bankAccounts: [
    { bank: "BNI", accountNumber: "0348774139", accountHolder: "Naomy Simanungkalit" },
  ] satisfies BankAccount[],

  music: {
    enabled: true,
    src: "/audio/music.mpeg",
  },

  rsvpApiPath: "/api/rsvp",
  messagesApiPath: "/api/messages",
};
