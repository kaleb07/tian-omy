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

// TODO: ganti seluruh nilai di bawah ini dengan data pernikahan sesungguhnya.
export const weddingConfig = {
  groom: {
    name: "Tian",
    fullName: "Kristian Dwi Hartono Putro",
    parents: "Putra dari Bapak Djoko Soehartono Putro & Ibu Sri Soeryani",
    photo: "/selfie/groom-v2.JPG",
    instagram: "https://www.instagram.com/kristiandwihp?igsi=MTBrbGx5eDNrajhoZg==",
  },
  bride: {
    name: "Omy",
    fullName: "Naomy Simanungkalit",
    parents: "Putri dari Bapak Sintong Simanungkalit & Ibu Hertaida Siburian",
    photo: "/selfie/bride.JPG",
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

  heroImages: [
    "/hero/BUD07950.jpg",
    "/hero/BUD08410.jpg",
    "/hero/BUD08507.jpg",
  ],

  backgroundImages: [
    "/background/BUD07941-Edit.jpg",
    "/background/BUD08564.jpg",
    "/background/BUD08745-Edit.jpg",
    "/background/BUD09046-Edit.jpg",
  ],

  gallery: [
    { src: "/gallery/BUD08667.jpg", alt: "Foto 1" },
    { src: "/gallery/BUD08745-Edit.jpg", alt: "Foto 2" },
    { src: "/gallery/BUD08925-Edit.jpg", alt: "Foto 3" },
    { src: "/gallery/BUD08932-Edit.jpg", alt: "Foto 4" },
    { src: "/gallery/BUD09046-Edit.jpg", alt: "Foto 5" },
    { src: "/gallery/BUD09201.jpg", alt: "Foto 6" },
    { src: "/gallery/BUD09238.jpg", alt: "Foto 7" },
    { src: "/gallery/BUD09448.jpg", alt: "Foto 8" },
  ] satisfies GalleryImage[],

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
