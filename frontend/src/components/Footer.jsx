import { Clock, Facebook, Instagram, Mail, MapPin, Phone, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-navy text-pearl" data-testid="footer">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="inline-block">
              <h3 className="font-heading text-3xl font-semibold text-pearl">
                Ortho <span className="text-gold">Dental Clinic</span>
              </h3>
            </Link>
            <p className="font-body text-pearl/70 leading-relaxed">
              Caring for Your Smile, One Visit at a Time. Premium dental care in the heart of Dhaka.
            </p>
            <div className="flex gap-4 pt-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center hover:bg-gold hover:border-gold transition-all group"
                data-testid="social-facebook"
              >
                <Facebook size={18} className="text-gold group-hover:text-navy" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center hover:bg-gold hover:border-gold transition-all group"
                data-testid="social-instagram"
              >
                <Instagram size={18} className="text-gold group-hover:text-navy" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center hover:bg-gold hover:border-gold transition-all group"
                data-testid="social-twitter"
              >
                <Twitter size={18} className="text-gold group-hover:text-navy" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-xl font-semibold text-gold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { name: "Home", path: "/" },
                { name: "Services", path: "/services" },
                { name: "Our Doctors", path: "/doctors" },
                { name: "Book Appointment", path: "/appointment" },
                { name: "Contact Us", path: "/contact" }
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="font-body text-pearl/70 hover:text-gold transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading text-xl font-semibold text-gold mb-6">Our Services</h4>
            <ul className="space-y-3">
              {[
                "General Dentistry",
                "Teeth Whitening",
                "Orthodontics",
                "Dental Implants",
                "Root Canal",
                "Pediatric Care"
              ].map((service) => (
                <li key={service}>
                  <Link
                    to="/services"
                    className="font-body text-pearl/70 hover:text-gold transition-colors"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-heading text-xl font-semibold text-gold mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={20} className="text-gold flex-shrink-0 mt-1" />
                <span className="font-body text-pearl/70">
                  House 12, Road 5, Dhanmondi,<br />
                  Dhaka 1205, Bangladesh
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={20} className="text-gold flex-shrink-0" />
                <a href="tel:+8801700000000" className="font-body text-pearl/70 hover:text-gold transition-colors">
                  +880 1700-000000
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={20} className="text-gold flex-shrink-0" />
                <a href="mailto:info@orthodentalclinic.com" className="font-body text-pearl/70 hover:text-gold transition-colors">
                  info@orthodentalclinic.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock size={20} className="text-gold flex-shrink-0 mt-1" />
                <div className="font-body text-pearl/70">
                  <p>Sat - Thu: 9AM - 7PM</p>
                  <p>Friday: Closed</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-pearl/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-body text-sm text-pearl/50">
              © {new Date().getFullYear()} Ortho Dental Clinic. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link to="/privacy" className="font-body text-sm text-pearl/50 hover:text-gold transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="font-body text-sm text-pearl/50 hover:text-gold transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
