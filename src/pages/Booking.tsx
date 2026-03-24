import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Check, MapPin, Clock, Calendar, ChevronDown } from "lucide-react";
import Layout from "@/components/Layout";
import { fadeUp } from "@/lib/animations";
import { supabase } from "@/integrations/supabase/client";
import { spaServices, massageServices, quickMassages, massageAddOns } from "@/data/services";
import therapistAmara from "@/assets/therapist-amara.jpg";
import therapistChidera from "@/assets/therapist-chidera.jpg";
import therapistFolake from "@/assets/therapist-folake.jpg";
import therapistBisi from "@/assets/therapist-bisi.jpg";
import therapistNneka from "@/assets/therapist-nneka.jpg";

// Build a flat bookable list from the services data
interface BookableService {
  id: string;
  category: string;
  name: string;
  price: string;
  duration?: string;
}

const bookableServices: BookableService[] = (() => {
  const list: BookableService[] = [];

  // Spa services (flat price, no duration)
  spaServices.forEach((cat) => {
    cat.items?.forEach((item) => {
      list.push({
        id: `${cat.category}--${item.name}`.toLowerCase().replace(/\s+/g, "-"),
        category: cat.category,
        name: item.name,
        price: item.price,
      });
    });
  });

  // Massage services (duration-based)
  massageServices.forEach((service) => {
    service.items.forEach((item) => {
      list.push({
        id: `massage--${service.name}--${item.duration}`.toLowerCase().replace(/\s+/g, "-"),
        category: "Massage",
        name: `${service.name} — ${item.duration}`,
        price: item.price,
        duration: item.duration,
      });
    });
  });

  // Quick massages
  quickMassages.forEach((item) => {
    list.push({
      id: `quick--${item.name}`.toLowerCase().replace(/\s+/g, "-"),
      category: "Massage",
      name: item.name,
      price: item.price,
    });
  });

  return list;
})();

// Get unique categories preserving order
const categories = [...new Set(bookableServices.map((s) => s.category))];

const locationOptions = [
  { id: "in-spa", label: "In-Spa", desc: "Visit our private studio" },
  { id: "mobile", label: "Home / Hotel", desc: "We come to you" },
];

const timeSlots = ["09:00", "10:30", "12:00", "13:30", "15:00", "16:30", "18:00", "19:30"];

const fallbackTherapists = [
  { id: "1", name: "Amara", specialties: ["Deep Tissue", "Sports Recovery"], available: true, photo_url: null, photo: therapistAmara },
  { id: "2", name: "Chidera", specialties: ["Relaxation", "Aromatherapy"], available: true, photo_url: null, photo: therapistChidera },
  { id: "3", name: "Folake", specialties: ["Prenatal", "Relaxation"], available: true, photo_url: null, photo: therapistFolake },
  { id: "4", name: "Bisi", specialties: ["Deep Tissue", "Hot Stone"], available: false, photo_url: null, photo: therapistBisi },
  { id: "5", name: "Nneka", specialties: ["Couples", "Executive"], available: true, photo_url: null, photo: therapistNneka },
];

const Booking = () => {
  const [step, setStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedServiceId, setSelectedServiceId] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedTherapist, setSelectedTherapist] = useState<string | null>(null);
  const [therapists, setTherapists] = useState(fallbackTherapists);
  const [addHotStone, setAddHotStone] = useState(false);

  useEffect(() => {
    const fetchTherapists = async () => {
      const { data } = await supabase.from("therapists").select("*").order("created_at");
      if (data && data.length > 0) {
        setTherapists(data.map((t) => ({ ...t, photo: t.photo_url || "" })));
      }
    };
    fetchTherapists();
  }, []);

  const filteredServices = useMemo(
    () => bookableServices.filter((s) => s.category === selectedCategory),
    [selectedCategory]
  );

  const currentService = bookableServices.find((s) => s.id === selectedServiceId);
  const availableTherapists = therapists.filter((t) => t.available);
  const selectedTherapistData = therapists.find((t) => t.id === selectedTherapist);
  const isMassageCategory = selectedCategory === "Massage";

  const canProceed = () => {
    switch (step) {
      case 1: return selectedServiceId && selectedLocation;
      case 2: return selectedDate && selectedTime;
      case 3: return selectedTherapist !== null;
      default: return false;
    }
  };

  const dates = Array.from({ length: 14 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i + 1);
    return d;
  });

  return (
    <Layout>
      <section className="py-24 lg:py-32">
        <div className="container mx-auto px-6 lg:px-12 max-w-3xl">
          {/* Header */}
          <motion.div initial="hidden" animate="visible" className="text-center mb-16">
            <motion.p custom={0} variants={fadeUp} className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">
              Book Your Experience
            </motion.p>
            <motion.h1 custom={1} variants={fadeUp} className="font-serif text-3xl md:text-5xl text-foreground">
              Reserve Your Session
            </motion.h1>
          </motion.div>

          {/* Progress */}
          <div className="flex items-center justify-center gap-3 mb-16">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs transition-colors ${
                    step >= s ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {step > s ? <Check size={14} /> : s}
                </div>
                {s < 4 && <div className={`w-8 h-px ${step > s ? "bg-primary" : "bg-border"}`} />}
              </div>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {/* Step 1: Service Selection */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
              >
                {/* Category Selection */}
                <h2 className="font-serif text-xl mb-6 text-foreground">Select Category</h2>
                <div className="flex flex-wrap gap-2 mb-10">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        setSelectedCategory(cat);
                        setSelectedServiceId("");
                        setAddHotStone(false);
                      }}
                      className={`px-4 py-2 text-xs tracking-[0.1em] uppercase border transition-colors ${
                        selectedCategory === cat
                          ? "border-primary bg-secondary text-foreground"
                          : "border-border text-muted-foreground hover:border-accent"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Service Selection */}
                {selectedCategory && (
                  <>
                    <h3 className="font-serif text-lg mb-4 text-foreground">Select Service</h3>
                    <div className="space-y-2 mb-10 max-h-[320px] overflow-y-auto pr-1">
                      {filteredServices.map((service) => (
                        <button
                          key={service.id}
                          onClick={() => setSelectedServiceId(service.id)}
                          className={`w-full text-left px-5 py-4 border transition-colors flex justify-between items-center gap-4 ${
                            selectedServiceId === service.id
                              ? "border-primary bg-secondary"
                              : "border-border hover:border-accent"
                          }`}
                        >
                          <span className="text-sm text-foreground">{service.name}</span>
                          <span className="text-sm font-medium text-foreground whitespace-nowrap">{service.price}</span>
                        </button>
                      ))}
                    </div>
                  </>
                )}

                {/* Hot Stone Add-on for massage */}
                {selectedServiceId && isMassageCategory && (
                  <div className="mb-10">
                    <h3 className="font-serif text-lg mb-4 text-foreground">Add-Ons</h3>
                    <button
                      onClick={() => setAddHotStone(!addHotStone)}
                      className={`w-full text-left px-5 py-4 border transition-colors flex justify-between items-center gap-4 ${
                        addHotStone
                          ? "border-primary bg-secondary"
                          : "border-border hover:border-accent"
                      }`}
                    >
                      <span className="text-sm text-foreground">Hot Stone Add-On</span>
                      <span className="text-sm font-medium text-foreground">₦10,000</span>
                    </button>
                  </div>
                )}

                {/* Location */}
                {selectedServiceId && (
                  <>
                    <h3 className="font-serif text-lg mb-4 text-foreground">Location</h3>
                    <div className="grid grid-cols-2 gap-4 mb-10">
                      {locationOptions.map((loc) => (
                        <button
                          key={loc.id}
                          onClick={() => setSelectedLocation(loc.id)}
                          className={`p-6 border text-center transition-colors ${
                            selectedLocation === loc.id
                              ? "border-primary bg-secondary"
                              : "border-border hover:border-accent"
                          }`}
                        >
                          <MapPin className="w-5 h-5 mx-auto mb-2 text-accent" />
                          <span className="block text-sm font-medium text-foreground">{loc.label}</span>
                          <span className="block text-xs text-muted-foreground mt-1">{loc.desc}</span>
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </motion.div>
            )}

            {/* Step 2: Date & Time */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
              >
                <h2 className="font-serif text-xl mb-8 text-foreground">Choose Date & Time</h2>

                <h3 className="font-serif text-lg mb-4 text-foreground flex items-center gap-2">
                  <Calendar size={16} /> Available Dates
                </h3>
                <div className="grid grid-cols-4 sm:grid-cols-7 gap-2 mb-10">
                  {dates.map((d) => {
                    const key = d.toISOString().split("T")[0];
                    const day = d.toLocaleDateString("en-US", { weekday: "short" });
                    const num = d.getDate();
                    const month = d.toLocaleDateString("en-US", { month: "short" });
                    return (
                      <button
                        key={key}
                        onClick={() => setSelectedDate(key)}
                        className={`p-3 border text-center transition-colors ${
                          selectedDate === key
                            ? "border-primary bg-secondary"
                            : "border-border hover:border-accent"
                        }`}
                      >
                        <span className="block text-[10px] uppercase text-muted-foreground">{day}</span>
                        <span className="block text-lg font-serif text-foreground">{num}</span>
                        <span className="block text-[10px] text-muted-foreground">{month}</span>
                      </button>
                    );
                  })}
                </div>

                {selectedDate && (
                  <>
                    <h3 className="font-serif text-lg mb-4 text-foreground flex items-center gap-2">
                      <Clock size={16} /> Available Times
                    </h3>
                    <div className="grid grid-cols-4 gap-3 mb-10">
                      {timeSlots.map((t) => (
                        <button
                          key={t}
                          onClick={() => setSelectedTime(t)}
                          className={`p-3 text-sm border text-center transition-colors ${
                            selectedTime === t
                              ? "border-primary bg-secondary text-foreground"
                              : "border-border text-muted-foreground hover:border-accent"
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </motion.div>
            )}

            {/* Step 3: Therapist Selection */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
              >
                <h2 className="font-serif text-xl mb-2 text-foreground">Select Your Therapist</h2>
                <p className="text-sm text-muted-foreground mb-8">
                  Available therapists qualified for your selected service and time.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {availableTherapists.map((therapist) => (
                    <button
                      key={therapist.id}
                      onClick={() => setSelectedTherapist(therapist.id)}
                      className={`text-left border transition-all overflow-hidden ${
                        selectedTherapist === therapist.id
                          ? "border-primary ring-1 ring-primary"
                          : "border-border hover:border-accent"
                      }`}
                    >
                      <div className="aspect-[4/3] overflow-hidden bg-muted">
                        {(therapist.photo_url || therapist.photo) ? (
                          <img
                            src={therapist.photo_url || therapist.photo}
                            alt={therapist.name}
                            className="w-full h-full object-cover object-top"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-muted-foreground font-serif text-2xl">
                            {therapist.name[0]}
                          </div>
                        )}
                      </div>
                      <div className="p-5">
                        <h3 className="font-serif text-lg text-foreground">{therapist.name}</h3>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {therapist.specialties.map((s) => (
                            <span key={s} className="text-[10px] tracking-[0.1em] uppercase px-2 py-1 bg-muted text-muted-foreground">
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 4: Summary */}
            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
              >
                <h2 className="font-serif text-xl mb-8 text-foreground">Booking Summary</h2>

                <div className="border border-border divide-y divide-border mb-10">
                  <div className="p-6 flex justify-between">
                    <span className="text-sm text-muted-foreground">Category</span>
                    <span className="text-sm text-foreground">{selectedCategory}</span>
                  </div>
                  <div className="p-6 flex justify-between">
                    <span className="text-sm text-muted-foreground">Service</span>
                    <span className="text-sm text-foreground">{currentService?.name}</span>
                  </div>
                  <div className="p-6 flex justify-between">
                    <span className="text-sm text-muted-foreground">Location</span>
                    <span className="text-sm text-foreground">
                      {locationOptions.find((l) => l.id === selectedLocation)?.label}
                    </span>
                  </div>
                  <div className="p-6 flex justify-between">
                    <span className="text-sm text-muted-foreground">Date & Time</span>
                    <span className="text-sm text-foreground">{selectedDate} at {selectedTime}</span>
                  </div>
                  <div className="p-6 flex justify-between">
                    <span className="text-sm text-muted-foreground">Therapist</span>
                    <span className="text-sm text-foreground">{selectedTherapistData?.name}</span>
                  </div>
                  {addHotStone && (
                    <div className="p-6 flex justify-between">
                      <span className="text-sm text-muted-foreground">Add-On: Hot Stone</span>
                      <span className="text-sm font-medium text-foreground">₦10,000</span>
                    </div>
                  )}
                  <div className="p-6 flex justify-between">
                    <span className="text-sm text-muted-foreground">Price</span>
                    <span className="text-sm font-medium text-foreground">
                      {currentService?.price}{addHotStone ? " + ₦10,000" : ""}
                    </span>
                  </div>
                  <div className="p-6 flex justify-between bg-secondary">
                    <span className="text-sm text-foreground font-medium">Deposit Required</span>
                    <span className="text-sm font-medium text-foreground">₦15,000</span>
                  </div>
                </div>

                {/* Policies */}
                <div className="bg-card border border-border p-6 mb-10">
                  <h3 className="font-serif text-base mb-3 text-foreground">Important Policies</h3>
                  <ul className="space-y-2">
                    <li className="text-xs text-muted-foreground">• A non-refundable deposit of ₦15,000 is required to confirm your booking.</li>
                    <li className="text-xs text-muted-foreground">• Rescheduling requires a minimum of 6 hours' notice.</li>
                    <li className="text-xs text-muted-foreground">• Late arrivals may result in a shortened session.</li>
                    <li className="text-xs text-muted-foreground">• Balance is due at the start of your session.</li>
                  </ul>
                </div>

                <button
                  className="w-full py-4 text-xs tracking-[0.2em] uppercase bg-primary text-primary-foreground hover:bg-warm-taupe transition-colors duration-300"
                  onClick={() => {
                    const msg = `Hello, I'd like to confirm my booking:\n\nCategory: ${selectedCategory}\nService: ${currentService?.name}\nPrice: ${currentService?.price}${addHotStone ? " + ₦10,000 (Hot Stone)" : ""}\nLocation: ${locationOptions.find(l => l.id === selectedLocation)?.label}\nDate: ${selectedDate}\nTime: ${selectedTime}\nTherapist: ${selectedTherapistData?.name}\n\nI'm ready to pay the deposit.`;
                    window.open("https://wa.me/2347033948417?text=" + encodeURIComponent(msg), "_blank");
                  }}
                >
                  Confirm & Pay Deposit via WhatsApp
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-12">
            {step > 1 ? (
              <button
                onClick={() => setStep(step - 1)}
                className="inline-flex items-center gap-2 text-xs tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft size={14} /> Back
              </button>
            ) : <div />}
            {step < 4 && (
              <button
                onClick={() => canProceed() && setStep(step + 1)}
                disabled={!canProceed()}
                className={`inline-flex items-center gap-2 px-8 py-3 text-xs tracking-[0.2em] uppercase transition-colors duration-300 ${
                  canProceed()
                    ? "bg-primary text-primary-foreground hover:bg-warm-taupe"
                    : "bg-muted text-muted-foreground cursor-not-allowed"
                }`}
              >
                Continue <ArrowRight size={14} />
              </button>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Booking;
