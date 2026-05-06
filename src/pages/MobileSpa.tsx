import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Check } from "lucide-react";
import Layout from "@/components/Layout";
import { fadeUp } from "@/lib/animations";
import {
  mobileMassageServices,
  mobileQuickMassages,
  mobileMassageAddOns,
  mobileSpaServices,
} from "@/data/services";
import mobileImage from "@/assets/mobile-spa.jpg";

const MobileSpa = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative min-h-[80vh] flex items-center">
        <div className="absolute inset-0">
          <img
            src={mobileImage}
            alt="Mobile spa setup in luxury Lagos penthouse"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-warm-charcoal/50" />
        </div>
        <div className="relative container mx-auto px-6 lg:px-12">
          <motion.div initial="hidden" animate="visible" className="max-w-3xl">
            <motion.p
              custom={0}
              variants={fadeUp}
              className="text-xs tracking-[0.3em] uppercase text-warm-stone mb-6"
            >
              Our Signature Offering
            </motion.p>
            <motion.h1
              custom={1}
              variants={fadeUp}
              className="font-serif text-4xl md:text-6xl text-warm-cream mb-8 leading-tight"
            >
              The Spa Comes <span className="italic">to You</span>
            </motion.h1>
            <motion.p
              custom={2}
              variants={fadeUp}
              className="text-lg text-warm-stone/90 max-w-xl leading-relaxed"
            >
              A complete, premium spa experience — in your home, hotel suite, or
              office. No traffic. No waiting. Just wellness, delivered.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* What We Bring */}
      <section className="py-24 lg:py-32">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <motion.p
              custom={0}
              variants={fadeUp}
              className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4"
            >
              Everything You Need
            </motion.p>
            <motion.h2
              custom={1}
              variants={fadeUp}
              className="font-serif text-3xl md:text-4xl text-foreground"
            >
              We Bring the Entire Experience
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Professional Massage Table",
                desc: "Hospital-grade portable table with premium padding and face cradle for optimal comfort.",
              },
              {
                title: "Premium Linens",
                desc: "Fresh, crisp white linens — changed for every client, always impeccably clean.",
              },
              {
                title: "Curated Oils & Products",
                desc: "Therapeutic-grade essential oils and premium massage products tailored to your preferences.",
              },
              {
                title: "Ambient Setup",
                desc: "Portable speakers with calming playlists, flameless candles, and aromatherapy diffusers.",
              },
              {
                title: "Hygiene Kit",
                desc: "Sanitisation supplies, disposable items, and a complete cleanup — we leave your space as we found it.",
              },
              {
                title: "Your Chosen Therapist",
                desc: "A vetted, experienced professional who arrives punctually and maintains the highest standards.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="p-8 border border-border bg-card"
              >
                <Sparkles
                  className="w-5 h-5 text-accent mb-4"
                  strokeWidth={1.5}
                />
                <h3 className="font-serif text-lg mb-2 text-foreground">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Ideal For */}
      <section className="py-24 lg:py-32 bg-secondary">
        <div className="container mx-auto px-6 lg:px-12 max-w-4xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.h2
              custom={0}
              variants={fadeUp}
              className="font-serif text-3xl md:text-4xl text-foreground mb-4"
            >
              Perfect For
            </motion.h2>
            <motion.p
              custom={1}
              variants={fadeUp}
              className="text-muted-foreground"
            >
              Our mobile spa service is designed for those who value their time
              and comfort above all.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              "Busy executives who can't afford travel time",
              "VIPs and high-profile individuals seeking exclusivity",
              "Brides and bridal parties on their special day",
              "Travellers in Lagos hotels seeking authentic luxury",
              "Post-care recovery requiring at-home support",
              "Couples wanting a shared wellness experience",
              "New mothers needing postnatal wellness support",
              "Corporate teams for executive wellness events",
            ].map((item, i) => (
              <motion.div
                key={item}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="flex items-start gap-3 p-4"
              >
                <Check className="w-4 h-4 mt-1 text-accent flex-shrink-0" />
                <span className="text-sm text-foreground">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 lg:py-32">
        <div className="container mx-auto px-6 lg:px-12 max-w-3xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-3xl md:text-4xl text-center mb-16 text-foreground"
          >
            How It Works
          </motion.h2>
          <div className="space-y-12">
            {[
              {
                step: "01",
                title: "Book Your Session",
                desc: "Select your service, preferred time, and location. Choose from available, qualified therapists.",
              },
              {
                step: "02",
                title: "Confirm with Deposit",
                desc: "A deposit secures your booking and your therapist's time. Balance is due upon completion.",
              },
              {
                step: "03",
                title: "We Arrive, You Relax",
                desc: "Your therapist arrives 15 minutes early to set up your complete spa environment.",
              },
              {
                step: "04",
                title: "Pure Wellness",
                desc: "Enjoy your treatment in total comfort. We clean up everything — you simply rest.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="flex gap-8 items-start"
              >
                <span className="font-serif text-3xl text-accent flex-shrink-0">
                  {item.step}
                </span>
                <div>
                  <h3 className="font-serif text-lg mb-2 text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mobile Price List */}
      <section className="py-24 lg:py-32 bg-secondary">
        <div className="container mx-auto px-6 lg:px-12 max-w-5xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.p
              custom={0}
              variants={fadeUp}
              className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4"
            >
              Home & Hotel Pricing
            </motion.p>
            <motion.h2
              custom={1}
              variants={fadeUp}
              className="font-serif text-3xl md:text-5xl text-foreground mb-4 font-bold"
            >
              Mobile Spa Price List
            </motion.h2>
            <motion.p
              custom={2}
              variants={fadeUp}
              className="text-base text-muted-foreground max-w-xl mx-auto"
            >
              Pricing for our home and hotel mobile services. A travel surcharge
              may apply based on location.
            </motion.p>
          </motion.div>

          {/* Massage by duration */}
          <div className="space-y-12">
            <div>
              <h3 className="font-serif text-2xl text-foreground mb-6 font-bold">
                Massage
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {mobileMassageServices.map((service) => (
                  <div
                    key={service.name}
                    className="border border-border bg-card p-6"
                  >
                    <h4 className="font-serif text-lg text-foreground mb-4">
                      {service.name}
                    </h4>
                    <ul className="divide-y divide-border">
                      {service.items.map((item) => (
                        <li
                          key={item.duration}
                          className="flex justify-between py-2 text-base"
                        >
                          <span className="text-muted-foreground">
                            {item.duration}
                          </span>
                          <span className="text-foreground font-medium">
                            {item.price}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick massages & add-ons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-border bg-card p-6">
                <h4 className="font-serif text-lg text-foreground mb-4">
                  Quick Massages
                </h4>
                <ul className="divide-y divide-border">
                  {mobileQuickMassages.map((item) => (
                    <li
                      key={item.name}
                      className="flex justify-between py-2 text-base"
                    >
                      <span className="text-muted-foreground">{item.name}</span>
                      <span className="text-foreground font-medium">
                        {item.price}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border border-border bg-card p-6">
                <h4 className="font-serif text-lg text-foreground mb-4">
                  Add-Ons
                </h4>
                <ul className="divide-y divide-border">
                  {mobileMassageAddOns.map((item) => (
                    <li
                      key={item.name}
                      className="flex justify-between py-2 text-base"
                    >
                      <span className="text-muted-foreground">{item.name}</span>
                      <span className="text-foreground font-medium">
                        {item.price}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Other categories */}
            {mobileSpaServices.map((cat) => (
              <div key={cat.category}>
                <h3 className="font-serif text-2xl text-foreground mb-6 font-bold">
                  {cat.category}
                </h3>
                <div className="border border-border bg-card p-6">
                  <ul className="divide-y divide-border">
                    {cat.items?.map((item) => (
                      <li
                        key={item.name}
                        className="flex justify-between py-3 text-base"
                      >
                        <span className="text-muted-foreground">
                          {item.name}
                        </span>
                        <span className="text-foreground font-medium">
                          {item.price}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 lg:py-40 text-center bg-warm-charcoal">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h2
              custom={0}
              variants={fadeUp}
              className="font-serif text-3xl md:text-5xl text-warm-cream mb-6 max-w-2xl mx-auto"
            >
              Skip the Traffic. <span className="italic">Keep the Luxury.</span>
            </motion.h2>
            <motion.p
              custom={1}
              variants={fadeUp}
              className="text-warm-stone/80 max-w-md mx-auto mb-10"
            >
              Book your in-home or hotel spa experience today.
            </motion.p>
            <motion.div custom={2} variants={fadeUp}>
              <Link
                to="/booking"
                className="inline-flex items-center gap-3 px-12 py-5 text-xs tracking-[0.2em] uppercase bg-warm-cream text-warm-charcoal hover:bg-warm-nude transition-colors duration-300"
              >
                Book Mobile Spa <ArrowRight size={14} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default MobileSpa;
