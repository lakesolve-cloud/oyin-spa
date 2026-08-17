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
      { name: "Hollywood", price: "₦40,000" },
      { name: "Brazilian", price: "₦40,000" },
      { name: "Half Body", price: "₦50,000" },
      { name: "Full Body", price: "₦80,000" },
    ],
  },
  {
    category: "Teeth Whitening",
    items: [
      { name: "Per session", price: "₦50,000" },
    ],
  },
  {
    category: "Skin Tag Removal",
    items: [
      { name: "(Per Area)", price: "₦40,000" },
    ],
  },
  {
    category: "Ultra Cavitation Body Sculpting",
    items: [
      { name: "Arms", price: "₦30,000" },
      { name: "Thighs", price: "₦30,000" },
      { name: "Tummy", price: "₦35,000" },
      { name: "Waist Line", price: "₦35,000" },
      { name: "Back", price: "₦35,000" },
      { name: "Combo (Waist Line, Tummy, Back)", price: "₦95,000" },
      { name: "Wood Sculpting", price: "₦70,000" },
    ],
  },
  {
    category: "Stretch Marks Removal",
    items: [
      { name: "Arms(both)", price: "₦40,000" },
      { name: "Thighs (both)", price: "₦50,000" },
      { name: "Tummy", price: "₦50,000" },
      { name: "Full Body", price: "₦120,000" },
    ],
  },
  {
    category: "IV Infusion",
    items: [
      { name: "Whitening Infusion", price: "₦80,000" },
      { name: "Lightening Infusion", price: "₦80,000" },
      { name: "Detoxify", price: "₦60,000" },
      { name: "Skin Repair Infusion", price: "₦60,000" },
      { name: "Anti-aging Infusion", price: "₦65,000" },
      { name: "Immune booster", price: "₦65,000" },
      { name: "Weight loss", price: "₦100,000" },
    ],
  },
  {
    category: "Chemical Peel",
    items: [
      { name: "Mild Peel", price: "₦40,000" },
      { name: "Deep Peel", price: "₦60,000" },
    ],
  },
  {
    category: "Lypolysis",
    items: [
      { name: "Per vial", price: "₦80,000" },
    ],
  },
  {
    category: "Facials Treatment",
    items: [
      { name: "Deep cleaning", price: "₦45,000" },
      { name: "Hydra-facial", price: "₦60,000" },
      { name: "Chemical peel facial", price: "₦80,000" },
      { name: "Severe Acne Facial", price: "₦60,000" },
      { name: "Basic Facials", price: "₦30,000" },
      { name: "Micro needling + Facial combo", price: "₦80,000" },
    ],
  },
  {
    category: "PDO Thread",
    items: [
      { name: "Fox Eye PDO (Eyebrow Lift)", price: "₦300,000" },
      { name: "Nose PDO Thread (5–7 required)", price: "₦30,000" },
      { name: "Under Eye Thread", price: "₦650,000" },
      { name: "Smooth Thread Full Face", price: "₦300,000" },
      { name: "Double Chin PDO Lift", price: "₦300,000" },
      { name: "Lower Face PDO Lift", price: "₦300,000" },
      { name: "Mid-Face PDO Lift", price: "₦300,000" },
      { name: "Full PDO Face Lift", price: "₦800,000" },
    ],
  },
  {
    category: "PRP",
    items: [
      { name: "PRP hip dip filler", price: "₦150,000" },
      { name: "PRP Stretch marks removal", price: "₦100,000" },
      { name: "PRP Melasma", price: "₦100,000" },
      { name: "PRP butt filler", price: "₦150,000" },
      { name: "PRP nano facials", price: "₦100,000" },
      { name: "PRP breast fillers", price: "₦200,000" },
      { name: "PRP O shot", price: "₦100,000" },
      { name: "PRP P shot", price: "₦100,000" },
    ],
  },
  {
    category: "Micro Needling",
    items: [
      { name: "Severe Acne treatment", price: "₦70,000" },
      { name: "Flawless Face", price: "₦50,000" },
    ],
  },
  {
    category: "Vaginal Treatment",
    items: [
      { name: "Vaginal Steam", price: "₦35,000" },
      { name: "Vaginal Sweetness", price: "₦35,000" },
      { name: "Vaginal tightening", price: "₦35,000" },
    ],
  },
  {
    category: "Pedicure",
    items: [
      { name: "Classic Pedicure", price: "₦15,000" },
      { name: "Deluxe Pedicure", price: "₦25,000" },
      { name: "Jelly pedicure", price: "₦25,000" },
      { name: "Paraffin Pedicure", price: "₦30,000" },
      { name: "Add-on: Gel (toe nails)", price: "₦8,000" },
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
    category: "Combo",
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
    name: "Four Hand Swedish",
    items: [
      { duration: "60 mins", price: "₦90,000" },
      { duration: "90 mins", price: "₦135,000" },
      { duration: "120 mins", price: "₦180,000" },
      { duration: "180 mins", price: "₦250,000" },
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
    name: "Four Hand Deep Tissue Massage",
    items: [
      { duration: "60 mins", price: "₦120,000" },
      { duration: "90 mins", price: "₦180,000" },
      { duration: "120 mins", price: "₦240,000" },
      { duration: "180 mins", price: "₦360,000" },
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
    name: "Lymphatic Massage",
    items: [
      { duration: "60 mins", price: "₦70,000" },
      { duration: "90 mins", price: "₦100,000" },
      { duration: "120 mins", price: "₦150,000" },
      { duration: "180 mins", price: "₦250,000" },
    ],
  },
  {
    name: "Nu-ru/Ero-tic",
    items: [
      { duration: "60 mins", price: "₦80,000" },
      { duration: "90 mins", price: "₦120,000" },
      { duration: "120 mins", price: "₦160,000" },
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
    name: "Couples Nu-Ru/Ero-tic",
    items: [
      { duration: "60 mins", price: "₦200,000" },
      { duration: "90 mins", price: "₦300,000" },
      { duration: "120 mins", price: "₦400,000" },
      { duration: "180 mins", price: "₦600,000" },
    ],
  },
  {
    name: "Four hand Nu-Ru/Ero-tic",
    items: [
      { duration: "60 mins", price: "₦200,000" },
      { duration: "90 mins", price: "₦300,000" },
      { duration: "120 mins", price: "₦400,000" },
      { duration: "180 mins", price: "₦600,000" },
    ],
  },
  {
    name: "Swedish Nu-Ru/Ero-tic",
    items: [
      { duration: "60 mins", price: "₦100,000" },
      { duration: "90 mins", price: "₦150,000" },
      { duration: "120 mins", price: "₦200,000" },
      { duration: "180 mins", price: "₦300,000" },
    ],
  },
  {
    name: "Deep Tissue Nu-Ru/Ero-tic",
    items: [
      { duration: "60 mins", price: "₦120,000" },
      { duration: "90 mins", price: "₦180,000" },
      { duration: "120 mins", price: "₦240,000" },
      { duration: "180 mins", price: "₦340,000" },
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

// ============================================================
// Mobile / Home & Hotel Price List
// Separate pricing for in-home / hotel mobile spa services.
// ============================================================

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
    name: "Four Hand Swedish",
    items: [
      { duration: "60 mins", price: "₦120,000" },
      { duration: "90 mins", price: "₦180,000" },
      { duration: "120 mins", price: "₦250,000" },
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
    name: "Four Hand Deep Tissue",
    items: [
      { duration: "60 mins", price: "₦150,000" },
      { duration: "90 mins", price: "₦230,000" },
      { duration: "120 mins", price: "₦300,000" },
    ],
  },
  {
    name: "Thai Massage",
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
      { name: "Jelly Manicure", price: "₦30,000" },
    ],
  },
  {
    category: "Mani + Pedi Combo",
    items: [
      { name: "Classic Mani + Pedi", price: "₦50,000" },
      { name: "Deluxe Mani + Pedi", price: "₦70,000" },
      { name: "Jelly Mani + Pedi", price: "₦90,000" },
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
      { name: "Hollywood", price: "₦60,000" },
      { name: "Brazilian", price: "₦60,000" },
      { name: "Half Body", price: "₦80,000" },
      { name: "Full Body", price: "₦120,000" },
    ],
  },
];

// ============================================================
// Celebration & Spa Combo Packages
// ============================================================

export interface SpaPackage {
  name: string;
  price: string;
  includes: string[];
}

export interface PackageGroup {
  group: string;
  blurb?: string;
  packages: SpaPackage[];
}

export const celebrationPackages: PackageGroup[] = [
  {
    group: "Birthday",
    blurb: "Mark another year with a day designed entirely around you.",
    packages: [
      {
        name: "The Birthday Glow",
        price: "₦100,000",
        includes: [
          "60 mins Swedish Massage",
          "Deep Cleaning Facial",
          "Pedicure and Manicure",
          "Aromatherapy",
          "Complimentary birthday drink",
          "Birthday setup",
        ],
      },
      {
        name: "The Birthday Queen / King",
        price: "₦200,000",
        includes: [
          "90 mins Luxury Massage (Swedish, Deep Tissue or Thai)",
          "HydraFacial",
          "Jelly Pedicure + Manicure",
          "Hot Stone Therapy",
          "Aromatherapy",
          "Birthday décor / setup",
          "Complimentary drink or wine",
        ],
      },
    ],
  },
  {
    group: "Anniversary / Couples",
    blurb: "Shared calm, side by side.",
    packages: [
      {
        name: "The Lovers' Escape",
        price: "₦200,000",
        includes: [
          "60 mins Couples Massage",
          "Couples Deep Cleaning Facial",
          "Pedicure + Manicure",
          "Aromatherapy",
          "Romantic setup",
          "Complimentary drinks",
        ],
      },
    ],
  },
  {
    group: "Bridal Celebration",
    blurb: "Radiance, prepared with care ahead of the big day.",
    packages: [
      {
        name: "The Bridal Glow",
        price: "₦150,000",
        includes: [
          "60 mins Relaxation Massage",
          "Deep Cleaning Facial",
          "Pedicure + Manicure",
          "Waxing of choice",
          "Hot Stone or Aromatherapy",
          "Bridal setup",
          "Complimentary refreshments",
        ],
      },
      {
        name: "The Bridal Bliss",
        price: "₦250,000",
        includes: [
          "90 mins Relaxation Massage",
          "HydraFacial",
          "Pedicure + Manicure",
          "Waxing of choice",
          "Hot Stone + Aromatherapy",
          "Bridal setup",
          "Complimentary refreshments",
        ],
      },
    ],
  },
  {
    group: "Just Because",
    blurb: "No occasion required.",
    packages: [
      {
        name: "The Luxury Surprise",
        price: "₦150,000",
        includes: [
          "60 mins Swedish Massage",
          "Facial Treatment",
          "Pedicure + Manicure",
          "Aromatherapy",
          "Luxury gift presentation",
          "Complimentary drink",
        ],
      },
    ],
  },
  {
    group: "Premium",
    blurb: "Our most complete celebration experience.",
    packages: [
      {
        name: "The Oyin Royal Celebration",
        price: "₦350,000",
        includes: [
          "90 mins Signature Massage",
          "HydraFacial",
          "Jelly Pedicure + Manicure",
          "Hot Stone Therapy",
          "Aromatherapy",
          "Luxury celebration setup",
          "Refreshments",
          "Small celebration cake",
        ],
      },
    ],
  },
];

export const comboPackages: SpaPackage[] = [
  {
    name: "Classic Signature Escape",
    price: "₦85,000",
    includes: [
      "60 mins Swedish Massage",
      "Basic Facial",
      "Pedicure + Manicure",
      "Complimentary Aromatherapy",
    ],
  },
  {
    name: "The Luxury Reset",
    price: "₦150,000",
    includes: [
      "60 mins Deep Tissue Massage",
      "HydraFacial",
      "Spa Pedicure + Manicure",
      "Under Arm Waxing",
      "Complimentary Hot Stone Therapy",
    ],
  },
  {
    name: "The Ultimate Indulgence",
    price: "₦150,000",
    includes: [
      "60 mins Nu-ru Signature Massage",
      "Deep Cleaning Facial",
      "Classic Pedicure + Manicure",
      "Hot Stone Therapy",
      "Under Arm Waxing",
      "Complimentary Aromatherapy",
    ],
  },
  {
    name: "Couples Luxury Experience",
    price: "₦250,000",
    includes: [
      "90 mins Deep Tissue / Swedish Massage",
      "HydraFacial Treatment",
      "Pedicure + Manicure",
      "Hot Stone Therapy",
      "Aromatherapy",
      "Complimentary refreshments",
    ],
  },
];
