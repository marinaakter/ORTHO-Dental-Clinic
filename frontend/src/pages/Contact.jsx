import { motion } from "framer-motion";
import { CheckCircle, Clock, Mail, MapPin, Phone, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone || !formData.message) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);
    
    // Simulate submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Save to localStorage
    const contacts = JSON.parse(localStorage.getItem("contacts") || "[]");
    contacts.push({
      ...formData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    });
    localStorage.setItem("contacts", JSON.stringify(contacts));

    setIsSubmitting(false);
    setIsSubmitted(true);
    toast.success("Message sent successfully!");
  };

  const resetForm = () => {
    setFormData({ name: "", phone: "", email: "", message: "" });
    setIsSubmitted(false);
  };

  return (
    <div className="min-h-screen bg-pearl" data-testid="contact-page">
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
                Get in Touch
              </span>
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-semibold text-navy leading-tight mb-6">
                Contact <span className="text-gold">Us</span>
              </h1>
              <p className="font-body text-navy/70 text-base md:text-lg leading-relaxed">
                Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
              </p>
              <div className="w-24 h-1 bg-gold mx-auto mt-8" />
            </motion.div>
          </div>
        </section>

        {/* Main Content */}
        <section className="pb-16">
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                {isSubmitted ? (
                  <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gold/10 p-8 text-center">
                    <div className="w-20 h-20 mx-auto rounded-full bg-teal/20 flex items-center justify-center mb-6">
                      <CheckCircle size={40} className="text-teal" />
                    </div>
                    <h3 className="font-heading text-2xl font-semibold text-navy mb-2">
                      Message Sent!
                    </h3>
                    <p className="font-body text-navy/70 mb-6">
                      Thank you for reaching out. We'll get back to you shortly.
                    </p>
                    <Button
                      onClick={resetForm}
                      className="bg-navy hover:bg-navy/90 text-pearl font-body font-medium rounded-full px-8 py-3"
                    >
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <form
                    onSubmit={handleSubmit}
                    className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gold/10 p-8"
                    data-testid="contact-form"
                  >
                    <h3 className="font-heading text-2xl font-semibold text-navy mb-6">
                      Send Us a Message
                    </h3>

                    <div className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="font-body text-navy">
                          Full Name *
                        </Label>
                        <Input
                          id="name"
                          data-testid="contact-input-name"
                          placeholder="Your full name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="border-navy/20 focus:border-gold rounded-xl py-6"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone" className="font-body text-navy">
                          Phone Number *
                        </Label>
                        <Input
                          id="phone"
                          data-testid="contact-input-phone"
                          placeholder="+880 1XXX-XXXXXX"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="border-navy/20 focus:border-gold rounded-xl py-6"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email" className="font-body text-navy">
                          Email Address
                        </Label>
                        <Input
                          id="email"
                          data-testid="contact-input-email"
                          type="email"
                          placeholder="your@email.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="border-navy/20 focus:border-gold rounded-xl py-6"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message" className="font-body text-navy">
                          Message *
                        </Label>
                        <Textarea
                          id="message"
                          data-testid="contact-input-message"
                          placeholder="How can we help you?"
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className="border-navy/20 focus:border-gold rounded-xl min-h-[150px] resize-none"
                        />
                      </div>

                      <Button
                        type="submit"
                        data-testid="contact-submit-btn"
                        disabled={isSubmitting}
                        className="w-full bg-gold hover:bg-gold/90 text-navy font-body font-medium rounded-full py-6 text-lg transition-all hover:scale-[1.02] inline-flex items-center justify-center gap-2"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-5 h-5 border-2 border-navy/30 border-t-navy rounded-full animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send size={18} />
                            Send Message
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                )}
              </motion.div>

              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-6"
              >
                {/* Info Card */}
                <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gold/10 p-8">
                  <h3 className="font-heading text-2xl font-semibold text-navy mb-6">
                    Contact Information
                  </h3>
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
                  </div>
                </div>

                {/* Hours Card */}
                <div className="bg-navy rounded-3xl p-8 text-pearl">
                  <div className="flex items-center gap-3 mb-6">
                    <Clock size={24} className="text-gold" />
                    <h3 className="font-heading text-2xl font-semibold">
                      Working Hours
                    </h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-3 border-b border-pearl/10">
                      <span className="font-body">Saturday - Thursday</span>
                      <span className="font-body text-gold">9:00 AM - 7:00 PM</span>
                    </div>
                    <div className="flex justify-between items-center py-3">
                      <span className="font-body">Friday</span>
                      <span className="font-body text-red-400">Closed</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="pb-24 md:pb-32">
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-3xl overflow-hidden shadow-lg border border-gold/10 h-[400px]"
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
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
