import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { services } from "../data/services";
import { ArrowRight } from "lucide-react";

export const ServicesGrid = ({ showAll = false }) => {
  const displayServices = showAll ? services : services.slice(0, 6);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section className="py-24 md:py-32 bg-pearl" data-testid="services-section">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="font-body text-xs uppercase tracking-widest text-gold mb-4 block">
            What We Offer
          </span>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold text-navy leading-tight">
              Our Premium <span className="text-gold">Services</span>
            </h2>
            {!showAll && (
              <Link
                to="/services"
                className="inline-flex items-center gap-2 font-body text-navy hover:text-gold transition-colors group"
                data-testid="view-all-services-link"
              >
                View All Services
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            )}
          </div>
          <div className="w-24 h-1 bg-gold mt-6" />
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {displayServices.map((service, index) => {
            const Icon = service.icon;
            // Create varied sizes for bento effect
            const isLarge = index === 0 || index === 3;
            
            return (
              <motion.div
                key={service.id}
                variants={itemVariants}
                className={`group relative bg-white rounded-2xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gold/10 hover:border-gold/30 transition-all duration-500 ${
                  isLarge ? "md:row-span-2" : ""
                }`}
                data-testid={`service-card-${service.id}`}
              >
                {/* Image */}
                <div className={`relative overflow-hidden ${isLarge ? "h-64 md:h-80" : "h-48"}`}>
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-navy/20 to-transparent" />
                  
                  {/* Icon Badge */}
                  <div className="absolute top-4 left-4 w-12 h-12 bg-gold rounded-full flex items-center justify-center">
                    <Icon size={20} className="text-navy" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-heading text-xl md:text-2xl font-semibold text-navy mb-2 group-hover:text-gold transition-colors">
                    {service.name}
                  </h3>
                  <p className="font-body text-navy/70 text-sm leading-relaxed mb-4">
                    {isLarge ? service.description : service.shortDescription}
                  </p>
                  <Link
                    to="/appointment"
                    className="inline-flex items-center gap-2 font-body text-sm text-gold hover:text-navy transition-colors"
                  >
                    Book This Service
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>

                {/* Hover Effect */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesGrid;
