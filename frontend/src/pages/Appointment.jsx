import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AppointmentForm from "../components/AppointmentForm";
import { Phone, Clock, MapPin, Shield, Star } from "lucide-react";

export const Appointment = () => {
  return (
    <div className="min-h-screen bg-pearl" data-testid="appointment-page">
      <Navbar />
      <main className="pt-24">
        {/* Hero Section */}
        <section className="py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto"
            >
              <span className="font-body text-xs uppercase tracking-widest text-gold mb-4 block">
                Schedule Your Visit
              </span>
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-semibold text-navy leading-tight mb-6">
                Book Your <span className="text-gold">Appointment</span>
              </h1>
              <p className="font-body text-navy/70 text-base md:text-lg leading-relaxed">
                Fill out the form below and we'll confirm your appointment within 24 hours.
              </p>
              <div className="w-24 h-1 bg-gold mx-auto mt-8" />
            </motion.div>
          </div>
        </section>

        {/* Main Content */}
        <section className="pb-24 md:pb-32">
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Form */}
              <div className="lg:col-span-2">
                <AppointmentForm />
              </div>

              {/* Sidebar */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-6"
              >
                {/* Contact Card */}
                <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gold/10 p-6">
                  <h3 className="font-heading text-xl font-semibold text-navy mb-4">
                    Need Help?
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                        <Phone size={18} className="text-gold" />
                      </div>
                      <div>
                        <p className="font-body text-xs text-navy/50 uppercase">Call Us</p>
                        <a href="tel:+8801700000000" className="font-body text-navy hover:text-gold transition-colors">
                          +880 1700-000000
                        </a>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                        <Clock size={18} className="text-gold" />
                      </div>
                      <div>
                        <p className="font-body text-xs text-navy/50 uppercase">Working Hours</p>
                        <p className="font-body text-navy">Sat-Thu: 9AM - 7PM</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                        <MapPin size={18} className="text-gold" />
                      </div>
                      <div>
                        <p className="font-body text-xs text-navy/50 uppercase">Location</p>
                        <p className="font-body text-navy">Dhanmondi, Dhaka</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Features Card */}
                <div className="bg-navy rounded-3xl p-6 text-pearl">
                  <h3 className="font-heading text-xl font-semibold mb-4">
                    Why Book With Us?
                  </h3>
                  <ul className="space-y-3">
                    {[
                      { icon: Shield, text: "Confirmed within 24 hours" },
                      { icon: Star, text: "Top-rated dental professionals" },
                      { icon: Clock, text: "Flexible scheduling options" }
                    ].map((item, index) => {
                      const Icon = item.icon;
                      return (
                        <li key={index} className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center">
                            <Icon size={14} className="text-gold" />
                          </div>
                          <span className="font-body text-sm text-pearl/80">{item.text}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                {/* Trust Badge */}
                <div className="bg-teal/10 rounded-2xl p-4 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-teal/20 flex items-center justify-center">
                    <Shield size={20} className="text-teal" />
                  </div>
                  <div>
                    <p className="font-heading text-lg text-navy font-semibold">100% Secure</p>
                    <p className="font-body text-sm text-navy/70">Your data is protected</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Appointment;
