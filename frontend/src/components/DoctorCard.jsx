import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Award, Calendar } from "lucide-react";

export const DoctorCard = ({ doctor, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative"
      data-testid={`doctor-card-${doctor.id}`}
    >
      <div className="relative bg-white rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gold/10 hover:border-gold/30 transition-all duration-500">
        {/* Image Container */}
        <div className="relative h-80 overflow-hidden">
          <img
            src={doctor.image}
            alt={doctor.name}
            className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent" />
          
          {/* Experience Badge */}
          <div className="absolute top-4 right-4 bg-gold rounded-full px-4 py-2 flex items-center gap-2">
            <Award size={14} className="text-navy" />
            <span className="font-body text-xs font-medium text-navy">
              {doctor.experience} Years
            </span>
          </div>

          {/* Name Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h3 className="font-heading text-2xl font-semibold text-white mb-1">
              {doctor.name}
            </h3>
            <p className="font-body text-gold text-sm uppercase tracking-wider">
              {doctor.specialization}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="font-body text-navy/70 text-sm leading-relaxed mb-6">
            {doctor.bio}
          </p>
          
          <Link to={`/appointment?doctor=${doctor.id}`}>
            <Button
              data-testid={`book-doctor-${doctor.id}-btn`}
              className="w-full bg-navy hover:bg-navy/90 text-pearl font-body font-medium rounded-full py-3 transition-all hover:scale-105 inline-flex items-center justify-center gap-2"
            >
              <Calendar size={16} />
              Book with {doctor.name.split(" ")[1]}
            </Button>
          </Link>
        </div>

        {/* Hover accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
      </div>
    </motion.div>
  );
};

export const DoctorsSection = ({ doctors, showAll = false }) => {
  const displayDoctors = showAll ? doctors : doctors.slice(0, 4);

  return (
    <section className="py-24 md:py-32 bg-white" data-testid="doctors-section">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="font-body text-xs uppercase tracking-widest text-gold mb-4 block">
            Expert Care
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold text-navy leading-tight mb-4">
            Meet Our <span className="text-gold">Doctors</span>
          </h2>
          <p className="font-body text-navy/70 max-w-2xl mx-auto">
            Our team of highly qualified dental professionals is dedicated to providing 
            you with the best possible care in a comfortable environment.
          </p>
          <div className="w-24 h-1 bg-gold mx-auto mt-6" />
        </motion.div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {displayDoctors.map((doctor, index) => (
            <DoctorCard key={doctor.id} doctor={doctor} index={index} />
          ))}
        </div>

        {/* View All Link */}
        {!showAll && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link
              to="/doctors"
              className="inline-flex items-center gap-2 font-body text-navy hover:text-gold transition-colors border-b border-gold/30 pb-1"
              data-testid="view-all-doctors-link"
            >
              View All Doctors
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default DoctorCard;
