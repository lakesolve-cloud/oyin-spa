import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";
import { fadeUp } from "@/lib/animations";
import interiorImage from "@/assets/spa-interior.jpg";
import productsImage from "@/assets/spa-products.jpg";

const About = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-24 lg:py-32">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div initial="hidden" animate="visible" className="max-w-3xl">
            <motion.p custom={0} variants={fadeUp} className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">
              About Us
            </motion.p>
            <motion.h1 custom={1} variants={fadeUp} className="font-serif text-4xl md:text-6xl text-foreground mb-8">
              Wellness, <span className="italic">Refined</span>
            </motion.h1>
            <motion.p custom={2} variants={fadeUp} className="text-lg text-muted-foreground leading-relaxed">
              Oyin Massage & Spa was born from a simple conviction: that wellness should be private, 
              intentional, and uncompromising. We exist for those who seek more than a massage — 
              they seek an experience that honors their standards.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Image + Story */}
      <section className="pb-24 lg:pb-32">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.img
              src={interiorImage}
              alt="Oyin Spa interior corridor"
              className="w-full aspect-[4/5] object-cover"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            />
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <motion.h2 custom={0} variants={fadeUp} className="font-serif text-3xl text-foreground mb-6">
                Our Philosophy
              </motion.h2>
              <motion.p custom={1} variants={fadeUp} className="text-muted-foreground leading-relaxed mb-6">
                In Lagos — a city that never stops moving — we created a space where you can. 
                Every detail of the Oyin experience is designed to slow the world down, from the 
                moment you reach out to us to the quiet afterglow of your session.
              </motion.p>
              <motion.p custom={2} variants={fadeUp} className="text-muted-foreground leading-relaxed mb-6">
                We don't operate like a traditional spa. There are no walk-ins, no waiting rooms, 
                no rushed appointments. Every session is by appointment only, ensuring that when 
                you're with us, you have our complete, undivided attention.
              </motion.p>
              <motion.p custom={3} variants={fadeUp} className="text-muted-foreground leading-relaxed">
                Our therapists are not just skilled — they are discreet professionals who understand 
                that entering your private space, whether our studio or your home, is a privilege 
                that demands the highest standard of conduct.
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="py-24 lg:py-32 bg-secondary">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-3xl md:text-4xl text-center mb-16 text-foreground"
          >
            What Defines Us
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
            {[
              { title: "Discretion", desc: "Your privacy is paramount. We operate with the confidentiality and professionalism you expect." },
              { title: "Excellence", desc: "Every product, technique, and interaction is held to the highest standard — no exceptions." },
              { title: "Intentionality", desc: "Nothing about Oyin is accidental. Every detail serves your comfort and peace of mind." },
              { title: "Convenience", desc: "The ultimate luxury is not having to go anywhere. We come to you, fully equipped." },
              { title: "Professionalism", desc: "Our therapists are vetted, trained, and committed to maintaining impeccable standards." },
              { title: "Calm Authority", desc: "We set clear expectations and maintain boundaries that protect both you and our team." },
            ].map((val, i) => (
              <motion.div
                key={val.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="bg-background p-10"
              >
                <h3 className="font-serif text-lg mb-3 text-foreground">{val.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{val.desc}</p>
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
              Experience the Difference
            </motion.h2>
            <motion.p custom={1} variants={fadeUp} className="text-muted-foreground max-w-lg mx-auto mb-10">
              We welcome those who appreciate quality over convenience, experience over transaction.
            </motion.p>
            <motion.div custom={2} variants={fadeUp}>
              <Link
                to="/booking"
                className="inline-flex items-center gap-3 px-10 py-4 text-xs tracking-[0.2em] uppercase bg-primary text-primary-foreground hover:bg-warm-taupe transition-colors duration-300"
              >
                Book Your Session <ArrowRight size={14} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
