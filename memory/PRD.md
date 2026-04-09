# DentaCare Dhaka - Product Requirements Document

## Original Problem Statement
Build a complete, production-ready dental clinic website using React for DentaCare Dhaka clinic in Dhaka, Bangladesh. Features include a luxury medical spa aesthetic with navy/gold/teal colors, 5 main pages (Home, Services, Doctors, Appointment, Contact), appointment booking with localStorage persistence, and simple admin panel.

## User Personas
1. **Potential Patients**: Adults in Dhaka looking for premium dental services
2. **Parents**: Seeking pediatric dental care for children
3. **Clinic Admin**: Staff managing appointment requests

## Core Requirements (Static)
- Luxury "Medical Spa" aesthetic with Deep Navy (#0B1F3A), Pearl White (#F8F6F2), Gold (#C9A84C), and Teal (#3ABFBF)
- Typography: Cormorant Garamond (headings), DM Sans (body)
- Responsive design (mobile, tablet, desktop)
- Smooth scroll animations with Framer Motion
- localStorage-based data persistence

## Implementation Status

### Completed Features (March 2026)
- [x] **Homepage**: Hero with parallax effect, Why Choose Us section, Services preview, Doctors section, Testimonials carousel, Contact strip, Footer
- [x] **Services Page**: 6 dental services with detailed descriptions (General Dentistry, Teeth Whitening, Orthodontics, Dental Implants, Root Canal, Pediatric Dentistry)
- [x] **Doctors Page**: 4 doctor profiles (Dr. Aisha Rahman, Dr. Karim Hossain, Dr. Nusrat Jahan, Dr. Tariq Ahmed) with booking links
- [x] **Appointment Page**: Full booking form with date picker (disabled past dates & Fridays), time slots, doctor/service selection, validation, success modal
- [x] **Contact Page**: Contact form, clinic info, Google Maps embed, working hours
- [x] **Admin Panel**: Password-protected (/admin, password: admin123), view/confirm/cancel/delete appointments
- [x] **Mobile Responsive**: Hamburger menu, stacked layouts, touch-friendly
- [x] **Animations**: Framer Motion fade-ins, parallax, micro-interactions

### Tech Stack
- React 18 with React Router v6
- Tailwind CSS with custom configuration
- Framer Motion for animations
- Shadcn/UI components
- Lucide React icons
- localStorage for data persistence

## Prioritized Backlog

### P0 (Critical) - None
All core features implemented

### P1 (High Priority)
- Email/SMS notifications for appointment confirmations (requires backend)
- Online payment integration (Stripe/Razorpay)

### P2 (Medium Priority)  
- Patient portal with appointment history
- Multi-language support (English/Bangla)
- Blog/Articles section
- Insurance information page
- Virtual consultation booking

### P3 (Low Priority)
- Dark mode toggle
- Advanced appointment rescheduling
- Patient reviews integration (Google Reviews API)
- Staff scheduling system

## Architecture
```
/app/frontend/src/
├── components/
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── HeroSection.jsx
│   ├── ServicesGrid.jsx
│   ├── DoctorCard.jsx
│   ├── TestimonialCarousel.jsx
│   ├── WhyChooseUs.jsx
│   ├── ContactStrip.jsx
│   ├── AppointmentForm.jsx
│   ├── SuccessModal.jsx
│   └── ui/ (Shadcn components)
├── pages/
│   ├── Home.jsx
│   ├── Services.jsx
│   ├── Doctors.jsx
│   ├── Appointment.jsx
│   ├── Contact.jsx
│   └── Admin.jsx
├── data/
│   ├── doctors.js
│   ├── services.js
│   └── testimonials.js
└── App.js
```

## Next Tasks
1. Consider adding backend API for appointment persistence
2. Add email notifications (SendGrid/Resend)
3. Implement WhatsApp integration for instant booking

## Update Log - March 2026

### WhatsApp Integration Added
- Floating WhatsApp button with pulse animation
- Quick message panel with pre-defined options:
  - Book appointment
  - Clinic hours inquiry
  - Dental emergency
  - Services info
  - Pricing information
- Opens WhatsApp Web/App with pre-filled message
- Hidden on admin page
- WhatsApp Number: +880 1700-000000 (configurable in component)
