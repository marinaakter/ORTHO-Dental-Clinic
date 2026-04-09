import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { testimonials } from "../data/testimonials";

export const TestimonialCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Auto-advance
  useEffect(() => {
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, []);

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0
    })
  };

  const current = testimonials[currentIndex];

  return (
    <section className="py-24 md:py-32 bg-navy relative overflow-hidden" data-testid="testimonials-section">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="font-body text-xs uppercase tracking-widest text-gold mb-4 block">
            Testimonials
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold text-pearl leading-tight">
            What Our <span className="text-gold">Patients</span> Say
          </h2>
          <div className="w-24 h-1 bg-gold mx-auto mt-6" />
        </motion.div>

        {/* Carousel */}
        <div className="relative max-w-4xl mx-auto">
          {/* Quote Icon */}
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center">
            <Quote size={28} className="text-gold" />
          </div>

          <div className="bg-pearl/5 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-pearl/10 min-h-[300px] flex items-center">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="w-full"
              >
                {/* Stars */}
                <div className="flex justify-center gap-1 mb-6">
                  {[...Array(current.rating)].map((_, i) => (
                    <Star key={i} size={20} className="text-gold fill-gold" />
                  ))}
                </div>

                {/* Quote */}
                <p className="font-heading text-xl md:text-2xl text-pearl text-center leading-relaxed mb-8">
                  "{current.text}"
                </p>

                {/* Author */}
                <div className="flex items-center justify-center gap-4">
                  <img
                    src={current.image}
                    alt={current.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-gold"
                  />
                  <div className="text-left">
                    <p className="font-heading text-lg text-pearl font-semibold">
                      {current.name}
                    </p>
                    <p className="font-body text-sm text-gold">
                      {current.treatment}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={prevSlide}
              className="w-12 h-12 rounded-full border border-pearl/20 flex items-center justify-center hover:bg-pearl/10 transition-colors group"
              data-testid="testimonial-prev-btn"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={20} className="text-pearl group-hover:text-gold" />
            </button>
            
            {/* Dots */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > currentIndex ? 1 : -1);
                    setCurrentIndex(index);
                  }}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex ? "bg-gold w-6" : "bg-pearl/30"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="w-12 h-12 rounded-full border border-pearl/20 flex items-center justify-center hover:bg-pearl/10 transition-colors group"
              data-testid="testimonial-next-btn"
              aria-label="Next testimonial"
            >
              <ChevronRight size={20} className="text-pearl group-hover:text-gold" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialCarousel;
