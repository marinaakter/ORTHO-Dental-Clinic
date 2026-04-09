import { format } from "date-fns";
import { motion } from "framer-motion";
import {
    Calendar,
    CheckCircle,
    Clock,
    Eye,
    Lock, LogOut,
    Mail,
    Phone,
    Stethoscope,
    Trash2,
    User,
    XCircle
} from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";

const ADMIN_PASSWORD = "admin123";

export const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    // Check if already authenticated
    const auth = sessionStorage.getItem("adminAuth");
    if (auth === "true") {
      setIsAuthenticated(true);
      loadAppointments();
    }
  }, []);

  const loadAppointments = () => {
    const stored = JSON.parse(localStorage.getItem("appointments") || "[]");
    setAppointments(stored.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem("adminAuth", "true");
      loadAppointments();
      setError("");
    } else {
      setError("Invalid password");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("adminAuth");
    setPassword("");
  };

  const updateStatus = (id, status) => {
    const updated = appointments.map((apt) =>
      apt.id === id ? { ...apt, status } : apt
    );
    setAppointments(updated);
    localStorage.setItem("appointments", JSON.stringify(updated));
  };

  const deleteAppointment = (id) => {
    const updated = appointments.filter((apt) => apt.id !== id);
    setAppointments(updated);
    localStorage.setItem("appointments", JSON.stringify(updated));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-teal/20 text-teal";
      case "cancelled":
        return "bg-red-100 text-red-600";
      default:
        return "bg-gold/20 text-gold";
    }
  };

  const timeSlotLabels = {
    morning: "Morning (9AM - 12PM)",
    afternoon: "Afternoon (12PM - 4PM)",
    evening: "Evening (4PM - 7PM)"
  };

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-pearl flex items-center justify-center p-6" data-testid="admin-login-page">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gold/10 p-8 w-full max-w-md"
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto rounded-full bg-navy flex items-center justify-center mb-4">
              <Lock size={28} className="text-gold" />
            </div>
            <h1 className="font-heading text-2xl font-semibold text-navy mb-2">
              Admin Access
            </h1>
            <p className="font-body text-navy/70 text-sm">
              Enter password to manage appointments
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="password" className="font-body text-navy">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                data-testid="admin-password-input"
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                className="border-navy/20 focus:border-gold rounded-xl py-6"
              />
              {error && (
                <p className="text-red-500 text-sm font-body">{error}</p>
              )}
            </div>

            <Button
              type="submit"
              data-testid="admin-login-btn"
              className="w-full bg-navy hover:bg-navy/90 text-pearl font-body font-medium rounded-full py-6"
            >
              Login
            </Button>
          </form>

          <p className="mt-6 text-center font-body text-xs text-navy/50">
            Hint: The password is "admin123"
          </p>
        </motion.div>
      </div>
    );
  }

  // Admin Dashboard
  return (
    <div className="min-h-screen bg-pearl" data-testid="admin-dashboard">
      {/* Header */}
      <header className="bg-navy sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="font-heading text-xl text-pearl">
            Ortho Dental Clinic <span className="text-gold">Admin</span>
          </h1>
          <Button
            onClick={handleLogout}
            data-testid="admin-logout-btn"
            variant="outline"
            className="border-pearl/30 text-pearl hover:bg-pearl/10 rounded-full px-4 py-2 inline-flex items-center gap-2"
          >
            <LogOut size={16} />
            Logout
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          {[
            { label: "Total Appointments", value: appointments.length, color: "bg-navy" },
            { label: "Pending", value: appointments.filter(a => a.status === "pending").length, color: "bg-gold" },
            { label: "Confirmed", value: appointments.filter(a => a.status === "confirmed").length, color: "bg-teal" }
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-2xl p-6 shadow-sm border border-gold/10">
              <p className="font-body text-sm text-navy/70 mb-1">{stat.label}</p>
              <p className="font-heading text-3xl font-semibold text-navy">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Appointments List */}
        <div className="bg-white rounded-3xl shadow-sm border border-gold/10 overflow-hidden">
          <div className="p-6 border-b border-gold/10">
            <h2 className="font-heading text-xl font-semibold text-navy">
              Appointments
            </h2>
          </div>

          {appointments.length === 0 ? (
            <div className="p-12 text-center">
              <Calendar size={48} className="text-navy/20 mx-auto mb-4" />
              <p className="font-body text-navy/60">No appointments yet</p>
            </div>
          ) : (
            <div className="divide-y divide-gold/10">
              {appointments.map((apt) => (
                <motion.div
                  key={apt.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-6 hover:bg-pearl/50 transition-colors"
                  data-testid={`appointment-${apt.id}`}
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="space-y-3">
                      {/* Patient Name */}
                      <div className="flex items-center gap-2">
                        <User size={16} className="text-gold" />
                        <span className="font-heading text-lg text-navy font-semibold">
                          {apt.fullName}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-body ${getStatusColor(apt.status)}`}>
                          {apt.status}
                        </span>
                      </div>

                      {/* Details */}
                      <div className="flex flex-wrap gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Phone size={14} className="text-navy/40" />
                          <span className="font-body text-navy/70">{apt.phone}</span>
                        </div>
                        {apt.email && (
                          <div className="flex items-center gap-2">
                            <Mail size={14} className="text-navy/40" />
                            <span className="font-body text-navy/70">{apt.email}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-2">
                          <Stethoscope size={14} className="text-navy/40" />
                          <span className="font-body text-navy/70">{apt.serviceName}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <User size={14} className="text-navy/40" />
                          <span className="font-body text-navy/70">{apt.doctorName}</span>
                        </div>
                      </div>

                      {/* Date & Time */}
                      <div className="flex flex-wrap gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar size={14} className="text-gold" />
                          <span className="font-body text-navy">
                            {apt.date ? format(new Date(apt.date), "EEEE, MMMM d, yyyy") : "Not set"}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock size={14} className="text-gold" />
                          <span className="font-body text-navy">
                            {timeSlotLabels[apt.timeSlot] || apt.timeSlot}
                          </span>
                        </div>
                      </div>

                      {/* Notes */}
                      {apt.notes && (
                        <div className="flex items-start gap-2 text-sm">
                          <Eye size={14} className="text-navy/40 mt-0.5" />
                          <span className="font-body text-navy/70">{apt.notes}</span>
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      <Button
                        onClick={() => updateStatus(apt.id, "confirmed")}
                        data-testid={`confirm-${apt.id}`}
                        disabled={apt.status === "confirmed"}
                        className="bg-teal hover:bg-teal/90 text-white rounded-full px-4 py-2 text-sm inline-flex items-center gap-1"
                      >
                        <CheckCircle size={14} />
                        Confirm
                      </Button>
                      <Button
                        onClick={() => updateStatus(apt.id, "cancelled")}
                        data-testid={`cancel-${apt.id}`}
                        disabled={apt.status === "cancelled"}
                        variant="outline"
                        className="border-red-300 text-red-600 hover:bg-red-50 rounded-full px-4 py-2 text-sm inline-flex items-center gap-1"
                      >
                        <XCircle size={14} />
                        Cancel
                      </Button>
                      <Button
                        onClick={() => deleteAppointment(apt.id)}
                        data-testid={`delete-${apt.id}`}
                        variant="ghost"
                        className="text-navy/40 hover:text-red-600 hover:bg-red-50 rounded-full p-2"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Admin;
