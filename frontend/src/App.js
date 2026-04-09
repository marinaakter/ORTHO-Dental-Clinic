import "@/index.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "sonner";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Doctors from "./pages/Doctors";
import Appointment from "./pages/Appointment";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";
import WhatsAppButton from "./components/WhatsAppButton";

// Layout component to conditionally render WhatsApp button
const AppLayout = ({ children }) => {
  const location = useLocation();
  const isAdminPage = location.pathname === "/admin";
  
  return (
    <>
      {children}
      {!isAdminPage && <WhatsAppButton />}
    </>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AppLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/doctors" element={<Doctors />} />
            <Route path="/appointment" element={<Appointment />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </AppLayout>
      </BrowserRouter>
      <Toaster 
        position="top-center" 
        richColors 
        toastOptions={{
          style: {
            fontFamily: "DM Sans, sans-serif"
          }
        }}
      />
    </div>
  );
}

export default App;
