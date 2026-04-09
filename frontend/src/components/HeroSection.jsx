import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Award, Clock, Users } from "lucide-react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

export const HeroSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen bg-pearl overflow-hidden pt-20"
      data-testid="hero-section"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-0 w-96 h-96 bg-teal/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-12 md:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center min-h-[80vh]">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ opacity }}
            className="space-y-8 relative z-10"
          >
            <div className="inline-flex items-center gap-2 bg-gold/10 rounded-full px-4 py-2">
              <Award size={16} className="text-gold" />
              <span className="font-body text-xs uppercase tracking-widest text-navy">
                Premium Dental Care in Dhaka
              </span>
            </div>

            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light text-navy leading-tight tracking-tight">
              Your Perfect
              <span className="block font-semibold">
                Smile <span className="text-gold">Starts</span> Here
              </span>
            </h1>

            <div className="w-24 h-1 bg-gold" />

            <p className="font-body text-base md:text-lg text-navy/70 max-w-md leading-relaxed">
              Experience world-class dental care at Ortho Dental Clinic. Where cutting-edge technology 
              meets compassionate service for your perfect smile.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/appointment">
                <Button
                  data-testid="hero-book-appointment-btn"
                  className="bg-gold hover:bg-gold/90 text-navy font-body font-medium rounded-full px-8 py-6 text-lg transition-all hover:scale-105 inline-flex items-center gap-2"
                >
                  Book Appointment
                  <ArrowRight size={18} />
                </Button>
              </Link>
              <Link to="/services">
                <Button
                  data-testid="hero-services-btn"
                  variant="outline"
                  className="border-navy text-navy hover:bg-navy hover:text-pearl font-body font-medium rounded-full px-8 py-6 text-lg transition-all"
                >
                  Our Services
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 pt-8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-teal/10 flex items-center justify-center">
                  <Users size={20} className="text-teal" />
                </div>
                <div>
                  <p className="font-heading text-2xl font-semibold text-navy">10K+</p>
                  <p className="font-body text-sm text-navy/60">Happy Patients</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center">
                  <Award size={20} className="text-gold" />
                </div>
                <div>
                  <p className="font-heading text-2xl font-semibold text-navy">15+</p>
                  <p className="font-body text-sm text-navy/60">Years Experience</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-navy/10 flex items-center justify-center">
                  <Clock size={20} className="text-navy" />
                </div>
                <div>
                  <p className="font-heading text-2xl font-semibold text-navy">24/7</p>
                  <p className="font-body text-sm text-navy/60">Emergency Care</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            style={{ y }}
            className="relative"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              {/* Main Image */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&h=1000&fit=crop"
                  alt="Modern dental clinic interior"
                  className="w-full h-[500px] md:h-[600px] object-cover"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/30 to-transparent" />
              </div>

              {/* Floating Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="absolute -bottom-6 -left-6 md:-left-12 bg-white rounded-2xl shadow-xl p-6 max-w-[280px]"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-teal flex items-center justify-center">
                    <Award size={20} className="text-white" />
                  </div>
                  <span className="font-body text-xs uppercase tracking-widest text-gold">
                    Certified Excellence
                  </span>
                </div>
                <p className="font-heading text-lg text-navy">
                  "Best Dental Clinic in Dhaka 2024"
                </p>
                <p className="font-body text-sm text-navy/60 mt-1">
                  — Bangladesh Dental Association
                </p>
              </motion.div>

              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 border-2 border-gold/30 rounded-3xl" />
              <div className="absolute -bottom-8 right-12 w-16 h-16 bg-teal/20 rounded-full" />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-6 h-10 border-2 border-navy/30 rounded-full flex justify-center pt-2"
        >
          <div className="w-1.5 h-3 bg-gold rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
