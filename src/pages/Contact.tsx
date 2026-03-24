import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";
import Layout from "@/components/Layout";
import { fadeUp } from "@/lib/animations";

const contactDetails = [
  {
    icon: MapPin,
    title: "Visit Us",
    lines: ["82 Akerele St, Surulere", "Lagos 123456, Lagos"],
  },
  {
    icon: Phone,
    title: "Call Us",
    lines: ["+234 703 394 8417"],
    href: "tel:+2347033948417",
  },
  {
    icon: Mail,
    title: "Email Us",
    lines: ["hello@oyinspa.com"],
    href: "mailto:hello@oyinspa.com",
  },
  {
    icon: Clock,
    title: "Working Hours",
    lines: ["Mon — Sat: 9:00 AM – 8:00 PM", "Sunday: By Appointment"],
  },
];

const Contact = () => {
  return (
    <Layout
      title="Contact Us — Oyin Massage & Spa"
      description="Get in touch with Oyin Massage & Spa. Visit us at 82 Akerele St, Surulere, Lagos or reach out via phone, email, or WhatsApp."
    >
      {/* Hero */}
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-28 bg-secondary">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <motion.p
            custom={0}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4"
          >
            Get in Touch
          </motion.p>
          <motion.h1
            custom={1}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="font-serif text-4xl md:text-6xl lg:text-7xl text-foreground font-bold"
          >
            Contact Us
          </motion.h1>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="py-24 lg:py-32">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactDetails.map((item, i) => (
              <motion.div
                key={item.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeUp}
                className="bg-card border border-border p-8 text-center"
              >
                <item.icon className="w-8 h-8 mx-auto mb-5 text-accent" strokeWidth={1.2} />
                <h3 className="font-serif text-lg font-bold mb-3 text-foreground">{item.title}</h3>
                {item.lines.map((line) =>
                  item.href ? (
                    <a
                      key={line}
                      href={item.href}
                      className="block text-base text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {line}
                    </a>
                  ) : (
                    <p key={line} className="text-base text-muted-foreground">
                      {line}
                    </p>
                  )
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Map + WhatsApp CTA */}
      <section className="py-24 lg:py-32 bg-secondary">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Map Embed */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="w-full aspect-square lg:aspect-[4/3] bg-muted overflow-hidden"
            >
              <iframe
                title="Oyin Massage & Spa Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.0!2d3.35!3d6.50!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z82+Akerele+St+Surulere+Lagos!5e0!3m2!1sen!2sng!4v1"
                className="w-full h-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </motion.div>

            {/* CTA */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              <motion.p custom={0} variants={fadeUp} className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">
                Prefer to Chat?
              </motion.p>
              <motion.h2 custom={1} variants={fadeUp} className="font-serif text-3xl md:text-5xl text-foreground mb-6 font-bold">
                Reach Us on WhatsApp
              </motion.h2>
              <motion.p custom={2} variants={fadeUp} className="text-lg text-muted-foreground leading-relaxed mb-10">
                Have questions about our services, pricing, or availability? Send us a message on WhatsApp and
                our team will respond promptly to assist you.
              </motion.p>
              <motion.div custom={3} variants={fadeUp}>
                <a
                  href="https://wa.me/2347033948417"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-10 py-4 text-xs tracking-[0.2em] uppercase bg-[#25D366] text-white hover:bg-[#1da851] transition-colors duration-300"
                >
                  <MessageCircle size={16} />
                  Chat on WhatsApp
                </a>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
