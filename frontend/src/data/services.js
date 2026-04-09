import { Stethoscope, Sparkles, AlignLeft, CircleDot, Activity, Baby } from "lucide-react";

export const services = [
  {
    id: 1,
    name: "General Dentistry",
    shortDescription: "Comprehensive dental care for your entire family",
    description: "From routine checkups to preventive care, our general dentistry services ensure your oral health is in the best hands. We offer cleanings, fillings, and early detection of dental issues.",
    icon: Stethoscope,
    image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=600&h=400&fit=crop"
  },
  {
    id: 2,
    name: "Teeth Whitening",
    shortDescription: "Brighten your smile with professional whitening",
    description: "Achieve a dazzling, radiant smile with our professional teeth whitening treatments. Safe, effective, and long-lasting results in just one visit.",
    icon: Sparkles,
    image: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=600&h=400&fit=crop"
  },
  {
    id: 3,
    name: "Orthodontics",
    shortDescription: "Braces & aligners for a perfect alignment",
    description: "Transform your smile with our modern orthodontic solutions including traditional braces, ceramic braces, and invisible aligners tailored to your lifestyle.",
    icon: AlignLeft,
    image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=600&h=400&fit=crop"
  },
  {
    id: 4,
    name: "Dental Implants",
    shortDescription: "Permanent solutions for missing teeth",
    description: "Replace missing teeth with natural-looking dental implants. Our advanced techniques ensure comfortable placement and lasting results.",
    icon: CircleDot,
    image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600&h=400&fit=crop"
  },
  {
    id: 5,
    name: "Root Canal Treatment",
    shortDescription: "Pain-free treatment to save your tooth",
    description: "Don't fear root canals anymore. Our gentle approach and modern technology make the treatment comfortable while saving your natural tooth.",
    icon: Activity,
    image: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=600&h=400&fit=crop"
  },
  {
    id: 6,
    name: "Pediatric Dentistry",
    shortDescription: "Gentle care for your little ones",
    description: "Creating positive dental experiences for children. Our kid-friendly approach ensures your child develops healthy dental habits from an early age.",
    icon: Baby,
    image: "https://images.unsplash.com/photo-1588776813677-77aaf5595b83?w=600&h=400&fit=crop"
  }
];

export default services;
