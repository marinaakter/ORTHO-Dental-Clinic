import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Calendar, Clock, User, Stethoscope, X, Phone } from "lucide-react";
import { Button } from "./ui/button";
import { format } from "date-fns";

export const SuccessModal = ({ isOpen, onClose, appointmentData }) => {
  const timeSlotLabels = {
    morning: "Morning (9AM - 12PM)",
    afternoon: "Afternoon (12PM - 4PM)",
    evening: "Evening (4PM - 7PM)"
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy/50 backdrop-blur-sm"
          data-testid="success-modal"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 overflow-hidden"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-pearl flex items-center justify-center hover:bg-gold/20 transition-colors"
              data-testid="close-modal-btn"
            >
              <X size={18} className="text-navy" />
            </button>

            {/* Success Icon */}
            <div className="text-center mb-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
                className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-teal/20 mb-4"
              >
                <CheckCircle size={40} className="text-teal" />
              </motion.div>
              <h2 className="font-heading text-2xl md:text-3xl font-semibold text-navy mb-2">
                Appointment Requested!
              </h2>
              <p className="font-body text-navy/70">
                We'll confirm via phone within 24 hours.
              </p>
            </div>

            {/* Gold Divider */}
            <div className="w-16 h-1 bg-gold mx-auto mb-6" />

            {/* Appointment Details */}
            <div className="space-y-4 bg-pearl rounded-2xl p-6">
              {appointmentData?.doctorName && (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                    <User size={18} className="text-gold" />
                  </div>
                  <div>
                    <p className="font-body text-xs text-navy/50 uppercase tracking-wider">Doctor</p>
                    <p className="font-heading text-navy">{appointmentData.doctorName}</p>
                  </div>
                </div>
              )}

              {appointmentData?.serviceName && (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                    <Stethoscope size={18} className="text-gold" />
                  </div>
                  <div>
                    <p className="font-body text-xs text-navy/50 uppercase tracking-wider">Service</p>
                    <p className="font-heading text-navy">{appointmentData.serviceName}</p>
                  </div>
                </div>
              )}

              {appointmentData?.date && (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                    <Calendar size={18} className="text-gold" />
                  </div>
                  <div>
                    <p className="font-body text-xs text-navy/50 uppercase tracking-wider">Date</p>
                    <p className="font-heading text-navy">
                      {format(new Date(appointmentData.date), "EEEE, MMMM d, yyyy")}
                    </p>
                  </div>
                </div>
              )}

              {appointmentData?.timeSlot && (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                    <Clock size={18} className="text-gold" />
                  </div>
                  <div>
                    <p className="font-body text-xs text-navy/50 uppercase tracking-wider">Time</p>
                    <p className="font-heading text-navy">{timeSlotLabels[appointmentData.timeSlot]}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Contact Info */}
            <div className="mt-6 p-4 bg-gold/10 rounded-xl flex items-center gap-3">
              <Phone size={18} className="text-gold" />
              <div>
                <p className="font-body text-sm text-navy">
                  Questions? Call us at{" "}
                  <a href="tel:+8801700000000" className="text-gold font-medium hover:underline">
                    +880 1700-000000
                  </a>
                </p>
              </div>
            </div>

            {/* Close Button */}
            <Button
              onClick={onClose}
              data-testid="modal-done-btn"
              className="w-full mt-6 bg-navy hover:bg-navy/90 text-pearl font-body font-medium rounded-full py-4 transition-all"
            >
              Done
            </Button>

            {/* Decorative elements */}
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-gold/10 rounded-full" />
            <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-teal/10 rounded-full" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SuccessModal;
