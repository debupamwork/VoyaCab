import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, MessageCircle, X, Zap, ArrowRight, Headset } from 'lucide-react';

export default function QuickBookWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleQuickAction = (type: 'whatsapp' | 'call') => {
    const message = "Hi VoyaCab! I'd like to book a cab. Can you help me skip the form?";
    const url = type === 'whatsapp' 
      ? `https://wa.me/916003031569?text=${encodeURIComponent(message)}`
      : 'tel:+916003031569';
    window.open(url, '_blank');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-24 md:bottom-8 right-4 md:right-8 z-[100] flex flex-col items-end gap-4">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-slate-100 p-6 w-[280px] mb-2 overflow-hidden relative"
          >
            {/* Decorative background */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-brand-50 rounded-full -mr-12 -mt-12 blur-2xl opacity-50" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-brand-600 flex items-center justify-center shadow-lg shadow-brand-100">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight">Quick Booking</h4>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Skip the forms</p>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => handleQuickAction('whatsapp')}
                  className="w-full bg-[#25D366] hover:bg-[#20bd5c] text-white p-4 rounded-2xl font-bold flex items-center justify-between group transition-all shadow-lg shadow-green-100"
                >
                  <div className="flex items-center gap-3">
                    <MessageCircle className="w-5 h-5" />
                    <span className="text-sm">WhatsApp Us</span>
                  </div>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => handleQuickAction('call')}
                  className="w-full bg-brand-600 hover:bg-brand-700 text-white p-4 rounded-2xl font-bold flex items-center justify-between group transition-all shadow-lg shadow-brand-100"
                >
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5" />
                    <span className="text-sm">Call Directly</span>
                  </div>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              <p className="text-center text-[9px] text-slate-400 mt-6 font-bold uppercase tracking-widest">
                24/7 Instant Support Available
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: isVisible ? 1 : 0 }}
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all border-4 border-white ${
          isOpen ? 'bg-brand-700 text-white' : 'bg-brand-600 text-white'
        }`}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Headset className="w-7 h-7" />}
        
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full border-2 border-white animate-bounce" />
        )}
      </motion.button>
    </div>
  );
}
