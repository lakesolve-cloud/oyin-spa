import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";
import { fadeUp } from "@/lib/animations";
import heroImage from "@/assets/hero-spa.jpg";
import { spaServices, massageServices, quickMassages, massageAddOns } from "@/data/services";

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
            Services & <span className="italic">Price List</span>
          </motion.h1>
        </div>
      </section>

      {/* Spa Services */}
      <section className="py-24 lg:py-32">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-3xl md:text-4xl text-foreground mb-4 text-center"
          >
            Spa Services
          </motion.h2>
          <p className="text-sm text-muted-foreground text-center mb-16 max-w-xl mx-auto">
            Comprehensive treatments for body, face, and wellness.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {spaServices.map((category, ci) => (
              <motion.div
                key={category.category}
                custom={ci}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="border border-border bg-background"
              >
                <div className="px-6 py-5 border-b border-border bg-secondary">
                  <h3 className="font-serif text-lg text-foreground">{category.category}</h3>
                </div>
                <div className="divide-y divide-border">
                  {category.items?.map((item) => (
                    <div key={item.name} className="px-6 py-4 flex justify-between items-center gap-4">
                      <span className="text-sm text-foreground">{item.name}</span>
                      <span className="text-sm font-medium text-foreground whitespace-nowrap">{item.price}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Massage Services */}
      <section className="py-24 lg:py-32 bg-secondary">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-3xl md:text-4xl text-foreground mb-4 text-center"
          >
            Massage
          </motion.h2>
          <p className="text-sm text-muted-foreground text-center mb-16 max-w-xl mx-auto">
            From deep relaxation to targeted recovery — choose your ideal experience.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {massageServices.map((service, si) => (
              <motion.div
                key={service.name}
                custom={si}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="border border-border bg-background"
              >
                <div className="px-6 py-5 border-b border-border bg-background">
                  <h3 className="font-serif text-lg text-foreground">{service.name}</h3>
                </div>
                <div className="divide-y divide-border">
                  {service.items.map((item) => (
                    <div key={item.duration} className="px-6 py-4 flex justify-between items-center gap-4">
                      <span className="text-sm text-muted-foreground">{item.duration}</span>
                      <span className="text-sm font-medium text-foreground">{item.price}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Quick Massages & Add-ons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mt-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="border border-border bg-background"
            >
              <div className="px-6 py-5 border-b border-border">
                <h3 className="font-serif text-lg text-foreground">Quick Sessions</h3>
              </div>
              <div className="divide-y divide-border">
                {quickMassages.map((item) => (
                  <div key={item.name} className="px-6 py-4 flex justify-between items-center gap-4">
                    <span className="text-sm text-foreground">{item.name}</span>
                    <span className="text-sm font-medium text-foreground">{item.price}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="border border-border bg-background"
            >
              <div className="px-6 py-5 border-b border-border">
                <h3 className="font-serif text-lg text-foreground">Add-Ons</h3>
              </div>
              <div className="divide-y divide-border">
                {massageAddOns.map((item) => (
                  <div key={item.name} className="px-6 py-4 flex justify-between items-center gap-4">
                    <span className="text-sm text-foreground">{item.name}</span>
                    <span className="text-sm font-medium text-foreground">{item.price}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Policies */}
      <section className="py-24 lg:py-32">
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
                className="bg-secondary p-8 border border-border"
              >
                <h3 className="font-serif text-base mb-2 text-foreground">{policy.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{policy.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 lg:py-32 bg-secondary text-center">
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
