export interface ServiceItem {
  name: string;
  price: string;
}

export interface ServiceCategory {
  category: string;
  subcategories?: {
    name: string;
    items: ServiceItem[];
  }[];
  items?: ServiceItem[];
}

export const spaServices: ServiceCategory[] = [
  {
    category: "Body Waxing",
    items: [
      { name: "Under Arm", price: "₦10,000" },
      { name: "Half Leg", price: "₦20,000" },
      { name: "Full Leg", price: "₦30,000" },
      { name: "Half Hand", price: "₦20,000" },
      { name: "Full Hand", price: "₦30,000" },
      { name: "Facial Waxing", price: "₦20,000" },
      { name: "Chin", price: "₦10,000" },
      { name: "Bikini", price: "₦30,000" },
      { name: "Half Body", price: "₦50,000" },
      { name: "Full Body", price: "₦80,000" },
    ],
  },
  {
    category: "Skin Tag Care",
    items: [{ name: "Per Area", price: "₦40,000" }],
  },
  {
    category: "Ultra Cavitation Body Sculpting",
    items: [
      { name: "Arms", price: "₦35,000" },
      { name: "Thighs", price: "₦35,000" },
      { name: "Tummy", price: "₦45,000" },
      { name: "Waist Line", price: "₦45,000" },
      { name: "Back", price: "₦45,000" },
      { name: "Combo (Waist Line, Tummy, Back)", price: "₦120,000" },
      { name: "Vibro Sculpting", price: "₦35,000" },
      { name: "Wood Sculpting", price: "₦80,000" },
    ],
  },
  {
    category: "Skin Smoothing",
    items: [
      { name: "Arms (Both)", price: "₦60,000" },
      { name: "Thighs (Both)", price: "₦60,000" },
      { name: "Tummy", price: "₦60,000" },
      { name: "Full Body", price: "₦150,000" },
    ],
  },
  {
    category: "HA Fillers",
    items: [
      { name: "80ml", price: "₦500,000" },
      { name: "160ml", price: "₦1,000,000" },
      { name: "240ml", price: "₦1,500,000" },
      { name: "320ml", price: "₦3,000,000" },
    ],
  },
  {
    category: "IV Infusion",
    items: [
      { name: "Glow Infusion", price: "₦150,000" },
      { name: "Radiance Infusion", price: "₦120,000" },
      { name: "Detoxify", price: "₦90,000" },
      { name: "Skin Renewal Infusion", price: "₦80,000" },
      { name: "Rejuvenation Infusion", price: "₦90,000" },
      { name: "Immune Booster", price: "₦80,000" },
      { name: "Metabolism Support", price: "₦150,000" },
    ],
  },
  {
    category: "Chemical Peel",
    items: [
      { name: "Mild Peel", price: "₦60,000" },
      { name: "Deep Peel", price: "₦90,000" },
    ],
  },
  {
    category: "Lipolysis",
    items: [{ name: "Per Vial", price: "₦150,000" }],
  },
  {
    category: "Facial Treatments",
    items: [
      { name: "Clarity Facial", price: "₦60,000" },
      { name: "Rejuvenation Facial", price: "₦80,000" },
      { name: "Deep Cleaning", price: "₦45,000" },
      { name: "Corrective Facial", price: "₦60,000" },
      { name: "Oxygen Facials", price: "₦100,000" },
      { name: "Crystal Resurfacing", price: "₦60,000" },
      { name: "Chemical Peel Facial", price: "₦100,000" },
      { name: "Derma Planning", price: "₦60,000" },
      { name: "Gold / Luxury Facials", price: "₦120,000" },
      { name: "Basic Facials", price: "₦40,000" },
    ],
  },
  {
    category: "Dermal Fillers",
    items: [
      { name: "Lip Fillers", price: "₦250,000" },
      { name: "Chin Fillers", price: "₦250,000" },
      { name: "Nose / Jaw Fillers", price: "₦250,000" },
      { name: "Nasolabial Filler", price: "₦250,000" },
    ],
  },
  {
    category: "PDO Thread",
    items: [
      { name: "Fox Eye PDO (Eyebrow Lift)", price: "₦500,000" },
      { name: "Nose PDO Thread (5–7 required)", price: "₦40,000" },
      { name: "Under Eye Thread", price: "₦1,200,000" },
      { name: "Smooth Thread Full Face", price: "₦600,000" },
      { name: "Double Chin PDO Lift", price: "₦600,000" },
      { name: "Lower Face PDO Lift", price: "₦600,000" },
      { name: "Mid-Face PDO Lift", price: "₦600,000" },
      { name: "Full PDO Face Lift", price: "₦1,200,000" },
    ],
  },
  {
    category: "PRP",
    items: [
      { name: "PRP Hip Dip Filler", price: "₦200,000" },
      { name: "PRP Skin Smoothing", price: "₦150,000" },
      { name: "PRP Melasma", price: "₦200,000" },
      { name: "PRP Glute Enhancement", price: "₦200,000" },
      { name: "PRP Nano Facials", price: "₦150,000" },
      { name: "PRP Hair Restoration", price: "₦160,000" },
      { name: "PRP Bust Enhancement", price: "₦200,000" },
      { name: "PRP Wellness Shot (F)", price: "₦200,000" },
      { name: "PRP Wellness Shot (M)", price: "₦200,000" },
    ],
  },
  {
    category: "Collagen Induction Therapy",
    items: [
      { name: "Advanced Clarity", price: "₦100,000" },
      { name: "Flawless Face", price: "₦90,000" },
    ],
  },
  {
    category: "Feminine Wellness",
    items: [
      { name: "V-Steam", price: "₦60,000" },
      { name: "V-Freshness", price: "₦60,000" },
      { name: "V-Rejuvenation", price: "₦60,000" },
    ],
  },
  {
    category: "Vacuum Enhancement Therapy",
    items: [
      { name: "Glutes", price: "₦40,000" },
      { name: "Bust", price: "₦40,000" },
      { name: "Hips", price: "₦40,000" },
    ],
  },
  {
    category: "Pedicure",
    items: [
      { name: "Classic Pedicure", price: "₦15,000" },
      { name: "Deluxe Pedicure", price: "₦25,000" },
      { name: "Jelly Pedicure", price: "₦25,000" },
      { name: "Paraffin Pedicure", price: "₦30,000" },
      { name: "Oyin Signature Pedicure", price: "₦45,000" },
      { name: "Add-on: Gel (Toe Nails)", price: "₦8,000" },
    ],
  },
  {
    category: "Manicure",
    items: [
      { name: "Classic Manicure", price: "₦8,000" },
      { name: "Deluxe Manicure", price: "₦15,000" },
      { name: "Paraffin Manicure", price: "₦20,000" },
    ],
  },
  {
    category: "Mani + Pedi Combo",
    items: [
      { name: "Classic Mani + Pedi", price: "₦20,000" },
      { name: "Deluxe Mani + Pedi", price: "₦35,000" },
      { name: "Paraffin Mani + Pedi", price: "₦45,000" },
    ],
  },
];

export interface MassageItem {
  duration: string;
  price: string;
}

export interface MassageService {
  name: string;
  items: MassageItem[];
}

export const massageServices: MassageService[] = [
  {
    name: "Swedish",
    items: [
      { duration: "60 mins", price: "₦50,000" },
      { duration: "90 mins", price: "₦70,000" },
      { duration: "120 mins", price: "₦100,000" },
      { duration: "180 mins", price: "₦150,000" },
    ],
  },
  {
    name: "Deep Tissue Massage",
    items: [
      { duration: "60 mins", price: "₦70,000" },
      { duration: "90 mins", price: "₦100,000" },
      { duration: "120 mins", price: "₦150,000" },
      { duration: "180 mins", price: "₦250,000" },
    ],
  },
  {
    name: "Nu-ru Signature",
    items: [
      { duration: "60 mins", price: "₦80,000" },
      { duration: "90 mins", price: "₦120,000" },
      { duration: "120 mins", price: "₦160,000" },
      { duration: "180 mins", price: "₦250,000" },
    ],
  },
  {
    name: "Thai Massage",
    items: [
      { duration: "60 mins", price: "₦70,000" },
      { duration: "90 mins", price: "₦100,000" },
      { duration: "120 mins", price: "₦150,000" },
      { duration: "180 mins", price: "₦250,000" },
    ],
  },
  {
    name: "Couple Swedish",
    items: [
      { duration: "60 mins", price: "₦100,000" },
      { duration: "90 mins", price: "₦140,000" },
      { duration: "120 mins", price: "₦200,000" },
      { duration: "180 mins", price: "₦300,000" },
    ],
  },
  {
    name: "Couple Deep Tissue",
    items: [
      { duration: "60 mins", price: "₦140,000" },
      { duration: "90 mins", price: "₦210,000" },
      { duration: "120 mins", price: "₦280,000" },
      { duration: "180 mins", price: "₦350,000" },
    ],
  },
  {
    name: "Couples Nu-ru Signature",
    items: [
      { duration: "60 mins", price: "₦200,000" },
      { duration: "90 mins", price: "₦300,000" },
      { duration: "120 mins", price: "₦400,000" },
      { duration: "180 mins", price: "₦600,000" },
    ],
  },
  {
    name: "Four Hand Nu-ru Signature",
    items: [
      { duration: "60 mins", price: "₦200,000" },
      { duration: "90 mins", price: "₦300,000" },
      { duration: "120 mins", price: "₦400,000" },
      { duration: "180 mins", price: "₦600,000" },
    ],
  },
  {
    name: "Swedish Nu-ru Signature",
    items: [
      { duration: "60 mins", price: "₦90,000" },
      { duration: "90 mins", price: "₦140,000" },
      { duration: "120 mins", price: "₦180,000" },
      { duration: "180 mins", price: "₦270,000" },
    ],
  },
  {
    name: "Deep Tissue Nu-ru Signature",
    items: [
      { duration: "60 mins", price: "₦100,000" },
      { duration: "90 mins", price: "₦150,000" },
      { duration: "120 mins", price: "₦200,000" },
      { duration: "180 mins", price: "₦300,000" },
    ],
  },
];

export const quickMassages: ServiceItem[] = [
  { name: "Back Massage (30 mins)", price: "₦30,000" },
  { name: "Foot Massage (15 mins)", price: "₦20,000" },
  { name: "Head Massage (20 mins)", price: "₦20,000" },
];

export const massageAddOns: ServiceItem[] = [
  { name: "Hot Stone Add-On", price: "₦10,000" },
];

export const mobileMassageServices: MassageService[] = [
  {
    name: "Swedish",
    items: [
      { duration: "60 mins", price: "₦65,000" },
      { duration: "90 mins", price: "₦95,000" },
      { duration: "120 mins", price: "₦130,000" },
      { duration: "180 mins", price: "₦190,000" },
    ],
  },
  {
    name: "Deep Tissue Massage",
    items: [
      { duration: "60 mins", price: "₦80,000" },
      { duration: "90 mins", price: "₦120,000" },
      { duration: "120 mins", price: "₦160,000" },
      { duration: "180 mins", price: "₦240,000" },
    ],
  },
  {
    name: "Nu-ru Signature",
    items: [
      { duration: "60 mins", price: "₦100,000" },
      { duration: "90 mins", price: "₦150,000" },
      { duration: "120 mins", price: "₦200,000" },
      { duration: "180 mins", price: "₦300,000" },
    ],
  },
  {
    name: "Couple Swedish",
    items: [
      { duration: "60 mins", price: "₦120,000" },
      { duration: "90 mins", price: "₦160,000" },
      { duration: "120 mins", price: "₦240,000" },
      { duration: "180 mins", price: "₦360,000" },
    ],
  },
  {
    name: "Couple Deep Tissue",
    items: [
      { duration: "60 mins", price: "₦150,000" },
      { duration: "90 mins", price: "₦225,000" },
      { duration: "120 mins", price: "₦300,000" },
      { duration: "180 mins", price: "₦450,000" },
    ],
  },
  {
    name: "Couples Nu-ru Signature",
    items: [
      { duration: "60 mins", price: "₦250,000" },
      { duration: "90 mins", price: "₦375,000" },
      { duration: "120 mins", price: "₦500,000" },
      { duration: "180 mins", price: "₦750,000" },
    ],
  },
  {
    name: "Four Hand Nu-ru Signature",
    items: [
      { duration: "60 mins", price: "₦250,000" },
      { duration: "90 mins", price: "₦375,000" },
      { duration: "120 mins", price: "₦500,000" },
      { duration: "180 mins", price: "₦750,000" },
    ],
  },
  {
    name: "Swedish Nu-ru Signature",
    items: [
      { duration: "60 mins", price: "₦120,000" },
      { duration: "90 mins", price: "₦180,000" },
      { duration: "120 mins", price: "₦240,000" },
      { duration: "180 mins", price: "₦360,000" },
    ],
  },
  {
    name: "Deep Tissue Nu-ru Signature",
    items: [
      { duration: "60 mins", price: "₦150,000" },
      { duration: "90 mins", price: "₦230,000" },
      { duration: "120 mins", price: "₦300,000" },
      { duration: "180 mins", price: "₦450,000" },
    ],
  },
];

export const mobileQuickMassages: ServiceItem[] = [
  { name: "Back Massage (30 mins)", price: "₦40,000" },
  { name: "Foot Massage (15 mins)", price: "₦30,000" },
  { name: "Head Massage (20 mins)", price: "₦30,000" },
];

export const mobileMassageAddOns: ServiceItem[] = [
  { name: "Hot Stone Add-On", price: "₦15,000" },
];

export const mobileSpaServices: ServiceCategory[] = [
  {
    category: "Pedicure",
    items: [
      { name: "Classic Pedicure", price: "₦35,000" },
      { name: "Deluxe Pedicure", price: "₦50,000" },
      { name: "Jelly Pedicure", price: "₦50,000" },
      { name: "Paraffin Pedicure", price: "₦60,000" },
      { name: "Add-on: Gel (Toe Nails)", price: "₦12,000" },
    ],
  },
  {
    category: "Manicure",
    items: [
      { name: "Classic Manicure", price: "₦18,000" },
      { name: "Deluxe Manicure", price: "₦25,000" },
      { name: "Paraffin Manicure", price: "₦30,000" },
    ],
  },
  {
    category: "Mani + Pedi Combo",
    items: [
      { name: "Classic Mani + Pedi", price: "₦50,000" },
      { name: "Deluxe Mani + Pedi", price: "₦70,000" },
      { name: "Paraffin Mani + Pedi", price: "₦90,000" },
    ],
  },
  {
    category: "Body Waxing",
    items: [
      { name: "Under Arm", price: "₦30,000" },
      { name: "Half Leg", price: "₦40,000" },
      { name: "Full Leg", price: "₦50,000" },
      { name: "Half Hand", price: "₦40,000" },
      { name: "Full Hand", price: "₦50,000" },
      { name: "Facial Waxing", price: "₦20,000" },
      { name: "Chin", price: "₦30,000" },
      { name: "Bikini", price: "₦50,000" },
      { name: "Half Body", price: "₦70,000" },
      { name: "Full Body", price: "₦100,000" },
    ],
  },
];
