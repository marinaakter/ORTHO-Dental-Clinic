import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { services } from "../data/services";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "../components/ui/button";

export const Services = () => {
  return (
    <div className="min-h-screen bg-pearl" data-testid="services-page">
      <Navbar />
      <main className="pt-24">
        {/* Hero Section */}
        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto"
            >
              <span className="font-body text-xs uppercase tracking-widest text-gold mb-4 block">
                Our Expertise
              </span>
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-semibold text-navy leading-tight mb-6">
                Premium Dental <span className="text-gold">Services</span>
              </h1>
              <p className="font-body text-navy/70 text-base md:text-lg leading-relaxed">
                From routine checkups to advanced cosmetic procedures, we offer comprehensive
                dental care tailored to your unique needs.
              </p>
              <div className="w-24 h-1 bg-gold mx-auto mt-8" />
            </motion.div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="pb-24 md:pb-32">
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="group relative bg-white rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gold/10 hover:border-gold/30 transition-all duration-500"
                    data-testid={`service-detail-${service.id}`}
                  >
                    <div className="grid md:grid-cols-2 h-full">
                      {/* Image */}
                      <div className="relative h-64 md:h-full overflow-hidden">
                        <img
                          src={service.image}
                          alt={service.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-navy/60 to-transparent md:bg-gradient-to-t" />
                        
                        {/* Icon Badge - Mobile */}
                        <div className="md:hidden absolute top-4 left-4 w-12 h-12 bg-gold rounded-full flex items-center justify-center">
                          <Icon size={20} className="text-navy" />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6 md:p-8 flex flex-col justify-center">
                        {/* Icon Badge - Desktop */}
                        <div className="hidden md:flex w-14 h-14 bg-gold/10 rounded-2xl items-center justify-center mb-4 group-hover:bg-gold transition-colors">
                          <Icon size={24} className="text-gold group-hover:text-navy transition-colors" />
                        </div>

                        <h3 className="font-heading text-2xl md:text-3xl font-semibold text-navy mb-3 group-hover:text-gold transition-colors">
                          {service.name}
                        </h3>
                        
                        <p className="font-body text-navy/70 text-sm leading-relaxed mb-6">
                          {service.description}
                        </p>

                        <Link to={`/appointment?service=${service.id}`}>
                          <Button
                            data-testid={`book-service-${service.id}-btn`}
                            className="bg-navy hover:bg-navy/90 text-pearl font-body font-medium rounded-full px-6 py-3 transition-all hover:scale-105 inline-flex items-center gap-2"
                          >
                            Book This Service
                            <ArrowRight size={16} />
                          </Button>
                        </Link>
                      </div>
                    </div>

                    {/* Hover Effect */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-navy">
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-heading text-3xl sm:text-4xl font-semibold text-pearl mb-4">
                Ready to Transform Your <span className="text-gold">Smile</span>?
              </h2>
              <p className="font-body text-pearl/70 mb-8 max-w-xl mx-auto">
                Book your appointment today and take the first step towards a healthier, brighter smile.
              </p>
              <Link to="/appointment">
                <Button
                  data-testid="services-cta-btn"
                  className="bg-gold hover:bg-gold/90 text-navy font-body font-medium rounded-full px-8 py-6 text-lg transition-all hover:scale-105"
                >
                  Book Your Appointment
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Services;
