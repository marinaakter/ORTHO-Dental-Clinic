import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import WhyChooseUs from "../components/WhyChooseUs";
import ServicesGrid from "../components/ServicesGrid";
import { DoctorsSection } from "../components/DoctorCard";
import TestimonialCarousel from "../components/TestimonialCarousel";
import ContactStrip from "../components/ContactStrip";
import { doctors } from "../data/doctors";

export const Home = () => {
  return (
    <div className="min-h-screen bg-pearl" data-testid="home-page">
      <Navbar />
      <main>
        <HeroSection />
        <WhyChooseUs />
        <ServicesGrid />
        <DoctorsSection doctors={doctors} />
        <TestimonialCarousel />
        <ContactStrip />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
