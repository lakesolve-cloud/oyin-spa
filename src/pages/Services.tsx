import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Clock, MapPin } from "lucide-react";
import Layout from "@/components/Layout";
import { fadeUp } from "@/lib/animations";
import heroImage from "@/assets/hero-spa.jpg";

const services = [
  {
    category: "Massage Therapy",
    items: [
      { name: "Deep Tissue Restoration", desc: "Targeted pressure work to release chronic tension, knots, and muscle fatigue. Ideal for executives, athletes, and those carrying physical stress.", durations: ["60 min", "90 min", "120 min"], locations: ["In-Spa", "Mobile"] },
      { name: "Swedish Relaxation", desc: "Full-body flowing strokes designed to calm the nervous system and promote deep relaxation.", durations: ["60 min", "90 min"], locations: ["In-Spa", "Mobile"] },
      { name: "Aromatherapy Journey", desc: "A sensory experience combining therapeutic massage with curated essential oil blends tailored to your needs.", durations: ["75 min", "90 min"], locations: ["In-Spa", "Mobile"] },
      { name: "Hot Stone Ritual", desc: "Heated basalt stones placed on key points of the body, combined with massage techniques for deep muscle release.", durations: ["90 min"], locations: ["In-Spa"] },
    ],
  },
  {
    category: "Specialty Experiences",
    items: [
      { name: "The Couples Retreat", desc: "A shared experience of relaxation for two, in our private suite or your chosen setting. Perfect for anniversaries and special occasions.", durations: ["90 min", "120 min"], locations: ["In-Spa", "Mobile"] },
      { name: "Prenatal Wellness", desc: "Gentle, nurturing massage designed specifically for expectant mothers. Safe, supported, and deeply calming.", durations: ["60 min", "75 min"], locations: ["In-Spa", "Mobile"] },
      { name: "Post-Op Recovery", desc: "Specialized lymphatic and gentle tissue work to support healing after cosmetic or medical procedures.", durations: ["60 min", "90 min"], locations: ["Mobile"] },
      { name: "Executive Reset", desc: "A combination of deep tissue and relaxation techniques designed for high-performing professionals who need to decompress.", durations: ["90 min", "120 min"], locations: ["In-Spa", "Mobile"] },
    ],
  },
];

const Services = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative py-32 lg:py-40">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Luxury spa treatment room" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-warm-charcoal/60" />
        </div>
        <div className="relative container mx-auto px-6 lg:px-12 text-center">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-xs tracking-[0.3em] uppercase text-warm-stone mb-4">
            Our Services
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="font-serif text-4xl md:text-6xl text-warm-cream max-w-2xl mx-auto"
          >
            Curated Experiences for <span className="italic">Mind & Body</span>
          </motion.h1>
        </div>
      </section>

      {/* Services List */}
      {services.map((category, ci) => (
        <section key={category.category} className={`py-24 lg:py-32 ${ci % 2 === 1 ? "bg-secondary" : ""}`}>
          <div className="container mx-auto px-6 lg:px-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-serif text-3xl md:text-4xl text-foreground mb-16"
            >
              {category.category}
            </motion.h2>
            <div className="space-y-px bg-border">
              {category.items.map((service, i) => (
                <motion.div
                  key={service.name}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  className="bg-background p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-6 items-start"
                >
                  <div>
                    <h3 className="font-serif text-xl mb-3 text-foreground">{service.name}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4 max-w-2xl">{service.desc}</p>
                    <div className="flex flex-wrap gap-4">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock size={12} />
                        {service.durations.join(" · ")}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <MapPin size={12} />
                        {service.locations.join(" · ")}
                      </div>
                    </div>
                  </div>
                  <Link
                    to="/booking"
                    className="self-center text-xs tracking-[0.15em] uppercase text-accent hover:text-foreground transition-colors inline-flex items-center gap-2 flex-shrink-0"
                  >
                    Book <ArrowRight size={12} />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Policies */}
      <section className="py-24 lg:py-32 bg-secondary">
        <div className="container mx-auto px-6 lg:px-12 max-w-3xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-3xl text-center mb-12 text-foreground"
          >
            Booking Policies
          </motion.h2>
          <div className="space-y-6">
            {[
              { title: "Deposit Required", text: "A non-refundable deposit is required to confirm all bookings. This secures your therapist and time slot." },
              { title: "Punctuality", text: "Please arrive on time for in-spa sessions. Late arrivals may result in a shortened session with no reduction in fee." },
              { title: "Rescheduling", text: "We require a minimum of 6 hours' notice for rescheduling. Less than 6 hours' notice will forfeit your deposit." },
              { title: "Hygiene Standards", text: "All equipment is sanitized between clients. Our therapists follow strict hygiene protocols for your safety and comfort." },
            ].map((policy, i) => (
              <motion.div
                key={policy.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="bg-background p-8 border border-border"
              >
                <h3 className="font-serif text-base mb-2 text-foreground">{policy.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{policy.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 lg:py-32 text-center">
        <div className="container mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <motion.h2 custom={0} variants={fadeUp} className="font-serif text-3xl md:text-4xl text-foreground mb-6">
              Ready to Book?
            </motion.h2>
            <motion.div custom={1} variants={fadeUp}>
              <Link
                to="/booking"
                className="inline-flex items-center gap-3 px-10 py-4 text-xs tracking-[0.2em] uppercase bg-primary text-primary-foreground hover:bg-warm-taupe transition-colors duration-300"
              >
                Book Your Experience <ArrowRight size={14} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
