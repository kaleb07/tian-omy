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
    fullName: "Tian [Nama Lengkap]",
    parents: "Putra dari Bapak [Nama Ayah] & Ibu [Nama Ibu]",
    photo: "/couple/groom.jpg",
    instagram: "https://www.instagram.com/kristiandwihp?igsi=MTBrbGx5eDNrajhoZg==",
  },
  bride: {
    name: "Omy",
    fullName: "Omy [Nama Lengkap]",
    parents: "Putri dari Bapak [Nama Ayah] & Ibu [Nama Ibu]",
    photo: "/couple/bride.jpg",
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
    { bank: "BCA", accountNumber: "1234567890", accountHolder: "Tian" },
    { bank: "Mandiri", accountNumber: "0987654321", accountHolder: "Omy" },
  ] satisfies BankAccount[],

  music: {
    enabled: false,
    src: "/audio/music.mp3",
  },

  rsvpApiPath: "/api/rsvp",
  messagesApiPath: "/api/messages",
};
