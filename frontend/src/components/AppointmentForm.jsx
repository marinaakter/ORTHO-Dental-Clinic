import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, Clock, User, Phone, Mail, FileText, Stethoscope, CheckCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar as CalendarComponent } from "./ui/calendar";
import { format, addDays } from "date-fns";
import { doctors } from "../data/doctors";
import { services } from "../data/services";
import { SuccessModal } from "./SuccessModal";

export const AppointmentForm = () => {
  const [searchParams] = useSearchParams();
  const preselectedDoctorId = searchParams.get("doctor");

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    doctorId: preselectedDoctorId || "",
    serviceId: "",
    date: null,
    timeSlot: "",
    notes: ""
  });

  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const timeSlots = [
    { value: "morning", label: "Morning (9AM - 12PM)" },
    { value: "afternoon", label: "Afternoon (12PM - 4PM)" },
    { value: "evening", label: "Evening (4PM - 7PM)" }
  ];

  // Disable past dates and Fridays
  const disabledDays = [
    { before: new Date() },
    { dayOfWeek: [5] } // Friday
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^(\+?880)?[\s-]?[0-9]{4}[\s-]?[0-9]{6}$|^0?1[3-9][0-9]{8}$/.test(formData.phone.replace(/[\s-]/g, ""))) {
      newErrors.phone = "Please enter a valid Bangladesh phone number";
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.doctorId) {
      newErrors.doctorId = "Please select a doctor";
    }

    if (!formData.serviceId) {
      newErrors.serviceId = "Please select a service";
    }

    if (!formData.date) {
      newErrors.date = "Please select a date";
    }

    if (!formData.timeSlot) {
      newErrors.timeSlot = "Please select a time slot";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Get existing appointments from localStorage
    const existingAppointments = JSON.parse(localStorage.getItem("appointments") || "[]");
    
    // Create new appointment
    const newAppointment = {
      id: Date.now().toString(),
      ...formData,
      date: formData.date.toISOString(),
      doctorName: doctors.find((d) => d.id.toString() === formData.doctorId)?.name,
      serviceName: services.find((s) => s.id.toString() === formData.serviceId)?.name,
      status: "pending",
      createdAt: new Date().toISOString()
    };

    // Save to localStorage
    localStorage.setItem("appointments", JSON.stringify([...existingAppointments, newAppointment]));

    setIsSubmitting(false);
    setShowSuccess(true);
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const resetForm = () => {
    setFormData({
      fullName: "",
      phone: "",
      email: "",
      doctorId: "",
      serviceId: "",
      date: null,
      timeSlot: "",
      notes: ""
    });
    setShowSuccess(false);
  };

  return (
    <>
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        onSubmit={handleSubmit}
        className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gold/10 p-8 md:p-10"
        data-testid="appointment-form"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Full Name */}
          <div className="space-y-2">
            <Label htmlFor="fullName" className="font-body text-navy flex items-center gap-2">
              <User size={16} className="text-gold" />
              Full Name *
            </Label>
            <Input
              id="fullName"
              data-testid="input-fullname"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={(e) => handleInputChange("fullName", e.target.value)}
              className={`border-navy/20 focus:border-gold rounded-xl py-6 ${errors.fullName ? "border-red-500" : ""}`}
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm font-body">{errors.fullName}</p>
            )}
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <Label htmlFor="phone" className="font-body text-navy flex items-center gap-2">
              <Phone size={16} className="text-gold" />
              Phone Number *
            </Label>
            <Input
              id="phone"
              data-testid="input-phone"
              placeholder="+880 1XXX-XXXXXX"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              className={`border-navy/20 focus:border-gold rounded-xl py-6 ${errors.phone ? "border-red-500" : ""}`}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm font-body">{errors.phone}</p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email" className="font-body text-navy flex items-center gap-2">
              <Mail size={16} className="text-gold" />
              Email Address (Optional)
            </Label>
            <Input
              id="email"
              data-testid="input-email"
              type="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className={`border-navy/20 focus:border-gold rounded-xl py-6 ${errors.email ? "border-red-500" : ""}`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm font-body">{errors.email}</p>
            )}
          </div>

          {/* Doctor Select */}
          <div className="space-y-2">
            <Label className="font-body text-navy flex items-center gap-2">
              <User size={16} className="text-gold" />
              Select Doctor *
            </Label>
            <Select
              value={formData.doctorId}
              onValueChange={(value) => handleInputChange("doctorId", value)}
            >
              <SelectTrigger
                data-testid="select-doctor"
                className={`border-navy/20 focus:border-gold rounded-xl py-6 ${errors.doctorId ? "border-red-500" : ""}`}
              >
                <SelectValue placeholder="Choose a doctor" />
              </SelectTrigger>
              <SelectContent>
                {doctors.map((doctor) => (
                  <SelectItem key={doctor.id} value={doctor.id.toString()}>
                    {doctor.name} - {doctor.specialization}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.doctorId && (
              <p className="text-red-500 text-sm font-body">{errors.doctorId}</p>
            )}
          </div>

          {/* Service Select */}
          <div className="space-y-2">
            <Label className="font-body text-navy flex items-center gap-2">
              <Stethoscope size={16} className="text-gold" />
              Select Service *
            </Label>
            <Select
              value={formData.serviceId}
              onValueChange={(value) => handleInputChange("serviceId", value)}
            >
              <SelectTrigger
                data-testid="select-service"
                className={`border-navy/20 focus:border-gold rounded-xl py-6 ${errors.serviceId ? "border-red-500" : ""}`}
              >
                <SelectValue placeholder="Choose a service" />
              </SelectTrigger>
              <SelectContent>
                {services.map((service) => (
                  <SelectItem key={service.id} value={service.id.toString()}>
                    {service.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.serviceId && (
              <p className="text-red-500 text-sm font-body">{errors.serviceId}</p>
            )}
          </div>

          {/* Date Picker */}
          <div className="space-y-2">
            <Label className="font-body text-navy flex items-center gap-2">
              <Calendar size={16} className="text-gold" />
              Preferred Date *
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  data-testid="select-date"
                  className={`w-full justify-start text-left font-body border-navy/20 hover:border-gold rounded-xl py-6 ${
                    !formData.date ? "text-navy/50" : "text-navy"
                  } ${errors.date ? "border-red-500" : ""}`}
                >
                  <Calendar size={16} className="mr-2 text-gold" />
                  {formData.date ? format(formData.date, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <CalendarComponent
                  mode="single"
                  selected={formData.date}
                  onSelect={(date) => handleInputChange("date", date)}
                  disabled={disabledDays}
                  initialFocus
                  fromDate={new Date()}
                  toDate={addDays(new Date(), 60)}
                />
              </PopoverContent>
            </Popover>
            {errors.date && (
              <p className="text-red-500 text-sm font-body">{errors.date}</p>
            )}
          </div>

          {/* Time Slot */}
          <div className="space-y-2">
            <Label className="font-body text-navy flex items-center gap-2">
              <Clock size={16} className="text-gold" />
              Preferred Time *
            </Label>
            <Select
              value={formData.timeSlot}
              onValueChange={(value) => handleInputChange("timeSlot", value)}
            >
              <SelectTrigger
                data-testid="select-time"
                className={`border-navy/20 focus:border-gold rounded-xl py-6 ${errors.timeSlot ? "border-red-500" : ""}`}
              >
                <SelectValue placeholder="Choose a time slot" />
              </SelectTrigger>
              <SelectContent>
                {timeSlots.map((slot) => (
                  <SelectItem key={slot.value} value={slot.value}>
                    {slot.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.timeSlot && (
              <p className="text-red-500 text-sm font-body">{errors.timeSlot}</p>
            )}
          </div>

          {/* Notes */}
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="notes" className="font-body text-navy flex items-center gap-2">
              <FileText size={16} className="text-gold" />
              Additional Notes (Optional)
            </Label>
            <Textarea
              id="notes"
              data-testid="input-notes"
              placeholder="Any specific concerns or requests..."
              value={formData.notes}
              onChange={(e) => handleInputChange("notes", e.target.value)}
              className="border-navy/20 focus:border-gold rounded-xl min-h-[120px] resize-none"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-8">
          <Button
            type="submit"
            data-testid="submit-appointment-btn"
            disabled={isSubmitting}
            className="w-full bg-gold hover:bg-gold/90 text-navy font-body font-medium rounded-full py-6 text-lg transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-navy/30 border-t-navy rounded-full animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <CheckCircle size={20} />
                Confirm Appointment
              </>
            )}
          </Button>
        </div>
      </motion.form>

      <SuccessModal
        isOpen={showSuccess}
        onClose={resetForm}
        appointmentData={{
          ...formData,
          doctorName: doctors.find((d) => d.id.toString() === formData.doctorId)?.name,
          serviceName: services.find((s) => s.id.toString() === formData.serviceId)?.name
        }}
      />
    </>
  );
};

export default AppointmentForm;
