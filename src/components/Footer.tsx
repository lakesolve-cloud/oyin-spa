import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-warm-charcoal text-warm-stone">
      {/* Main Footer */}
      <div className="container mx-auto px-6 lg:px-12 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <h3 className="font-serif text-2xl tracking-wide text-warm-cream mb-4">OYIN</h3>
            <p className="text-sm leading-relaxed opacity-80">
              Private luxury wellness, delivered with discretion and care. Lagos' premier appointment-only massage and spa experience.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase text-warm-cream mb-6">Explore</h4>
            <div className="flex flex-col gap-3">
              <Link to="/about" className="text-sm opacity-70 hover:opacity-100 transition-opacity">About Oyin</Link>
              <Link to="/services" className="text-sm opacity-70 hover:opacity-100 transition-opacity">Our Services</Link>
              <Link to="/mobile-spa" className="text-sm opacity-70 hover:opacity-100 transition-opacity">Mobile Spa</Link>
              <Link to="/membership" className="text-sm opacity-70 hover:opacity-100 transition-opacity">Membership & VIP</Link>
              <Link to="/booking" className="text-sm opacity-70 hover:opacity-100 transition-opacity">Book an Appointment</Link>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase text-warm-cream mb-6">Services</h4>
            <div className="flex flex-col gap-3">
              <span className="text-sm opacity-70">Deep Tissue Massage</span>
              <span className="text-sm opacity-70">Swedish Relaxation</span>
              <span className="text-sm opacity-70">Couples Retreat</span>
              <span className="text-sm opacity-70">Home & Hotel Spa</span>
              <span className="text-sm opacity-70">Post-Op Recovery</span>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase text-warm-cream mb-6">Contact</h4>
            <div className="flex flex-col gap-3">
              <span className="text-sm opacity-70">Lagos, Nigeria</span>
              <span className="text-sm opacity-70">By Appointment Only</span>
              <a href="mailto:hello@oyinspa.com" className="text-sm opacity-70 hover:opacity-100 transition-opacity">hello@oyinspa.com</a>
              <a href="https://wa.me/2348000000000" className="text-sm opacity-70 hover:opacity-100 transition-opacity">WhatsApp Us</a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-warm-taupe/20">
        <div className="container mx-auto px-6 lg:px-12 py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs opacity-50">© 2026 Oyin Massage & Spa. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="text-xs opacity-50">Privacy Policy</span>
            <span className="text-xs opacity-50">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
