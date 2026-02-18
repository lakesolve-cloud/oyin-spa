import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Shield, Clock, MapPin, Star, Sparkles } from "lucide-react";
import Layout from "@/components/Layout";
import { fadeUp } from "@/lib/animations";
import heroImage from "@/assets/hero-spa.jpg";
import mobileImage from "@/assets/mobile-spa.jpg";
import productsImage from "@/assets/spa-products.jpg";

const Index = () => {
  return (
    <Layout>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "DaySpa",
            name: "Oyin Massage & Spa",
            description: "Private luxury wellness and spa services in Lagos, Nigeria",
            address: { "@type": "PostalAddress", addressLocality: "Lagos", addressCountry: "NG" },
            priceRange: "₦₦₦₦",
          }),
        }}
      />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Luxury spa treatment room with warm ambient lighting" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-warm-charcoal/50" />
        </div>
        <div className="relative container mx-auto px-6 lg:px-12">
          <motion.div
            initial="hidden"
            animate="visible"
            className="max-w-3xl"
          >
            <motion.p
              custom={0}
              variants={fadeUp}
              className="text-xs tracking-[0.3em] uppercase text-warm-stone mb-6"
            >
              Lagos' Discreet Premium Spa
            </motion.p>
            <motion.h1
              custom={1}
              variants={fadeUp}
              className="font-serif text-4xl md:text-6xl lg:text-7xl leading-[1.1] text-warm-cream mb-8"
            >
              Private Luxury Wellness.{" "}
              <span className="italic">Delivered to You.</span>
            </motion.h1>
            <motion.p
              custom={2}
              variants={fadeUp}
              className="text-lg md:text-xl text-warm-stone/90 max-w-xl mb-10 leading-relaxed"
            >
              An appointment-only, concierge-style spa experience — in our private studio or the comfort of your home.
            </motion.p>
            <motion.div custom={3} variants={fadeUp} className="flex flex-wrap gap-4">
              <Link
                to="/booking"
                className="inline-flex items-center gap-3 px-10 py-4 text-xs tracking-[0.2em] uppercase bg-warm-cream text-warm-charcoal hover:bg-warm-nude transition-colors duration-300"
              >
                Book Your Experience
                <ArrowRight size={14} />
              </Link>
              <Link
                to="/mobile-spa"
                className="inline-flex items-center gap-3 px-10 py-4 text-xs tracking-[0.2em] uppercase border border-warm-cream/40 text-warm-cream hover:bg-warm-cream/10 transition-colors duration-300"
              >
                Mobile Spa
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Limited Slots Banner */}
      <section className="bg-primary text-primary-foreground py-4">
        <div className="container mx-auto px-6 text-center">
          <p className="text-xs tracking-[0.2em] uppercase">
            Limited daily appointments — We serve a select number of clients each day
          </p>
        </div>
      </section>

      {/* The Oyin Standard */}
      <section className="py-24 lg:py-32">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-20"
          >
            <motion.p custom={0} variants={fadeUp} className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">
              Our Promise
            </motion.p>
            <motion.h2 custom={1} variants={fadeUp} className="font-serif text-3xl md:text-5xl text-foreground">
              The Oyin Standard
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {[
              { icon: Shield, title: "Absolute Discretion", desc: "Your privacy is non-negotiable. Every interaction is handled with complete confidentiality." },
              { icon: Star, title: "Curated Excellence", desc: "Every therapist is rigorously vetted, trained, and committed to delivering an exceptional experience." },
              { icon: MapPin, title: "Your Space, Elevated", desc: "We bring the full spa experience to you — premium table, linens, oils, and ambiance." },
              { icon: Clock, title: "Effortless Booking", desc: "Select your service, time, and therapist. We handle every detail so you simply arrive — or we do." },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeUp}
                className="text-center p-8"
              >
                <item.icon className="w-8 h-8 mx-auto mb-6 text-accent" strokeWidth={1.2} />
                <h3 className="font-serif text-lg mb-3 text-foreground">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Signature Experiences */}
      <section className="py-24 lg:py-32 bg-secondary">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-20"
          >
            <motion.p custom={0} variants={fadeUp} className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">
              What We Offer
            </motion.p>
            <motion.h2 custom={1} variants={fadeUp} className="font-serif text-3xl md:text-5xl text-foreground">
              Signature Experiences
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Deep Restoration", desc: "Targeted deep tissue work for chronic tension, post-workout recovery, and executive stress relief.", duration: "60 — 120 min" },
              { title: "Serene Relaxation", desc: "Full-body Swedish technique designed to dissolve stress and restore calm to mind and body.", duration: "60 — 90 min" },
              { title: "The Couples Retreat", desc: "A shared experience of relaxation for two, in our private suite or your chosen setting.", duration: "90 — 120 min" },
            ].map((service, i) => (
              <motion.div
                key={service.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeUp}
                className="bg-background p-10 border border-border hover:shadow-lg transition-shadow duration-500"
              >
                <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4">{service.duration}</p>
                <h3 className="font-serif text-xl mb-4 text-foreground">{service.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">{service.desc}</p>
                <Link
                  to="/services"
                  className="text-xs tracking-[0.15em] uppercase text-accent hover:text-foreground transition-colors inline-flex items-center gap-2"
                >
                  Learn More <ArrowRight size={12} />
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fadeUp}
            className="text-center mt-16"
          >
            <Link
              to="/services"
              className="inline-flex items-center gap-3 px-10 py-4 text-xs tracking-[0.2em] uppercase bg-primary text-primary-foreground hover:bg-warm-taupe transition-colors duration-300"
            >
              View All Services
              <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Mobile Spa Highlight */}
      <section className="py-24 lg:py-32">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              <motion.p custom={0} variants={fadeUp} className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">
                Our Signature Offering
              </motion.p>
              <motion.h2 custom={1} variants={fadeUp} className="font-serif text-3xl md:text-4xl text-foreground mb-6">
                The Luxury of Not Having to Go Anywhere
              </motion.h2>
              <motion.p custom={2} variants={fadeUp} className="text-muted-foreground leading-relaxed mb-6">
                Skip the traffic. Skip the stress. Our mobile spa team brings a complete, 
                premium spa experience directly to your home, hotel, or office — anywhere in Lagos.
              </motion.p>
              <motion.div custom={3} variants={fadeUp} className="space-y-4 mb-10">
                {[
                  "Professional-grade massage table & premium linens",
                  "Curated essential oils & aromatherapy setup",
                  "Ambient music & calming atmosphere creation",
                  "Ideal for executives, VIPs, brides & travelers",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <Sparkles className="w-4 h-4 mt-1 text-accent flex-shrink-0" />
                    <span className="text-sm text-foreground">{item}</span>
                  </div>
                ))}
              </motion.div>
              <motion.div custom={4} variants={fadeUp}>
                <Link
                  to="/mobile-spa"
                  className="inline-flex items-center gap-3 px-10 py-4 text-xs tracking-[0.2em] uppercase bg-primary text-primary-foreground hover:bg-warm-taupe transition-colors duration-300"
                >
                  Explore Mobile Spa
                  <ArrowRight size={14} />
                </Link>
              </motion.div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <img
                src={mobileImage}
                alt="Luxury mobile spa setup in a Lagos penthouse with panoramic views"
                className="w-full aspect-[4/3] object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Qualification Section */}
      <section className="py-24 lg:py-32 bg-secondary">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <img
                src={productsImage}
                alt="Premium spa products and natural ingredients"
                className="w-full aspect-square object-cover"
              />
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              <motion.p custom={0} variants={fadeUp} className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">
                Not for Everyone
              </motion.p>
              <motion.h2 custom={1} variants={fadeUp} className="font-serif text-3xl md:text-4xl text-foreground mb-6">
                We Don't Compete on Price. We Deliver on Experience.
              </motion.h2>
              <motion.p custom={2} variants={fadeUp} className="text-muted-foreground leading-relaxed mb-6">
                Oyin is built for those who understand that true wellness is an investment — in your body, 
                your peace, and your time. We maintain small daily numbers to ensure every client receives 
                our undivided attention and the highest standard of care.
              </motion.p>
              <motion.p custom={3} variants={fadeUp} className="text-muted-foreground leading-relaxed mb-10">
                If you value discretion, professionalism, and an experience that respects your standards — 
                we were made for you.
              </motion.p>
              <motion.div custom={4} variants={fadeUp}>
                <Link
                  to="/booking"
                  className="inline-flex items-center gap-3 px-10 py-4 text-xs tracking-[0.2em] uppercase border border-primary text-foreground hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
                >
                  Reserve Your Appointment
                  <ArrowRight size={14} />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 lg:py-40 text-center bg-warm-charcoal">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.p custom={0} variants={fadeUp} className="text-xs tracking-[0.3em] uppercase text-warm-stone mb-6">
              Your Wellness Awaits
            </motion.p>
            <motion.h2 custom={1} variants={fadeUp} className="font-serif text-3xl md:text-5xl lg:text-6xl text-warm-cream mb-8 max-w-3xl mx-auto leading-tight">
              Ready to Experience <span className="italic">Quiet Luxury?</span>
            </motion.h2>
            <motion.p custom={2} variants={fadeUp} className="text-warm-stone/80 max-w-xl mx-auto mb-12">
              Book your private session today. Limited appointments available daily.
            </motion.p>
            <motion.div custom={3} variants={fadeUp}>
              <Link
                to="/booking"
                className="inline-flex items-center gap-3 px-12 py-5 text-xs tracking-[0.2em] uppercase bg-warm-cream text-warm-charcoal hover:bg-warm-nude transition-colors duration-300"
              >
                Book Now
                <ArrowRight size={14} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
