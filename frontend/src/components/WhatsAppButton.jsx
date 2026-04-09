import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import { useState } from "react";

// WhatsApp number for the clinic (Bangladesh format without +)
const WHATSAPP_NUMBER = "8801700000000";

const quickMessages = [
  { id: 1, text: "I'd like to book an appointment", emoji: "📅" },
  { id: 2, text: "What are your clinic hours?", emoji: "🕐" },
  { id: 3, text: "I have a dental emergency", emoji: "🚨" },
  { id: 4, text: "What services do you offer?", emoji: "🦷" },
  { id: 5, text: "I need pricing information", emoji: "💰" }
];

export const WhatsAppButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleQuickMessage = (message) => {
    const encodedMessage = encodeURIComponent(
      `Hello Ortho Dental Clinic! ${message}`
    );
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`,
      "_blank"
    );
    setIsOpen(false);
  };

  const handleCustomChat = () => {
    const encodedMessage = encodeURIComponent(
      "Hello Ortho Dental Clinic! I'd like to know more about your services."
    );
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`,
      "_blank"
    );
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40" data-testid="whatsapp-widget">
      {/* Quick Message Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-16 right-0 w-80 bg-white rounded-2xl shadow-2xl border border-gold/10 overflow-hidden mb-2"
            data-testid="whatsapp-panel"
          >
            {/* Header */}
            <div className="bg-[#25D366] p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="font-body font-semibold text-white text-sm">
                      Ortho Dental Clinic
                    </p>
                    <p className="font-body text-white/80 text-xs">
                      Typically replies instantly
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white/80 hover:text-white transition-colors"
                  data-testid="whatsapp-close-btn"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Chat Bubble */}
            <div className="p-4 bg-[#ECE5DD]">
              <div className="bg-white rounded-lg p-3 shadow-sm max-w-[85%]">
                <p className="font-body text-sm text-gray-800">
                  Hi there! 👋
                </p>
                <p className="font-body text-sm text-gray-800 mt-1">
                  How can we help you today? Select a quick option below or start a custom chat.
                </p>
                <p className="font-body text-xs text-gray-400 mt-2 text-right">
                  Just now
                </p>
              </div>
            </div>

            {/* Quick Messages */}
            <div className="p-4 space-y-2 max-h-60 overflow-y-auto">
              <p className="font-body text-xs text-navy/50 uppercase tracking-wider mb-3">
                Quick Messages
              </p>
              {quickMessages.map((msg) => (
                <button
                  key={msg.id}
                  onClick={() => handleQuickMessage(msg.text)}
                  className="w-full text-left p-3 rounded-xl border border-gold/20 hover:border-gold hover:bg-gold/5 transition-all group"
                  data-testid={`quick-msg-${msg.id}`}
                >
                  <span className="font-body text-sm text-navy group-hover:text-navy">
                    {msg.emoji} {msg.text}
                  </span>
                </button>
              ))}
            </div>

            {/* Start Chat Button */}
            <div className="p-4 border-t border-gold/10">
              <button
                onClick={handleCustomChat}
                className="w-full bg-[#25D366] hover:bg-[#20BD5A] text-white font-body font-medium py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
                data-testid="start-whatsapp-chat-btn"
              >
                <MessageCircle size={18} />
                Start Chat
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-colors ${
          isOpen ? "bg-navy" : "bg-[#25D366]"
        }`}
        data-testid="whatsapp-toggle-btn"
        aria-label="Open WhatsApp chat"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X size={24} className="text-white" />
            </motion.div>
          ) : (
            <motion.div
              key="whatsapp"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <svg viewBox="0 0 24 24" className="w-7 h-7 fill-white">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Pulse Animation */}
      {!isOpen && (
        <span className="absolute bottom-0 right-0 w-14 h-14 rounded-full bg-[#25D366] animate-ping opacity-30" />
      )}
    </div>
  );
};

export default WhatsAppButton;
