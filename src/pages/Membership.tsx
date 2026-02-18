import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Crown, Star, Gift } from "lucide-react";
import Layout from "@/components/Layout";
import { fadeUp } from "@/lib/animations";

const tiers = [
  {
    icon: Star,
    name: "The Inner Circle",
    subtitle: "For the discerning regular",
    benefits: [
      "Priority booking access",
      "Preferred therapist reservation",
      "Complimentary aromatherapy upgrade",
      "10% savings on all services",
      "Exclusive seasonal treatments",
    ],
    cta: "Inquire About Membership",
  },
  {
    icon: Crown,
    name: "The Private Collection",
    subtitle: "For those who demand the exceptional",
    benefits: [
      "All Inner Circle benefits",
      "Same-day booking priority",
      "Dedicated wellness concierge",
      "Complimentary monthly add-on service",
      "VIP event invitations",
      "Custom wellness program design",
    ],
    cta: "Apply for VIP Access",
    featured: true,
  },
  {
    icon: Gift,
    name: "Corporate Wellness",
    subtitle: "For forward-thinking organizations",
    benefits: [
      "On-site team wellness sessions",
      "Customized corporate packages",
      "Executive stress management programs",
      "Event and retreat spa services",
      "Branded wellness experiences",
    ],
    cta: "Request a Proposal",
  },
];

const Membership = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-24 lg:py-32">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <motion.div initial="hidden" animate="visible">
            <motion.p custom={0} variants={fadeUp} className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">
              Membership & VIP
            </motion.p>
            <motion.h1 custom={1} variants={fadeUp} className="font-serif text-4xl md:text-6xl text-foreground mb-8 max-w-3xl mx-auto">
              An Invitation to <span className="italic">Elevated Wellness</span>
            </motion.h1>
            <motion.p custom={2} variants={fadeUp} className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
              Membership with Oyin is not a subscription — it is a relationship. 
              A commitment to your ongoing wellness, met with our commitment to your standards.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Tiers */}
      <section className="pb-24 lg:pb-32">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {tiers.map((tier, i) => (
              <motion.div
                key={tier.name}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className={`p-10 border ${
                  tier.featured
                    ? "border-accent bg-secondary shadow-lg"
                    : "border-border bg-card"
                }`}
              >
                <tier.icon className="w-8 h-8 text-accent mb-6" strokeWidth={1.2} />
                <h3 className="font-serif text-xl mb-1 text-foreground">{tier.name}</h3>
                <p className="text-xs tracking-[0.1em] uppercase text-muted-foreground mb-8">{tier.subtitle}</p>
                <div className="space-y-4 mb-10">
                  {tier.benefits.map((b) => (
                    <div key={b} className="flex items-start gap-3">
                      <div className="w-1 h-1 rounded-full bg-accent mt-2 flex-shrink-0" />
                      <span className="text-sm text-foreground">{b}</span>
                    </div>
                  ))}
                </div>
                <a
                  href="https://wa.me/2348000000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block text-center px-6 py-3 text-xs tracking-[0.15em] uppercase transition-colors duration-300 ${
                    tier.featured
                      ? "bg-primary text-primary-foreground hover:bg-warm-taupe"
                      : "border border-primary text-foreground hover:bg-primary hover:text-primary-foreground"
                  }`}
                >
                  {tier.cta}
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Note */}
      <section className="py-24 lg:py-32 bg-secondary">
        <div className="container mx-auto px-6 lg:px-12 max-w-2xl text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <motion.h2 custom={0} variants={fadeUp} className="font-serif text-3xl text-foreground mb-6">
              Membership is by Inquiry Only
            </motion.h2>
            <motion.p custom={1} variants={fadeUp} className="text-muted-foreground leading-relaxed mb-10">
              We intentionally keep our membership numbers small to ensure every member receives 
              the personalized attention and priority access they deserve. Reach out to discuss 
              which tier aligns with your wellness goals.
            </motion.p>
            <motion.div custom={2} variants={fadeUp}>
              <a
                href="https://wa.me/2348000000000"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-10 py-4 text-xs tracking-[0.2em] uppercase bg-primary text-primary-foreground hover:bg-warm-taupe transition-colors duration-300"
              >
                Start a Conversation <ArrowRight size={14} />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Membership;
