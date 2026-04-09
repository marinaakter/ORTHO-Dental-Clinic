import { motion } from "framer-motion";
import { Clock, Mail, MapPin, Phone } from "lucide-react";

export const ContactStrip = () => {
  return (
    <section className="py-16 bg-pearl" data-testid="contact-strip">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="font-body text-xs uppercase tracking-widest text-gold mb-4 block">
              Visit Us
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-semibold text-navy mb-8">
              Find Us in <span className="text-gold">Dhanmondi</span>
            </h2>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                  <MapPin size={20} className="text-gold" />
                </div>
                <div>
                  <h4 className="font-heading text-lg text-navy mb-1">Address</h4>
                  <p className="font-body text-navy/70">
                    House 12, Road 5, Dhanmondi,<br />
                    Dhaka 1205, Bangladesh
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                  <Phone size={20} className="text-gold" />
                </div>
                <div>
                  <h4 className="font-heading text-lg text-navy mb-1">Phone</h4>
                  <a href="tel:+8801700000000" className="font-body text-navy/70 hover:text-gold transition-colors">
                    +880 1700-000000
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                  <Mail size={20} className="text-gold" />
                </div>
                <div>
                  <h4 className="font-heading text-lg text-navy mb-1">Email</h4>
                  <a href="mailto:info@orthodentalclinic.com" className="font-body text-navy/70 hover:text-gold transition-colors">
                    info@orthodentalclinic.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                  <Clock size={20} className="text-gold" />
                </div>
                <div>
                  <h4 className="font-heading text-lg text-navy mb-1">Working Hours</h4>
                  <p className="font-body text-navy/70">
                    Sat - Thu: 9:00 AM - 7:00 PM<br />
                    Friday: Closed
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-[400px] rounded-3xl overflow-hidden shadow-lg border border-gold/10"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14607.426789022658!2d90.37166743082826!3d23.746506839048946!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b33cffc3fb%3A0x4a826f475fd312af!2sDhanmondi%2C%20Dhaka%2C%20Bangladesh!5e0!3m2!1sen!2sus!4v1709900000000!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ortho Dental Clinic Location"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactStrip;
