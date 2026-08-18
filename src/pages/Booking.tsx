import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  Check,
  MapPin,
  Clock,
  Calendar,
  ChevronDown,
  ChevronUp,
  Sparkles,
} from "lucide-react";
import Layout from "@/components/Layout";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { fadeUp } from "@/lib/animations";
import { supabase } from "@/integrations/supabase/client";

import {
  spaServices,
  massageServices,
  quickMassages,
  massageAddOns,
  mobileSpaServices,
  mobileMassageServices,
  mobileQuickMassages,
  mobileMassageAddOns,
  celebrationPackages,
  comboPackages,
} from "@/data/services";

import therapistAmara from "@/assets/therapist-amara.jpg";
import therapistChidera from "@/assets/therapist-chidera.jpg";
import therapistFolake from "@/assets/therapist-folake.jpg";
import therapistBisi from "@/assets/therapist-bisi.jpg";
import therapistNneka from "@/assets/therapist-nneka.jpg";

// ============================================================
// TYPES
// ============================================================

interface BookableService {
  id: string;
  category: string;
  name: string;
  price: string;
  duration?: string;

  // Package-only details.
  description?: string;
  includes?: string[];
  isPackage?: boolean;
}

// ============================================================
// HELPERS
// ============================================================

const parsePrice = (price?: string) =>
  Number((price || "").replace(/[^\d.]/g, "")) || 0;

// ============================================================
// BUILD BOOKABLE SERVICES
// ============================================================

function buildBookableList(
  spa: typeof spaServices,
  massage: typeof massageServices,
  quick: typeof quickMassages,
  includePackages = false
): BookableService[] {
  const list: BookableService[] = [];

  // ----------------------------------------------------------
  // MASSAGE
  // ----------------------------------------------------------

  massage.forEach((service) => {
    service.items.forEach((item) => {
      list.push({
        id: `massage--${service.name}--${item.duration}`
          .toLowerCase()
          .replace(/\s+/g, "-"),

        category: "Massage",

        name: `${service.name} — ${item.duration}`,

        price: item.price,

        duration: item.duration,

        // IMPORTANT:
        // No description is added here.
        // Normal massage services therefore show
        // exactly as normal selectable services.
      });
    });
  });

  // ----------------------------------------------------------
  // QUICK MASSAGES
  // ----------------------------------------------------------

  quick.forEach((item) => {
    list.push({
      id: `quick--${item.name}`
        .toLowerCase()
        .replace(/\s+/g, "-"),

      category: "Massage",

      name: item.name,

      price: item.price,

      // No details for normal services.
    });
  });

  // ----------------------------------------------------------
  // PACKAGES
  // ----------------------------------------------------------

  if (includePackages) {
    // Celebration Packages
    celebrationPackages.forEach((group) => {
      group.packages.forEach((pkg) => {
        list.push({
          id: `package--${pkg.name}`
            .toLowerCase()
            .replace(/\s+/g, "-"),

          category: "Celebration Packages",

          name: `${pkg.name} (${group.group})`,

          price: pkg.price,

          // Package details come directly from services.ts.
          description: group.blurb,

          includes: pkg.includes,

          isPackage: true,
        });
      });
    });

    // Spa Combo Packages
    comboPackages.forEach((pkg) => {
      list.push({
        id: `combo--${pkg.name}`
          .toLowerCase()
          .replace(/\s+/g, "-"),

        category: "Spa Combo Packages",

        name: pkg.name,

        price: pkg.price,

        includes: pkg.includes,

        isPackage: true,
      });
    });
  }

  // ----------------------------------------------------------
  // OTHER SPA SERVICES
  // ----------------------------------------------------------

  spa.forEach((cat) => {
    cat.items?.forEach((item) => {
      list.push({
        id: `${cat.category}--${item.name}`
          .toLowerCase()
          .replace(/\s+/g, "-"),

        category: cat.category,

        name: item.name,

        price: item.price,

        // IMPORTANT:
        // No description is added here.
      });
    });
  });

  return list;
}

// ============================================================
// BOOKABLE LISTS
// ============================================================

const inSpaBookable = buildBookableList(
  spaServices,
  massageServices,
  quickMassages,
  true
);

const mobileBookable = buildBookableList(
  mobileSpaServices,
  mobileMassageServices,
  mobileQuickMassages,
  false
);

// ============================================================
// LOCATION OPTIONS
// ============================================================

const locationOptions = [
  {
    id: "in-spa",
    label: "Walk-In",
    desc: "Visit our studio",
  },
  {
    id: "mobile",
    label: "Home / Hotel",
    desc: "We come to you",
  },
];

// ============================================================
// TIME SLOTS
// ============================================================

const timeSlots = Array.from(
  { length: 48 },
  (_, i) => {
    const h = Math.floor(i / 2)
      .toString()
      .padStart(2, "0");

    const m = i % 2 === 0 ? "00" : "30";

    return `${h}:${m}`;
  }
);

// ============================================================
// CATEGORIES THAT REQUIRE A THERAPIST
// ============================================================

const THERAPIST_CATEGORIES = new Set([
  "Massage",
  "Body Waxing",
  "Celebration Packages",
  "Spa Combo Packages",
]);

// ============================================================
// FALLBACK THERAPISTS
// ============================================================

const fallbackTherapists = [
  {
    id: "1",
    name: "Amara",
    specialties: [
      "Deep Tissue",
      "Sports Recovery",
    ],
    available: true,
    photo_url: null,
    photo: therapistAmara,
    photo_urls: [] as string[],
    service_mode: "both" as const,
  },

  {
    id: "2",
    name: "Chidera",
    specialties: [
      "Relaxation",
      "Aromatherapy",
    ],
    available: true,
    photo_url: null,
    photo: therapistChidera,
    photo_urls: [] as string[],
    service_mode: "both" as const,
  },

  {
    id: "3",
    name: "Folake",
    specialties: [
      "Prenatal",
      "Relaxation",
    ],
    available: true,
    photo_url: null,
    photo: therapistFolake,
    photo_urls: [] as string[],
    service_mode: "both" as const,
  },

  {
    id: "4",
    name: "Bisi",
    specialties: [
      "Deep Tissue",
      "Hot Stone",
    ],
    available: false,
    photo_url: null,
    photo: therapistBisi,
    photo_urls: [] as string[],
    service_mode: "both" as const,
  },

  {
    id: "5",
    name: "Nneka",
    specialties: [
      "Couples",
      "Executive",
    ],
    available: true,
    photo_url: null,
    photo: therapistNneka,
    photo_urls: [] as string[],
    service_mode: "both" as const,
  },
];

// ============================================================
// BOOKING
// ============================================================

const Booking = () => {
  const [step, setStep] = useState(1);

  const [selectedCategory, setSelectedCategory] =
    useState("");

  const [selectedServiceId, setSelectedServiceId] =
    useState("");

  // Controls the package details accordion.
  const [detailsServiceId, setDetailsServiceId] =
    useState("");

  const [selectedLocation, setSelectedLocation] =
    useState("");

  const [selectedDate, setSelectedDate] =
    useState("");

  const [selectedTime, setSelectedTime] =
    useState("");

  const [selectedTherapist, setSelectedTherapist] =
    useState<string | null>(null);

  const [therapists, setTherapists] =
    useState<any[]>(fallbackTherapists);

  const [addHotStone, setAddHotStone] =
    useState(false);

  const [addressZone, setAddressZone] =
    useState("");

  const [fullAddress, setFullAddress] =
    useState("");

  const [galleryTherapistId, setGalleryTherapistId] =
    useState<string | null>(null);

  const [galleryIndex, setGalleryIndex] =
    useState(0);

  // ==========================================================
  // FETCH THERAPISTS
  // ==========================================================

  useEffect(() => {
    const fetchTherapists = async () => {
      const { data } = await supabase
        .from("therapists")
        .select("*")
        .order("created_at");

      if (data && data.length > 0) {
        setTherapists(
          data.map((t: any) => ({
            ...t,
            photo: t.photo_url || "",
          }))
        );
      }
    };

    fetchTherapists();
  }, []);

  // ==========================================================
  // PRESELECT SERVICE FROM URL
  // ==========================================================

  useEffect(() => {
    const id = new URLSearchParams(
      window.location.search
    ).get("service");

    if (!id) return;

    const match = inSpaBookable.find(
      (s) => s.id === id
    );

    if (!match) return;

    setSelectedLocation("in-spa");
    setSelectedCategory(match.category);
    setSelectedServiceId(match.id);

    // Open details automatically only if this is a package.
    if (match.isPackage) {
      setDetailsServiceId(match.id);
    }
  }, []);

  // ==========================================================
  // ACTIVE SERVICES
  // ==========================================================

  const activeBookable = useMemo(() => {
    if (selectedLocation === "mobile") {
      return mobileBookable;
    }

    return inSpaBookable;
  }, [selectedLocation]);

  // ==========================================================
  // ACTIVE CATEGORIES
  // ==========================================================

  const activeCategories = useMemo(() => {
    const categories = [
      ...new Set(
        activeBookable.map(
          (service) => service.category
        )
      ),
    ];

    const priority = [
      "Massage",
      "Celebration Packages",
      "Spa Combo Packages",
    ];

    return categories.sort((a, b) => {
      const aIndex = priority.indexOf(a);
      const bIndex = priority.indexOf(b);

      const aPriority =
        aIndex === -1 ? 999 : aIndex;

      const bPriority =
        bIndex === -1 ? 999 : bIndex;

      return aPriority - bPriority;
    });
  }, [activeBookable]);

  // ==========================================================
  // FILTERED SERVICES
  // ==========================================================

  const filteredServices = useMemo(() => {
    return activeBookable.filter(
      (service) =>
        service.category ===
        selectedCategory
    );
  }, [
    activeBookable,
    selectedCategory,
  ]);

  // ==========================================================
  // CURRENT SERVICE
  // ==========================================================

  const currentService =
    activeBookable.find(
      (service) =>
        service.id ===
        selectedServiceId
    );

  // ==========================================================
  // CATEGORY HELPERS
  // ==========================================================

  const isMassageCategory =
    selectedCategory === "Massage";

  const isPackageCategory =
    selectedCategory ===
      "Celebration Packages" ||
    selectedCategory ===
      "Spa Combo Packages";

  const packageAllowed =
    selectedLocation === "in-spa";

  const requiresTherapist =
    THERAPIST_CATEGORIES.has(
      selectedCategory
    );

  // ==========================================================
  // HOT STONE
  // ==========================================================

  const hotStonePrice =
    selectedLocation === "mobile"
      ? mobileMassageAddOns[0].price
      : massageAddOns[0].price;

  // ==========================================================
  // AVAILABLE THERAPISTS
  // ==========================================================

  const availableTherapists =
    therapists.filter((therapist) => {
      if (!therapist.available) {
        return false;
      }

      const mode =
        therapist.service_mode ??
        "both";

      if (mode !== "both") {
        if (
          selectedLocation ===
            "mobile" &&
          mode !== "mobile"
        ) {
          return false;
        }

        if (
          selectedLocation ===
            "in-spa" &&
          mode !== "walk_in"
        ) {
          return false;
        }
      }

      if (
        selectedLocation ===
          "mobile" &&
        addressZone
      ) {
        const zone =
          therapist.zone ?? "both";

        if (
          zone !== "both" &&
          zone !==
            addressZone.toLowerCase()
        ) {
          return false;
        }
      }

      return true;
    });

  // ==========================================================
  // SELECTED THERAPIST
  // ==========================================================

  const selectedTherapistData =
    therapists.find(
      (therapist) =>
        therapist.id ===
        selectedTherapist
    );

  // ==========================================================
  // GALLERY
  // ==========================================================

  const galleryTherapist =
    therapists.find(
      (therapist) =>
        therapist.id ===
        galleryTherapistId
    );

  const galleryPhotos: string[] =
    galleryTherapist
      ? galleryTherapist.photo_urls &&
        galleryTherapist.photo_urls
          .length > 0
        ? galleryTherapist.photo_urls
        : [
            galleryTherapist.photo_url ||
              galleryTherapist.photo,
          ].filter(Boolean)
      : [];

  // ==========================================================
  // SELECT SERVICE
  // ==========================================================

  const selectService = (
    service: BookableService
  ) => {
    // Selecting a service immediately selects it.
    setSelectedServiceId(
      service.id
    );

    // Only packages have actual details
    // in the current services.ts data.
    if (service.isPackage) {
      setDetailsServiceId(
        service.id
      );
    } else {
      setDetailsServiceId("");
    }

    // Reset dependent selections.
    setSelectedTherapist(null);
    setAddHotStone(false);
  };

  // ==========================================================
  // CAN PROCEED
  // ==========================================================

  const canProceed = () => {
    switch (step) {
      case 1: {
        if (
          !selectedServiceId ||
          !selectedLocation
        ) {
          return false;
        }

        // Packages are In-Spa only.
        if (
          isPackageCategory &&
          !packageAllowed
        ) {
          return false;
        }

        // Mobile requires address.
        if (
          selectedLocation ===
            "mobile" &&
          (!addressZone ||
            fullAddress.trim()
              .length < 8)
        ) {
          return false;
        }

        return true;
      }

      case 2:
        return Boolean(
          selectedDate &&
            selectedTime
        );

      case 3:
        return (
          selectedTherapist !==
          null
        );

      default:
        return false;
    }
  };

  // ==========================================================
  // NEXT
  // ==========================================================

  const goNext = () => {
    if (!canProceed()) return;

    // Skip therapist selection when not required.
    if (
      step === 2 &&
      !requiresTherapist
    ) {
      setSelectedTherapist(null);
      setStep(4);
      return;
    }

    setStep(step + 1);
  };

  // ==========================================================
  // BACK
  // ==========================================================

  const goBack = () => {
    if (
      step === 4 &&
      !requiresTherapist
    ) {
      setStep(2);
      return;
    }

    setStep(step - 1);
  };

  // ==========================================================
  // DATES
  // ==========================================================

  const dates = Array.from(
    { length: 14 },
    (_, i) => {
      const date = new Date();

      date.setDate(
        date.getDate() + i
      );

      return date;
    }
  );

  // ==========================================================
  // TOTAL
  // ==========================================================

  const bookingTotal =
    parsePrice(
      currentService?.price
    ) +
    (addHotStone
      ? parsePrice(
          hotStonePrice
        )
      : 0);

  const bookingDeposit =
    Math.round(
      bookingTotal * 0.3
    );

  // ==========================================================
  // RENDER
  // ==========================================================

  return (
    <Layout>
      <section className="py-24 lg:py-32">
        <div className="container mx-auto px-6 lg:px-12 max-w-3xl">

          {/* ==================================================
              HEADER
          ================================================== */}

          <motion.div
            initial="hidden"
            animate="visible"
            className="text-center mb-16"
          >
            <motion.p
              custom={0}
              variants={fadeUp}
              className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4"
            >
              Book Your Experience
            </motion.p>

            <motion.h1
              custom={1}
              variants={fadeUp}
              className="font-serif text-3xl md:text-5xl text-foreground"
            >
              Reserve Your Session
            </motion.h1>
          </motion.div>

          {/* ==================================================
              PROGRESS
          ================================================== */}

          <div className="flex items-center justify-center gap-3 mb-16">
            {(
              requiresTherapist
                ? [1, 2, 3, 4]
                : [1, 2, 4]
            ).map(
              (
                currentStep,
                index,
                array
              ) => (
                <div
                  key={currentStep}
                  className="flex items-center gap-3"
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs transition-colors ${
                      step >= currentStep
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {step >
                    currentStep ? (
                      <Check size={14} />
                    ) : (
                      index + 1
                    )}
                  </div>

                  {index <
                    array.length -
                      1 && (
                    <div
                      className={`w-8 h-px ${
                        step >
                        currentStep
                          ? "bg-primary"
                          : "bg-border"
                      }`}
                    />
                  )}
                </div>
              )
            )}
          </div>

          <AnimatePresence mode="wait">

            {/* =================================================
                STEP 1
            ================================================= */}

            {step === 1 && (
              <motion.div
                key="step1"
                initial={{
                  opacity: 0,
                  x: 20,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                exit={{
                  opacity: 0,
                  x: -20,
                }}
                transition={{
                  duration: 0.4,
                }}
              >

                {/* LOCATION */}

                <h2 className="font-serif text-xl mb-6 text-foreground">
                  Select Location
                </h2>

                <div className="grid grid-cols-2 gap-4 mb-10">
                  {locationOptions.map(
                    (location) => (
                      <button
                        key={
                          location.id
                        }
                        type="button"
                        onClick={() => {
                          setSelectedLocation(
                            location.id
                          );

                          setSelectedCategory(
                            ""
                          );

                          setSelectedServiceId(
                            ""
                          );

                          setDetailsServiceId(
                            ""
                          );

                          setSelectedTherapist(
                            null
                          );

                          setAddHotStone(
                            false
                          );

                          setAddressZone(
                            ""
                          );

                          setFullAddress(
                            ""
                          );

                          setSelectedDate(
                            ""
                          );

                          setSelectedTime(
                            ""
                          );

                          setStep(1);
                        }}
                        className={`p-6 border text-center transition-colors ${
                          selectedLocation ===
                          location.id
                            ? "border-primary bg-secondary"
                            : "border-border hover:border-accent"
                        }`}
                      >
                        <MapPin className="w-5 h-5 mx-auto mb-2 text-accent" />

                        <span className="block text-sm font-medium text-foreground">
                          {
                            location.label
                          }
                        </span>

                        <span className="block text-xs text-muted-foreground mt-1">
                          {
                            location.desc
                          }
                        </span>
                      </button>
                    )
                  )}
                </div>

                {/* CATEGORY */}

                {selectedLocation && (
                  <>
                    <h3 className="font-serif text-lg mb-4 text-foreground">
                      Select Category
                    </h3>

                    <div className="flex flex-wrap gap-2 mb-10">
                      {activeCategories.map(
                        (category) => (
                          <button
                            key={
                              category
                            }
                            type="button"
                            onClick={() => {
                              setSelectedCategory(
                                category
                              );

                              setSelectedServiceId(
                                ""
                              );

                              setDetailsServiceId(
                                ""
                              );

                              setAddHotStone(
                                false
                              );

                              setSelectedTherapist(
                                null
                              );
                            }}
                            className={`px-4 py-2 text-xs tracking-[0.1em] uppercase border transition-colors ${
                              selectedCategory ===
                              category
                                ? "border-primary bg-secondary text-foreground"
                                : "border-border text-muted-foreground hover:border-accent"
                            }`}
                          >
                            {
                              category
                            }
                          </button>
                        )
                      )}
                    </div>
                  </>
                )}

                {/* SERVICES */}

                {selectedCategory && (
                  <>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-serif text-lg text-foreground">
                        Select Service
                      </h3>

                      {isPackageCategory && (
                        <span className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                          Select to view details
                        </span>
                      )}
                    </div>

                    <div className="space-y-2 mb-10 max-h-[500px] overflow-y-auto pr-1">

                      {filteredServices.map(
                        (service) => {
                          const isSelected =
                            selectedServiceId ===
                            service.id;

                          const isDetailsOpen =
                            detailsServiceId ===
                            service.id;

                          return (
                            <div
                              key={
                                service.id
                              }
                              className={`border transition-all ${
                                isSelected
                                  ? "border-primary"
                                  : "border-border hover:border-accent"
                              }`}
                            >

                              {/* SERVICE ROW */}

                              <button
                                type="button"
                                onClick={() =>
                                  selectService(
                                    service
                                  )
                                }
                                className={`w-full text-left px-5 py-4 flex items-center justify-between gap-4 transition-colors ${
                                  isSelected
                                    ? "bg-secondary"
                                    : "bg-background"
                                }`}
                              >
                                <div className="min-w-0">
                                  <span className="block text-sm text-foreground">
                                    {
                                      service.name
                                    }
                                  </span>

                                  {service.duration && (
                                    <span className="block text-[10px] uppercase tracking-[0.12em] text-muted-foreground mt-1">
                                      {
                                        service.duration
                                      }
                                    </span>
                                  )}
                                </div>

                                <div className="flex items-center gap-3 shrink-0">
                                  <span className="text-sm font-medium text-foreground whitespace-nowrap">
                                    {
                                      service.price
                                    }
                                  </span>

                                  {/* Only packages have expandable details. */}

                                  {service.isPackage &&
                                    (isDetailsOpen ? (
                                      <ChevronUp
                                        size={
                                          16
                                        }
                                        className="text-muted-foreground"
                                      />
                                    ) : (
                                      <ChevronDown
                                        size={
                                          16
                                        }
                                        className="text-muted-foreground"
                                      />
                                    ))}
                                </div>
                              </button>

                              {/* =================================================
                                  PACKAGE DETAILS ONLY
                              ================================================= */}

                              {service.isPackage && (
                                <AnimatePresence
                                  initial={
                                    false
                                  }
                                >
                                  {isDetailsOpen && (
                                    <motion.div
                                      initial={{
                                        height: 0,
                                        opacity: 0,
                                      }}
                                      animate={{
                                        height:
                                          "auto",
                                        opacity: 1,
                                      }}
                                      exit={{
                                        height: 0,
                                        opacity: 0,
                                      }}
                                      transition={{
                                        duration:
                                          0.25,
                                      }}
                                      className="overflow-hidden"
                                    >
                                      <div className="px-5 py-5 border-t border-border bg-card">

                                        {/* PACKAGE DESCRIPTION */}

                                        {service.description && (
                                          <div className="flex items-start gap-3 mb-6">
                                            <div className="w-8 h-8 shrink-0 rounded-full bg-secondary flex items-center justify-center">
                                              <Sparkles
                                                size={
                                                  14
                                                }
                                                className="text-accent"
                                              />
                                            </div>

                                            <div>
                                              <p className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground mb-1">
                                                About this experience
                                              </p>

                                              <p className="text-sm leading-6 text-foreground">
                                                {
                                                  service.description
                                                }
                                              </p>
                                            </div>
                                          </div>
                                        )}

                                        {/* WHAT'S INCLUDED */}

                                        {service.includes &&
                                          service
                                            .includes
                                            .length >
                                            0 && (
                                            <div>
                                              <p className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground mb-3">
                                                What's included
                                              </p>

                                              <div className="space-y-2">
                                                {service.includes.map(
                                                  (
                                                    item,
                                                    index
                                                  ) => (
                                                    <div
                                                      key={`${item}-${index}`}
                                                      className="flex items-start gap-2"
                                                    >
                                                      <Check
                                                        size={
                                                          14
                                                        }
                                                        className="mt-0.5 shrink-0 text-primary"
                                                      />

                                                      <span className="text-sm text-foreground">
                                                        {
                                                          item
                                                        }
                                                      </span>
                                                    </div>
                                                  )
                                                )}
                                              </div>
                                            </div>
                                          )}

                                      </div>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              )}
                            </div>
                          );
                        }
                      )}

                    </div>
                  </>
                )}

                {/* =================================================
                    HOT STONE
                ================================================= */}

                {selectedServiceId &&
                  isMassageCategory && (
                    <div className="mb-10">
                      <h3 className="font-serif text-lg mb-4 text-foreground">
                        Add-Ons
                      </h3>

                      <button
                        type="button"
                        onClick={() =>
                          setAddHotStone(
                            !addHotStone
                          )
                        }
                        className={`w-full text-left px-5 py-4 border transition-colors flex justify-between items-center gap-4 ${
                          addHotStone
                            ? "border-primary bg-secondary"
                            : "border-border hover:border-accent"
                        }`}
                      >
                        <span className="text-sm text-foreground">
                          Hot Stone Add-On
                        </span>

                        <span className="text-sm font-medium text-foreground">
                          {
                            hotStonePrice
                          }
                        </span>
                      </button>
                    </div>
                  )}

                {/* =================================================
                    MOBILE ADDRESS
                ================================================= */}

                {selectedLocation ===
                  "mobile" &&
                  selectedServiceId && (
                    <div className="mb-10">

                      <h3 className="font-serif text-lg mb-4 text-foreground">
                        Your Address
                      </h3>

                      <label className="block text-xs tracking-[0.1em] uppercase text-muted-foreground mb-2">
                        Area
                      </label>

                      <select
                        value={
                          addressZone
                        }
                        onChange={(event) =>
                          setAddressZone(
                            event
                              .target
                              .value
                          )
                        }
                        className="w-full mb-5 px-4 py-3 text-sm bg-background border border-border text-foreground focus:outline-none focus:border-accent"
                      >
                        <option value="">
                          Select area
                        </option>

                        <option value="Mainland">
                          Mainland
                        </option>

                        <option value="Island">
                          Island
                        </option>
                      </select>

                      <label className="block text-xs tracking-[0.1em] uppercase text-muted-foreground mb-2">
                        Full Address
                      </label>

                      <textarea
                        value={
                          fullAddress
                        }
                        onChange={(event) =>
                          setFullAddress(
                            event.target.value.slice(
                              0,
                              300
                            )
                          )
                        }
                        rows={3}
                        maxLength={300}
                        placeholder="Street, building, apartment / hotel & room number, landmark"
                        className="w-full px-4 py-3 text-sm bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent resize-none"
                      />

                      <p className="text-xs text-muted-foreground mt-2">
                        Required so your therapist can reach you on time.
                      </p>

                    </div>
                  )}

              </motion.div>
            )}

            {/* =================================================
                STEP 2 — DATE & TIME
            ================================================= */}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{
                  opacity: 0,
                  x: 20,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                exit={{
                  opacity: 0,
                  x: -20,
                }}
                transition={{
                  duration: 0.4,
                }}
              >

                <h2 className="font-serif text-xl mb-8 text-foreground">
                  Choose Date & Time
                </h2>

                {/* DATE */}

                <h3 className="font-serif text-lg mb-4 text-foreground flex items-center gap-2">
                  <Calendar
                    size={16}
                  />
                  Available Dates
                </h3>

                <div className="grid grid-cols-4 sm:grid-cols-7 gap-2 mb-10">
                  {dates.map(
                    (date) => {
                      const key =
                        date
                          .toISOString()
                          .split(
                            "T"
                          )[0];

                      const day =
                        date.toLocaleDateString(
                          "en-US",
                          {
                            weekday:
                              "short",
                          }
                        );

                      const number =
                        date.getDate();

                      const month =
                        date.toLocaleDateString(
                          "en-US",
                          {
                            month:
                              "short",
                          }
                        );

                      return (
                        <button
                          key={key}
                          type="button"
                          onClick={() => {
                            setSelectedDate(
                              key
                            );

                            setSelectedTime(
                              ""
                            );
                          }}
                          className={`p-3 border text-center transition-colors ${
                            selectedDate ===
                            key
                              ? "border-primary bg-secondary"
                              : "border-border hover:border-accent"
                          }`}
                        >
                          <span className="block text-[10px] uppercase text-muted-foreground">
                            {
                              day
                            }
                          </span>

                          <span className="block text-lg font-serif text-foreground">
                            {
                              number
                            }
                          </span>

                          <span className="block text-[10px] text-muted-foreground">
                            {
                              month
                            }
                          </span>
                        </button>
                      );
                    }
                  )}
                </div>

                {/* TIME */}

                {selectedDate && (
                  <>
                    <h3 className="font-serif text-lg mb-4 text-foreground flex items-center gap-2">
                      <Clock
                        size={16}
                      />
                      Available Times
                    </h3>

                    <div className="grid grid-cols-4 gap-2 mb-10 max-h-[280px] overflow-y-auto pr-1">
                      {timeSlots.map(
                        (time) => (
                          <button
                            key={time}
                            type="button"
                            onClick={() =>
                              setSelectedTime(
                                time
                              )
                            }
                            className={`p-2 text-sm border text-center transition-colors ${
                              selectedTime ===
                              time
                                ? "border-primary bg-secondary text-foreground"
                                : "border-border text-muted-foreground hover:border-accent"
                            }`}
                          >
                            {
                              time
                            }
                          </button>
                        )
                      )}
                    </div>
                  </>
                )}

              </motion.div>
            )}

            {/* =================================================
                STEP 3 — THERAPIST
            ================================================= */}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{
                  opacity: 0,
                  x: 20,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                exit={{
                  opacity: 0,
                  x: -20,
                }}
                transition={{
                  duration: 0.4,
                }}
              >

                <h2 className="font-serif text-xl mb-2 text-foreground">
                  Select Your Therapist
                </h2>

                <p className="text-sm text-muted-foreground mb-8">
                  Available therapists qualified for your selected service and time.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                  {availableTherapists.map(
                    (therapist) => (
                      <div
                        key={
                          therapist.id
                        }
                        className={`text-left border transition-all overflow-hidden ${
                          selectedTherapist ===
                          therapist.id
                            ? "border-primary ring-1 ring-primary"
                            : "border-border hover:border-accent"
                        }`}
                      >

                        {/* PHOTO */}

                        <button
                          type="button"
                          onClick={() => {
                            setGalleryTherapistId(
                              therapist.id
                            );

                            setGalleryIndex(
                              0
                            );
                          }}
                          className="block w-full aspect-[4/3] overflow-hidden bg-muted group relative"
                          aria-label={`View ${therapist.name} photo`}
                        >
                          {(
                            therapist.photo_url ||
                            therapist.photo
                          ) ? (
                            <img
                              src={
                                therapist.photo_url ||
                                therapist.photo
                              }
                              alt={
                                therapist.name
                              }
                              className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-muted-foreground font-serif text-2xl">
                              {
                                therapist
                                  .name[0]
                              }
                            </div>
                          )}

                          <span className="absolute bottom-2 right-2 text-[10px] tracking-[0.15em] uppercase bg-background/80 text-foreground px-2 py-1">
                            View
                          </span>
                        </button>

                        {/* THERAPIST INFO */}

                        <button
                          type="button"
                          onClick={() =>
                            setSelectedTherapist(
                              therapist.id
                            )
                          }
                          className="w-full text-left p-5"
                        >
                          <h3 className="font-serif text-lg text-foreground">
                            {
                              therapist.name
                            }
                          </h3>

                          <div className="flex flex-wrap gap-2 mt-2">
                            {therapist.specialties.map(
                              (
                                specialty: string
                              ) => (
                                <span
                                  key={
                                    specialty
                                  }
                                  className="text-[10px] tracking-[0.1em] uppercase px-2 py-1 bg-muted text-muted-foreground"
                                >
                                  {
                                    specialty
                                  }
                                </span>
                              )
                            )}
                          </div>

                          <span
                            className={`mt-4 inline-block text-[10px] tracking-[0.2em] uppercase ${
                              selectedTherapist ===
                              therapist.id
                                ? "text-primary"
                                : "text-muted-foreground"
                            }`}
                          >
                            {selectedTherapist ===
                            therapist.id
                              ? "Selected"
                              : "Tap to select"}
                          </span>
                        </button>

                      </div>
                    )
                  )}

                </div>

              </motion.div>
            )}

            {/* =================================================
                STEP 4 — SUMMARY
            ================================================= */}

            {step === 4 && (
              <motion.div
                key="step4"
                initial={{
                  opacity: 0,
                  x: 20,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                exit={{
                  opacity: 0,
                  x: -20,
                }}
                transition={{
                  duration: 0.4,
                }}
              >

                <h2 className="font-serif text-xl mb-8 text-foreground">
                  Booking Summary
                </h2>

                <div className="border border-border divide-y divide-border mb-10">

                  {/* CATEGORY */}

                  <div className="p-6 flex justify-between gap-6">
                    <span className="text-sm text-muted-foreground">
                      Category
                    </span>

                    <span className="text-sm text-foreground text-right">
                      {
                        selectedCategory
                      }
                    </span>
                  </div>

                  {/* SERVICE */}

                  <div className="p-6 flex justify-between gap-6">
                    <span className="text-sm text-muted-foreground">
                      Service
                    </span>

                    <span className="text-sm text-foreground text-right">
                      {
                        currentService?.name
                      }
                    </span>
                  </div>

                  {/* LOCATION */}

                  <div className="p-6 flex justify-between gap-6">
                    <span className="text-sm text-muted-foreground">
                      Location
                    </span>

                    <span className="text-sm text-foreground text-right">
                      {
                        locationOptions.find(
                          (location) =>
                            location.id ===
                            selectedLocation
                        )?.label
                      }
                    </span>
                  </div>

                  {/* ADDRESS */}

                  {selectedLocation ===
                    "mobile" && (
                    <div className="p-6 flex justify-between gap-6">
                      <span className="text-sm text-muted-foreground shrink-0">
                        Address
                      </span>

                      <span className="text-sm text-foreground text-right">
                        {
                          addressZone
                        }{" "}
                        —{" "}
                        {
                          fullAddress
                        }
                      </span>
                    </div>
                  )}

                  {/* DATE & TIME */}

                  <div className="p-6 flex justify-between gap-6">
                    <span className="text-sm text-muted-foreground">
                      Date & Time
                    </span>

                    <span className="text-sm text-foreground text-right">
                      {
                        selectedDate
                      }{" "}
                      at{" "}
                      {
                        selectedTime
                      }
                    </span>
                  </div>

                  {/* THERAPIST */}

                  {requiresTherapist && (
                    <div className="p-6 flex justify-between gap-6">
                      <span className="text-sm text-muted-foreground">
                        Therapist
                      </span>

                      <span className="text-sm text-foreground text-right">
                        {
                          selectedTherapistData?.name
                        }
                      </span>
                    </div>
                  )}

                  {/* HOT STONE */}

                  {addHotStone && (
                    <div className="p-6 flex justify-between gap-6">
                      <span className="text-sm text-muted-foreground">
                        Add-On: Hot Stone
                      </span>

                      <span className="text-sm font-medium text-foreground">
                        {
                          hotStonePrice
                        }
                      </span>
                    </div>
                  )}

                  {/* PRICE */}

                  <div className="p-6 flex justify-between gap-6">
                    <span className="text-sm text-muted-foreground">
                      Price
                    </span>

                    <span className="text-sm font-medium text-foreground">
                      {
                        currentService?.price
                      }

                      {addHotStone
                        ? ` + ${hotStonePrice}`
                        : ""}
                    </span>
                  </div>

                  {/* DEPOSIT */}

                  <div className="p-6 flex justify-between bg-secondary gap-6">
                    <span className="text-sm text-foreground font-medium">
                      Deposit Required (30%)
                    </span>

                    <span className="text-sm font-medium text-foreground">
                      ₦
                      {bookingDeposit.toLocaleString()}
                    </span>
                  </div>

                </div>

                {/* POLICIES */}

                <div className="bg-card border border-border p-6 mb-10">
                  <h3 className="font-serif text-base mb-3 text-foreground">
                    Important Policies
                  </h3>

                  <ul className="space-y-2">
                    <li className="text-xs text-muted-foreground">
                      • A non-refundable deposit of 30% of your total service charge is required to confirm your booking.
                    </li>

                    <li className="text-xs text-muted-foreground">
                      • Rescheduling requires a minimum of 6 hours' notice.
                    </li>

                    <li className="text-xs text-muted-foreground">
                      • Late arrivals may result in a shortened session.
                    </li>

                    <li className="text-xs text-muted-foreground">
                      • Balance is due at the start of your session.
                    </li>
                  </ul>
                </div>

                {/* CONFIRM */}

                <button
                  type="button"
                  className="w-full py-4 text-xs tracking-[0.2em] uppercase bg-primary text-primary-foreground hover:bg-warm-taupe transition-colors duration-300"
                  onClick={() => {
                    const depositFmt =
                      `₦${bookingDeposit.toLocaleString()}`;

                    const totalFmt =
                      `₦${bookingTotal.toLocaleString()}`;

                    const therapistLine =
                      requiresTherapist
                        ? `\nTherapist: ${selectedTherapistData?.name}`
                        : "";

                    const addressLine =
                      selectedLocation ===
                      "mobile"
                        ? `\nArea: ${addressZone}\nAddress: ${fullAddress.trim()}`
                        : "";

                    const msg =
                      `Hello, I'd like to confirm my booking:\n\n` +
                      `Category: ${selectedCategory}\n` +
                      `Service: ${currentService?.name}\n` +
                      `Price: ${currentService?.price}` +
                      `${
                        addHotStone
                          ? ` + ${hotStonePrice} (Hot Stone)`
                          : ""
                      }\n` +
                      `Total: ${totalFmt}\n` +
                      `Deposit (30%): ${depositFmt}\n` +
                      `Location: ${
                        locationOptions.find(
                          (location) =>
                            location.id ===
                            selectedLocation
                        )?.label
                      }` +
                      `${addressLine}\n` +
                      `Date: ${selectedDate}\n` +
                      `Time: ${selectedTime}` +
                      `${therapistLine}\n\n` +
                      `I'm ready to pay the ${depositFmt} deposit.`;

                    window.open(
                      "https://wa.me/2347033948417?text=" +
                        encodeURIComponent(
                          msg
                        ),
                      "_blank"
                    );
                  }}
                >
                  Confirm & Pay Deposit via WhatsApp
                </button>

              </motion.div>
            )}

          </AnimatePresence>

          {/* ==================================================
              NAVIGATION
          ================================================== */}

          <div className="flex justify-between mt-12">

            {step > 1 ? (
              <button
                type="button"
                onClick={
                  goBack
                }
                className="inline-flex items-center gap-2 text-xs tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft
                  size={14}
                />
                Back
              </button>
            ) : (
              <div />
            )}

            {step < 4 && (
              <button
                type="button"
                onClick={
                  goNext
                }
                disabled={
                  !canProceed()
                }
                className={`inline-flex items-center gap-2 px-8 py-3 text-xs tracking-[0.2em] uppercase transition-colors duration-300 ${
                  canProceed()
                    ? "bg-primary text-primary-foreground hover:bg-warm-taupe"
                    : "bg-muted text-muted-foreground cursor-not-allowed"
                }`}
              >
                Continue
                <ArrowRight
                  size={14}
                />
              </button>
            )}

          </div>

        </div>
      </section>

      {/* ======================================================
          THERAPIST GALLERY
      ====================================================== */}

      <Dialog
        open={
          !!galleryTherapistId
        }
        onOpenChange={(
          open
        ) => {
          if (!open) {
            setGalleryTherapistId(
              null
            );

            setGalleryIndex(
              0
            );
          }
        }}
      >
        <DialogContent className="max-w-3xl p-0 overflow-hidden bg-background border-border">

          {galleryTherapist && (
            <div className="flex flex-col">

              {/* IMAGE */}

              <div className="bg-muted relative">

                {galleryPhotos.length >
                0 ? (
                  <img
                    src={
                      galleryPhotos[
                        Math.min(
                          galleryIndex,
                          galleryPhotos.length -
                            1
                        )
                      ]
                    }
                    alt={
                      galleryTherapist.name
                    }
                    className="w-full max-h-[75vh] object-contain"
                  />
                ) : (
                  <div className="aspect-[4/3] flex items-center justify-center text-muted-foreground font-serif text-5xl">
                    {
                      galleryTherapist
                        .name[0]
                    }
                  </div>
                )}

                {/* PREVIOUS / NEXT */}

                {galleryPhotos.length >
                  1 && (
                  <>
                    <button
                      type="button"
                      onClick={() =>
                        setGalleryIndex(
                          (
                            index
                          ) =>
                            (index -
                              1 +
                              galleryPhotos.length) %
                            galleryPhotos.length
                        )
                      }
                      className="absolute left-3 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background text-foreground p-2 rounded-full"
                      aria-label="Previous photo"
                    >
                      <ArrowLeft
                        size={16}
                      />
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        setGalleryIndex(
                          (
                            index
                          ) =>
                            (index +
                              1) %
                            galleryPhotos.length
                        )
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background text-foreground p-2 rounded-full"
                      aria-label="Next photo"
                    >
                      <ArrowRight
                        size={16}
                      />
                    </button>

                    <span className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.2em] uppercase bg-background/80 text-foreground px-2 py-1">
                      {Math.min(
                        galleryIndex,
                        galleryPhotos.length -
                          1
                      ) + 1}{" "}
                      /{" "}
                      {
                        galleryPhotos.length
                      }
                    </span>
                  </>
                )}

              </div>

              {/* THUMBNAILS */}

              {galleryPhotos.length >
                1 && (
                <div className="flex gap-2 px-6 pt-4 overflow-x-auto">
                  {galleryPhotos.map(
                    (
                      photo,
                      index
                    ) => (
                      <button
                        key={
                          photo +
                          index
                        }
                        type="button"
                        onClick={() =>
                          setGalleryIndex(
                            index
                          )
                        }
                        className={`w-16 h-16 flex-shrink-0 overflow-hidden border ${
                          index ===
                          galleryIndex
                            ? "border-primary"
                            : "border-border opacity-60 hover:opacity-100"
                        }`}
                      >
                        <img
                          src={
                            photo
                          }
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </button>
                    )
                  )}
                </div>
              )}

              {/* THERAPIST INFO */}

              <div className="p-6 flex items-center justify-between gap-4">

                <div>
                  <h3 className="font-serif text-2xl text-foreground">
                    {
                      galleryTherapist.name
                    }
                  </h3>

                  <div className="flex flex-wrap gap-2 mt-2">
                    {galleryTherapist.specialties.map(
                      (
                        specialty: string
                      ) => (
                        <span
                          key={
                            specialty
                          }
                          className="text-[10px] tracking-[0.1em] uppercase px-2 py-1 bg-muted text-muted-foreground"
                        >
                          {
                            specialty
                          }
                        </span>
                      )
                    )}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedTherapist(
                      galleryTherapist.id
                    );

                    setGalleryTherapistId(
                      null
                    );

                    setGalleryIndex(
                      0
                    );
                  }}
                  className="px-6 py-3 text-xs tracking-[0.2em] uppercase bg-primary text-primary-foreground hover:bg-warm-taupe transition-colors whitespace-nowrap"
                >
                  Select Therapist
                </button>

              </div>

            </div>
          )}

        </DialogContent>
      </Dialog>

    </Layout>
  );
};

export default Booking;
