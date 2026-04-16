import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MapPin, Calendar, Users, ArrowRight, Circle, Navigation, Clock,
  ChevronLeft, Check, Info, Sparkles, MessageCircle, Zap, ChevronDown,
  Phone, Car, CreditCard, X
} from 'lucide-react';
import { formatDate, formatTime, cn } from '../lib/utils';
import { GoogleGenAI, Type } from "@google/genai";
import { useLanguage } from '../contexts/LanguageContext';
import { CARS, DESTINATIONS } from '../constants';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const VEHICLE_RATES = {
  'Dzire': { dayRate: 3500, kmRate: 20, guwahatiKmRate: 10 },
  'Innova': { dayRate: 7000, kmRate: 30, guwahatiKmRate: 15 },
  'Traveller': { dayRate: 9000, kmRate: 40, guwahatiKmRate: 20 },
  'Urbania': { dayRate: 14999, kmRate: 50, guwahatiKmRate: 25 }
};

const PICKUP_COORDS = {
  'Guwahati': { lat: 26.1061, lng: 91.5859 },
  'Guwahati Airport': { lat: 26.1061, lng: 91.5859 }
};

const TOUR_ROUTES = [
  ['Guwahati', 'Shillong', 'Dawki'],
  ['Guwahati', 'Bomdila', 'Tawang'],
  ['Guwahati', 'Kaziranga', 'Majuli']
];

export default function BookingHub() {
  const [routeIndex, setRouteIndex] = useState(0);
  const { t } = useLanguage();

  const [bookingData, setBookingData] = useState({
    from: 'Guwahati City' as any,
    destinations: [] as string[], // For multi-destination
    date: '',
    time: '',
    carType: 'Dzire' as keyof typeof VEHICLE_RATES,
    days: 1,
    coordinates: {
      from: null as { lat: number, lng: number } | null
    }
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setRouteIndex((prev) => (prev + 1) % TOUR_ROUTES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const [isBooking, setIsBooking] = useState(false);
  const [error, setError] = useState('');
  const [placeholder, setPlaceholder] = useState('');
  const [showDestDropdown, setShowDestDropdown] = useState(false);

  const PREMIUM_DESTINATIONS = [
    'Shillong', 'Kaziranga', 'Tawang', 'Cherrapunji', 'Dawki', 
    'Mawlynnong', 'Bomdila', 'Ziro', 'Gangtok', 'Pelling'
  ];

  useEffect(() => {
    const destinations = ['Shillong', 'Kaziranga', 'Tawang', 'Cherrapunji', 'Meghalaya', 'Arunachal'];
    let destIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let timeout: NodeJS.Timeout;

    const type = () => {
      const currentDest = destinations[destIndex];
      
      if (isDeleting) {
        setPlaceholder(currentDest.substring(0, charIndex - 1));
        charIndex--;
      } else {
        setPlaceholder(currentDest.substring(0, charIndex + 1));
        charIndex++;
      }

      let typeSpeed = isDeleting ? 50 : 150;

      if (!isDeleting && charIndex === currentDest.length) {
        isDeleting = true;
        typeSpeed = 2000;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        destIndex = (destIndex + 1) % destinations.length;
        typeSpeed = 500;
      }

      timeout = setTimeout(type, typeSpeed);
    };

    type();
    return () => clearTimeout(timeout);
  }, []);

  // Load draft on mount
  useEffect(() => {
    const saved = localStorage.getItem('voyacab_draft');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setBookingData(prev => ({
          ...prev,
          ...parsed.bookingData,
          coordinates: parsed.bookingData.coordinates || prev.coordinates
        }));
      } catch (e) {
        console.error("Failed to parse draft", e);
      }
    }
  }, []);

  // Save draft on change
  useEffect(() => {
    const hasData = bookingData.from || bookingData.destinations.length > 0;
    if (hasData) {
      localStorage.setItem('voyacab_draft', JSON.stringify({
        bookingMode: 'package', bookingData
      }));
    }
  }, [bookingData]);

  const handleWhatsAppBook = async () => {
    setIsBooking(true);
    
    localStorage.removeItem('voyacab_draft');

    const tripTypeInfo = `*Duration:* ${bookingData.days} ${bookingData.days === 1 ? 'Day' : 'Days'}%0A`;

    const destinationInfo = `*Destinations:* ${bookingData.destinations.join(' → ')}`;

    const modeLabel = 'Tour Package';
    const packageNote = `%0A*Note:* Please provide the best deal for this trip.`;
    
    let coordinateInfo = '';
    if (bookingData.coordinates?.from) {
      coordinateInfo += `%0A*Pickup Lat/Lng:* ${bookingData.coordinates.from.lat}, ${bookingData.coordinates.from.lng}`;
    }

    const message = `*VoyaCab Booking Inquiry*%0A%0A*Mode:* ${modeLabel}%0A*Pickup:* ${bookingData.from}%0A${destinationInfo}%0A${tripTypeInfo}*Date:* ${bookingData.date}%0A*Time:* ${bookingData.time || 'Not specified'}%0A*Vehicle:* ${bookingData.carType}${coordinateInfo}${packageNote}`;
    const whatsappUrl = `https://wa.me/916003031569?text=${message}`;
    
    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
      setIsBooking(false);
    }, 1000);
  };

  const isSelectionComplete = (bookingData.from && bookingData.destinations.length > 0);

  const currentRoutes = TOUR_ROUTES;
  const activeRoute = currentRoutes[routeIndex] || currentRoutes[0];

  return (
    <div className="w-full max-w-4xl mx-auto px-6 relative z-20">
      {/* Section Title Hook */}
      <div className="mb-8 md:mb-12 flex flex-col items-center text-center space-y-6">
        <div className="flex bg-slate-100 p-1 rounded-2xl w-full max-w-lg">
          <div className="flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all bg-white text-brand-600 shadow-sm text-center">
            Tour Packages
          </div>
        </div>

        {/* Moved Heading here as requested */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center"
        >
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-[1.2] mb-6 drop-shadow-2xl">
            {t('hero.bookRide')}
          </h1>

          <div className="h-20 relative w-full flex justify-center items-start pt-2 mb-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={`package-${routeIndex}`}
                variants={{
                  hidden: { opacity: 0 },
                  show: { opacity: 1, transition: { staggerChildren: 0.6 } },
                  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.3 } }
                }}
                initial="hidden"
                animate="show"
                exit="exit"
                className="flex items-center"
              >
                {activeRoute.map((stop, idx, arr) => (
                  <React.Fragment key={stop}>
                    {/* Node */}
                    <motion.div
                      variants={{
                        hidden: { opacity: 0, scale: 0, y: 10 },
                        show: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 20 } }
                      }}
                      className="relative flex flex-col items-center"
                    >
                      <div className="w-3.5 h-3.5 rounded-full bg-white border-[3px] border-brand-500 shadow-[0_0_15px_rgba(56,189,248,0.8)] z-10" />
                      <div className="absolute top-6 whitespace-nowrap">
                        <span className="text-white/95 text-[10px] md:text-xs font-black tracking-[0.2em] uppercase drop-shadow-md">
                          {stop}
                        </span>
                      </div>
                    </motion.div>

                    {/* Line & Car */}
                    {idx < arr.length - 1 && (
                      <div className="relative flex items-center">
                        <motion.div
                          variants={{
                            hidden: { scaleX: 0, opacity: 0 },
                            show: { scaleX: 1, opacity: 1, transition: { duration: 0.6, ease: "easeInOut" } }
                          }}
                          className="h-[2px] w-32 md:w-64 bg-gradient-to-r from-brand-500 to-brand-300 origin-left relative z-0"
                        />
                        <motion.div
                          variants={{
                            hidden: { left: "0%", opacity: 0 },
                            show: { 
                              left: "100%", 
                              opacity: [0, 1, 1, 0],
                              transition: { duration: 1.5, ease: "easeInOut", times: [0, 0.1, 0.9, 1] } 
                            }
                          }}
                          className="absolute -top-3.5 text-white drop-shadow-[0_0_8px_rgba(255,255,255,1)] z-10 -ml-2"
                        >
                          <Car className="w-4 h-4" />
                        </motion.div>
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* Premium Booking Card */}
      <div className="bg-white rounded-[1.5rem] md:rounded-[2.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.12)] border border-slate-100 overflow-hidden relative min-h-[400px]">
        <AnimatePresence mode="wait">
          <motion.div 
            key="step1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="p-5 md:p-10"
          >
              <div className="grid lg:grid-cols-2 gap-6 md:gap-12 items-start">
                {/* Left: Route Selection */}
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 text-slate-400">
                      <div className="w-10 h-10 rounded-full bg-brand-50 flex items-center justify-center border border-brand-100 shadow-sm">
                        <Circle className="w-4 h-4 text-brand-600 fill-brand-600" />
                      </div>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                        Starting Point
                      </span>
                    </div>
                    <div className="relative group">
                        <input
                          type="text"
                          value={bookingData.from}
                          onChange={(e) => setBookingData({ 
                            ...bookingData, 
                            from: e.target.value
                          })}
                          placeholder="Starting point (e.g. Guwahati City)"
                          className="w-full bg-slate-50 border-none rounded-xl px-5 py-4 font-bold text-slate-900 outline-none placeholder:text-slate-300 text-sm focus:ring-2 focus:ring-brand-500/10 transition-all shadow-inner"
                        />
                      </div>
                    {bookingData.coordinates?.from && (
                      <div className="px-4 py-1.5 bg-brand-50 rounded-lg inline-flex items-center gap-2 border border-brand-100">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse" />
                        <span className="text-[9px] font-black text-brand-600 uppercase tracking-widest">Exact Pickup Set</span>
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 text-slate-400">
                      <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100 shadow-sm">
                        <Navigation className="w-4 h-4 text-slate-400" />
                      </div>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                        Destinations
                      </span>
                    </div>

                    <div className="space-y-3">
                      <div className="flex flex-wrap gap-2">
                        {bookingData.destinations.map((dest, idx) => (
                          <div key={idx} className="bg-brand-50 text-brand-700 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 border border-brand-100">
                            {dest}
                            <button 
                              onClick={() => setBookingData({
                                ...bookingData,
                                destinations: bookingData.destinations.filter((_, i) => i !== idx)
                              })}
                              className="hover:text-red-500 transition-colors"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                      <div className="relative flex gap-2">
                        <input
                          type="text"
                          id="dest-input"
                          placeholder="Add destination..."
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              const input = e.target as HTMLInputElement;
                              const val = input.value.trim();
                              if (val) {
                                setBookingData({
                                  ...bookingData,
                                  destinations: [...bookingData.destinations, val]
                                });
                                input.value = '';
                              }
                            }
                          }}
                          className="flex-1 bg-slate-50 border-none rounded-xl px-5 py-4 font-bold text-slate-900 outline-none placeholder:text-slate-300 text-sm focus:ring-2 focus:ring-brand-500/10 transition-all shadow-inner"
                        />
                        <button
                          onClick={() => {
                            const input = document.getElementById('dest-input') as HTMLInputElement;
                            const val = input.value.trim();
                            if (val) {
                              setBookingData({
                                ...bookingData,
                                destinations: [...bookingData.destinations, val]
                              });
                              input.value = '';
                            }
                          }}
                          className="bg-brand-600 text-white w-12 h-12 rounded-xl flex items-center justify-center hover:bg-brand-700 transition-all shadow-lg shadow-brand-100 shrink-0"
                        >
                          <ArrowRight className="w-5 h-5" />
                        </button>
                        <div className="absolute right-16 top-1/2 -translate-y-1/2 text-[9px] font-black text-slate-300 uppercase tracking-widest pointer-events-none hidden sm:block">
                          Press Enter
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Logistics */}
                <div className="space-y-6 lg:border-l lg:border-slate-50 lg:pl-12">
                  <AnimatePresence mode="wait">
                    {isSelectionComplete ? (
                      <motion.div
                        key="logistics-visible"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-6"
                      >
                        {/* Vehicle Selection */}
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-slate-400">
                              <Users className="w-3.5 h-3.5" />
                              <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Vehicle Type</span>
                            </div>
                            <span className="text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider bg-amber-50 text-amber-600 border border-amber-100">
                              Fixed Daily Rate
                            </span>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="relative">
                              <select
                                className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 font-bold text-slate-900 outline-none appearance-none cursor-pointer text-sm focus:ring-2 focus:ring-brand-500/10 transition-all"
                                value={bookingData.carType}
                                onChange={(e) => setBookingData({ ...bookingData, carType: e.target.value as any })}
                              >
                                {Object.entries(VEHICLE_RATES).map(([car, rates]) => (
                                  <option key={car} value={car}>{car} (Starts ₹{rates.dayRate.toLocaleString()})</option>
                                ))}
                              </select>
                              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                <ArrowRight className="w-3 h-3 rotate-90" />
                              </div>
                            </div>

                            <div className="relative">
                              <select
                                className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 font-bold text-slate-900 outline-none appearance-none cursor-pointer text-sm focus:ring-2 focus:ring-brand-500/10 transition-all"
                                value={bookingData.days}
                                onChange={(e) => setBookingData({ ...bookingData, days: parseInt(e.target.value) })}
                              >
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(d => (
                                  <option key={d} value={d}>{d} {d === 1 ? 'Day' : 'Days'}</option>
                                ))}
                              </select>
                              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                <ArrowRight className="w-3 h-3 rotate-90" />
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Date & Time */}
                        <div className="grid grid-cols-1 gap-6">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-slate-400">
                              <Calendar className="w-3.5 h-3.5" />
                              <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Date</span>
                            </div>
                            <div className="relative group">
                              <div className={cn(
                                "w-full bg-slate-50 border-none rounded-xl px-4 py-3 font-bold text-sm min-h-[44px] flex items-center group-hover:bg-slate-100 transition-all",
                                bookingData.date ? "text-slate-900" : "text-slate-300"
                              )}>
                                {formatDate(bookingData.date)}
                              </div>
                              <input
                                type="date"
                                min={new Date().toISOString().split('T')[0]}
                                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                                value={bookingData.date}
                                onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
                              />
                              <ArrowRight className="w-3 h-3 absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 rotate-90 pointer-events-none" />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-slate-400">
                              <Clock className="w-3.5 h-3.5" />
                              <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Time (Optional)</span>
                            </div>
                            <div className="relative group">
                              <div className={cn(
                                "w-full bg-slate-50 border-none rounded-xl px-4 py-3 font-bold text-sm min-h-[44px] flex items-center group-hover:bg-slate-100 transition-all",
                                bookingData.time ? "text-slate-900" : "text-slate-300"
                              )}>
                                {bookingData.time ? formatTime(bookingData.time) : 'Select Time'}
                              </div>
                              <input
                                type="time"
                                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                                value={bookingData.time}
                                onChange={(e) => setBookingData({ ...bookingData, time: e.target.value })}
                              />
                              <ArrowRight className="w-3 h-3 absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 rotate-90 pointer-events-none" />
                            </div>
                          </div>
                        </div>

                        <motion.button 
                          whileHover={{ scale: 1.01, y: -2 }}
                          whileTap={{ scale: 0.99 }}
                          onClick={handleWhatsAppBook}
                          disabled={isBooking}
                          className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white px-6 py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-3 shadow-xl shadow-green-100 disabled:opacity-50 min-h-[60px]"
                        >
                          {isBooking ? (
                            <div className="flex items-center gap-3">
                              <div className="flex gap-1">
                                {[0, 1, 2].map((i) => (
                                  <motion.div
                                    key={i}
                                    animate={{ 
                                      scale: [1, 1.5, 1],
                                      opacity: [0.5, 1, 0.5]
                                    }}
                                    transition={{ 
                                      duration: 0.6, 
                                      repeat: Infinity, 
                                      delay: i * 0.2 
                                    }}
                                    className="w-1.5 h-1.5 bg-white rounded-full"
                                  />
                                ))}
                              </div>
                              <span className="text-sm tracking-widest uppercase font-black animate-pulse">Connecting...</span>
                            </div>
                          ) : (
                            <>
                              <MessageCircle className="w-5 h-5" />
                              Confirm on WhatsApp
                            </>
                          )}
                        </motion.button>


                        <div className="pt-4 flex items-center gap-4">
                          <div className="h-px flex-1 bg-slate-100" />
                          <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">Or</span>
                          <div className="h-px flex-1 bg-slate-100" />
                        </div>

                        <button 
                          onClick={() => window.open('https://wa.me/916003031569?text=Hi! I want to skip the form and book directly.', '_blank')}
                          className="w-full py-4 rounded-2xl border-2 border-slate-100 hover:border-brand-200 text-slate-500 hover:text-brand-600 font-bold text-sm transition-all flex items-center justify-center gap-2 group"
                        >
                          <MessageCircle className="w-4 h-4" />
                          Skip the form? Talk to us
                        </button>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="logistics-hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="h-full flex flex-col items-center justify-center text-center p-6 rounded-[2rem] bg-gradient-to-b from-slate-50/50 to-white border border-slate-100 relative overflow-hidden group min-h-[320px]"
                      >
                        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]" />
                        </div>

                        <div className="relative z-10">
                          <div className="w-12 h-12 rounded-2xl bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex items-center justify-center mb-3 mx-auto border border-slate-50 group-hover:scale-110 transition-transform duration-500">
                            <Navigation className="w-5 h-5 text-brand-600" />
                          </div>
                          
                          <h4 className="text-base font-black text-slate-900 mb-1 tracking-tight">Your Journey Starts Here</h4>
                          <p className="text-[11px] text-slate-400 font-medium mb-4 max-w-[180px] mx-auto leading-relaxed">
                            Add your tour destinations to unlock premium vehicle options.
                          </p>
                          
                          
                          <div className="w-full space-y-3">
                            <div className="flex items-center gap-3">
                              <div className="h-px flex-1 bg-slate-100" />
                              <span className="text-[9px] font-black text-slate-300 uppercase tracking-[0.2em]">Quick Connect</span>
                              <div className="h-px flex-1 bg-slate-100" />
                            </div>
                            
                            <div className="flex gap-2">
                              <a 
                                href="tel:+916003031569"
                                className="flex-1 py-3 rounded-xl bg-white border border-slate-100 text-slate-600 text-[10px] font-bold flex items-center justify-center gap-2 hover:border-brand-200 hover:text-brand-600 hover:shadow-lg hover:shadow-brand-500/5 transition-all"
                              >
                                <Phone className="w-3.5 h-3.5" />
                                Call Us
                              </a>
                              <a 
                                href="https://wa.me/916003031569"
                                target="_blank"
                                rel="noreferrer"
                                className="flex-1 py-3 rounded-xl bg-brand-600 text-white text-[10px] font-bold flex items-center justify-center gap-2 hover:bg-brand-700 shadow-lg shadow-brand-500/20 transition-all"
                              >
                                <MessageCircle className="w-3.5 h-3.5" />
                                WhatsApp
                              </a>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
        </AnimatePresence>
      </div>

      {error && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 p-4 rounded-2xl bg-red-50 border border-red-100 text-red-600 text-xs text-center font-bold"
        >
          {error}
        </motion.div>
      )}
    </div>
  );
}
