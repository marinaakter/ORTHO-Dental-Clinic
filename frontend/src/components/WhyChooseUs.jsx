import { motion } from "framer-motion";
import { Cpu, Heart, UserCheck, Wallet } from "lucide-react";

const features = [
  {
    icon: UserCheck,
    title: "Expert Doctors",
    description: "Our team of certified dental professionals brings decades of combined experience to your care."
  },
  {
    icon: Cpu,
    title: "Modern Equipment",
    description: "We use the latest dental technology for accurate diagnosis and comfortable treatments."
  },
  {
    icon: Heart,
    title: "Painless Treatment",
    description: "Advanced techniques and caring approach ensure a comfortable, pain-free experience."
  },
  {
    icon: Wallet,
    title: "Affordable Pricing",
    description: "Quality dental care shouldn't break the bank. We offer transparent, competitive pricing."
  }
];

export const WhyChooseUs = () => {
  return (
    <section className="py-24 md:py-32 bg-white" data-testid="why-choose-us-section">
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
            Why Ortho Dental Clinic
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold text-navy leading-tight">
            Why Choose <span className="text-gold">Us</span>
          </h2>
          <div className="w-24 h-1 bg-gold mx-auto mt-6" />
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group text-center"
                data-testid={`feature-card-${index + 1}`}
              >
                <div className="relative inline-flex mb-6">
                  <div className="w-20 h-20 rounded-2xl bg-pearl flex items-center justify-center group-hover:bg-gold transition-colors duration-300">
                    <Icon size={32} className="text-gold group-hover:text-navy transition-colors duration-300" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-teal rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <h3 className="font-heading text-xl font-semibold text-navy mb-3 group-hover:text-gold transition-colors">
                  {feature.title}
                </h3>
                <p className="font-body text-navy/70 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
