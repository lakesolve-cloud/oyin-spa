import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import Layout from "@/components/Layout";
import { fadeUp } from "@/lib/animations";
import heroImage from "@/assets/hero-spa.jpg";
import { celebrationPackages, comboPackages, SpaPackage } from "@/data/services";

const PackageCard = ({ pkg, index }: { pkg: SpaPackage; index: number }) => (
  <motion.div
    custom={index}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    variants={fadeUp}
    className="border border-border bg-background flex flex-col"
  >
    <div className="px-7 py-6 border-b border-border bg-secondary flex items-baseline justify-between gap-4">
      <h3 className="font-serif text-xl text-foreground">{pkg.name}</h3>
      <span className="text-base font-semibold text-foreground whitespace-nowrap">{pkg.price}</span>
    </div>
    <ul className="px-7 py-6 space-y-3 flex-1">
      {pkg.includes.map((line) => (
        <li key={line} className="flex items-start gap-3 text-[15px] text-muted-foreground leading-relaxed">
          <Check size={16} className="mt-1 shrink-0 text-accent" />
          <span>{line}</span>
        </li>
      ))}
    </ul>
    <div className="px-7 pb-7">
      <Link
        to="/booking"
        className="inline-flex items-center gap-3 px-8 py-3 text-xs tracking-[0.2em] uppercase bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-300"
      >
        Book This Package <ArrowRight size={14} />
      </Link>
    </div>
  </motion.div>
);

const Packages = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative py-32 lg:py-40">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Luxury spa celebration setup" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-warm-charcoal/60" />
        </div>
        <div className="relative container mx-auto px-6 lg:px-12 text-center">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-xs tracking-[0.3em] uppercase text-warm-stone mb-4">
            Celebrate With Us
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="font-serif font-bold text-4xl md:text-6xl text-warm-cream max-w-3xl mx-auto"
          >
            Celebration & Spa <span className="italic">Packages</span>
          </motion.h1>
        </div>
      </section>

      {/* Celebration Packages */}
      <section className="py-24 lg:py-32">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif font-bold text-3xl md:text-4xl text-foreground mb-4 text-center"
          >
            Celebration Packages
          </motion.h2>
          <p className="text-[15px] text-muted-foreground text-center mb-16 max-w-xl mx-auto">
            Curated experiences for birthdays, anniversaries, bridal moments and every reason in between.
          </p>

          <div className="space-y-20">
            {celebrationPackages.map((group) => (
              <div key={group.group}>
                <div className="mb-8">
                  <h3 className="font-serif text-2xl text-foreground">{group.group}</h3>
                  {group.blurb && <p className="text-[15px] text-muted-foreground mt-2">{group.blurb}</p>}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                  {group.packages.map((pkg, i) => (
                    <PackageCard key={pkg.name} pkg={pkg} index={i} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Combo Packages */}
      <section className="py-24 lg:py-32 bg-secondary">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif font-bold text-3xl md:text-4xl text-foreground mb-4 text-center"
          >
            Spa Combo Packages
          </motion.h2>
          <p className="text-[15px] text-muted-foreground text-center mb-16 max-w-xl mx-auto">
            Full-day pairings of our most requested treatments, at a considered price.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {comboPackages.map((pkg, i) => (
              <PackageCard key={pkg.name} pkg={pkg} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 lg:py-32 text-center">
        <div className="container mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <motion.h2 custom={0} variants={fadeUp} className="font-serif font-bold text-3xl md:text-4xl text-foreground mb-6">
              Planning Something Special?
            </motion.h2>
            <motion.p custom={1} variants={fadeUp} className="text-[15px] text-muted-foreground mb-10 max-w-lg mx-auto">
              Tell us the occasion and we will tailor the details around it.
            </motion.p>
            <motion.div custom={2} variants={fadeUp}>
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

export default Packages;
