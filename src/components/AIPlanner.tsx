import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MapPin, Calendar, Users, ChevronRight, Send, Clock, MessageSquare, ArrowRight,
  Wand2, Circle, Headset, Sparkles, Car, Minimize2, Maximize2
} from 'lucide-react';
import { GoogleGenAI, ThinkingLevel } from "@google/genai";
import { formatDate, formatTime, cn } from '../lib/utils';
import { useLanguage } from '../contexts/LanguageContext';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export default function AIPlanner() {
  const { language, t } = useLanguage();
  const [bookingData, setBookingData] = useState({
    from: 'Guwahati',
    prompt: '',
    date: '',
    time: '',
    carType: 'Dzire',
    dietary: 'Any',
    activityLevel: 'Moderate',
    interests: [] as string[]
  });

  const [itinerary, setItinerary] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [placeholder, setPlaceholder] = useState('');
  const [isMinimized, setIsMinimized] = useState(true);

  useEffect(() => {
    const prompts = [
      "I want to explore Meghalaya for 5 days...",
      "Plan a wildlife tour in Assam...",
      "7 days adventure in Arunachal Pradesh...",
      "Romantic getaway in Cherrapunji...",
      "Cultural tour of Majuli Island..."
    ];
    let promptIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let timeout: NodeJS.Timeout;

    const type = () => {
      const currentPrompt = prompts[promptIndex];
      
      if (isDeleting) {
        setPlaceholder(currentPrompt.substring(0, charIndex - 1));
        charIndex--;
      } else {
        setPlaceholder(currentPrompt.substring(0, charIndex + 1));
        charIndex++;
      }

      let typeSpeed = isDeleting ? 30 : 100;

      if (!isDeleting && charIndex === currentPrompt.length) {
        isDeleting = true;
        typeSpeed = 3000;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        promptIndex = (promptIndex + 1) % prompts.length;
        typeSpeed = 500;
      }

      timeout = setTimeout(type, typeSpeed);
    };

    type();
    return () => clearTimeout(timeout);
  }, [language]);
  const [error, setError] = useState('');
  const [isBooking, setIsBooking] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval: any;
    if (isLoading) {
      setProgress(0);
      interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 98) return prev;
          // Slower progress as it gets closer to 100
          const remaining = 100 - prev;
          const increment = Math.random() * (remaining / 10);
          return Math.min(prev + increment, 98);
        });
      }, 300);
    } else {
      setProgress(100);
      const timeout = setTimeout(() => setProgress(0), 1000);
      return () => clearTimeout(timeout);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  const generateItinerary = async () => {
    if (!bookingData.prompt.trim()) {
      setError('Please describe your trip plan.');
      return;
    }
    setIsLoading(true);
    setError('');
    setItinerary(null);

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3.1-flash-lite-preview",
        contents: `Create a detailed travel itinerary starting from ${bookingData.from}. 
        User Request: "${bookingData.prompt}". 
        Dietary Preferences: ${bookingData.dietary}.
        Target Activity Level: ${bookingData.activityLevel}.
        Specific Interests: ${bookingData.interests.join(', ')}.
        
        Focus on creating a high-quality, engaging travel plan that showcases the best of the region, specifically tailored to their activity level and interests. Suggest local eateries matching their dietary preference.
        
        IMPORTANT: You MUST respond entirely in English language.
        
        Format as JSON:
        {
          "title": "Short Title",
          "summary": "Brief Summary",
          "days": [
            {
              "day": 1, 
              "activities": [
                {
                  "name": "Activity Name/POI", 
                  "description": "Brief description/unique aspect of this POI",
                  "travelTime": "Estimated travel time from previous location"
                }
              ], 
              "stay": "Location",
              "recommendedVehicle": "e.g. SUV, Sedan, etc."
            }
          ]
        }`,
        config: {
          responseMimeType: "application/json",
          thinkingConfig: { thinkingLevel: ThinkingLevel.MINIMAL }
        }
      });
      setItinerary(JSON.parse(response.text || '{}'));
      
      setTimeout(() => {
        const results = document.getElementById('ai-results-section');
        if (results) results.scrollIntoView({ behavior: 'smooth' });
      }, 100);

    } catch (err) {
      setError('Failed to generate plan. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAiBook = () => {
    if (!itinerary) return;
    setIsBooking(true);
    const message = `*VoyaCab AI Tour Inquiry*%0A%0A*Plan:* ${itinerary.title}%0A*Pickup:* ${bookingData.from}%0A*Date:* ${bookingData.date || 'TBD'}%0A*Time:* ${bookingData.time || 'TBD'}%0A*Activity:* ${bookingData.activityLevel}%0A*Dietary:* ${bookingData.dietary}%0A*Interests:* ${bookingData.interests.join(', ')}%0A%0A*Request:* ${bookingData.prompt}`;
    const whatsappUrl = `https://wa.me/916003031569?text=${message}`;
    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
      setIsBooking(false);
    }, 1500);
  };

  return (
    <section id="ai-planner" className="py-12 md:py-24 bg-white relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-50/30 rounded-full blur-[120px] -mr-40 -mt-40 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-slate-50 rounded-full blur-[100px] -ml-20 -mb-20 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* AI Planner Card */}
        <motion.div 
          layout
          initial={false}
          animate={{ 
            opacity: 1
          }}
          className={cn(
            "bg-white rounded-[2rem] md:rounded-[3rem] shadow-[0_40px_80px_-15px_rgba(0,0,0,0.08)] border border-slate-100 overflow-hidden relative transition-all duration-700 ease-in-out",
            isMinimized ? "max-w-xl mx-auto" : "max-w-4xl mx-auto"
          )}
        >
          {/* Minimize/Expand Toggle - Only visible when expanded */}
          {!isMinimized && (
            <button 
              onClick={() => setIsMinimized(true)}
              className="absolute top-6 right-6 md:top-10 md:right-10 z-20 p-3 rounded-2xl bg-slate-50 hover:bg-red-50 text-slate-400 hover:text-red-500 transition-all group shadow-sm"
              title="Minimize Planner"
            >
              <Minimize2 className="w-5 h-5" />
            </button>
          )}

          <div className={cn("transition-all duration-700", isMinimized ? "p-4 md:p-6" : "p-6 md:p-16")}>
            <div className="max-w-3xl mx-auto">
              <AnimatePresence mode="wait">
                {isMinimized ? (
                  <motion.div 
                    key="minimized"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex flex-col sm:flex-row items-center justify-between gap-6"
                  >
                    <div className="flex items-center gap-5">
                      <div className="w-14 h-14 rounded-[1.25rem] bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-xl shadow-brand-200 relative group">
                        <Wand2 className="w-7 h-7 text-white transition-transform group-hover:rotate-12" />
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full border-2 border-white animate-pulse" />
                      </div>
                      <div className="text-left">
                        <h4 className="font-black text-slate-900 text-lg tracking-tight leading-none mb-1">
                          AI Trip Planner
                        </h4>
                        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.15em]">
                          Smart Travel Assistant
                        </p>
                      </div>
                    </div>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setIsMinimized(false)}
                      className="bg-brand-600 hover:bg-brand-700 text-white px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all shadow-lg shadow-brand-100 hover:shadow-brand-200 flex items-center gap-3 group"
                    >
                      Plan Now
                      <Sparkles className="w-4 h-4 text-brand-300 group-hover:text-white transition-colors" />
                    </motion.button>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="expanded"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="flex flex-col gap-12"
                  >
                    <div className="space-y-6 text-center">
                      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-50 text-brand-600 text-[11px] font-black uppercase tracking-[0.2em] mb-2 shadow-sm border border-brand-100/50">
                        <Sparkles className="w-3.5 h-3.5" />
                        {t('ai.title')}
                      </div>
                      <div className="space-y-4">
                        <h3 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-[1.1]">
                          {t('ai.heading')}
                        </h3>
                        <p className="text-slate-500 text-base md:text-lg font-medium max-w-xl mx-auto leading-relaxed">
                          {t('ai.subtitle')}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-2">
                        <div className="flex items-center gap-3 bg-slate-50 px-4 py-2.5 rounded-xl border border-slate-100 flex-1 w-full relative">
                          <MapPin className="w-4 h-4 text-brand-600 shrink-0" />
                          <div className="flex flex-col min-w-0 flex-1">
                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">
                              Starting Point
                            </span>
                            <input
                              type="text"
                              value={bookingData.from}
                              onChange={(e) => setBookingData({ ...bookingData, from: e.target.value })}
                              placeholder="Search location..."
                              className="bg-transparent border-none p-0 text-xs font-bold text-slate-700 outline-none w-full"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Travel Preferences Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-2">
                        {/* Dietary */}
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block pl-2">Dietary preference</label>
                          <select 
                            value={bookingData.dietary}
                            onChange={(e) => setBookingData({ ...bookingData, dietary: e.target.value })}
                            className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-2 text-xs font-bold text-slate-700 outline-none focus:border-brand-300"
                          >
                            <option value="Any">Any Choice</option>
                            <option value="Vegetarian">Vegetarian</option>
                            <option value="Vegan">Vegan</option>
                            <option value="Halal">Halal</option>
                            <option value="Non-Vegetarian">Non-Vegetarian</option>
                          </select>
                        </div>

                        {/* Activity Level */}
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block pl-2">Activity Level</label>
                          <div className="flex bg-slate-50 rounded-xl p-1 border border-slate-100">
                            {['Relaxed', 'Moderate', 'Active'].map((level) => (
                              <button
                                key={level}
                                onClick={() => setBookingData({ ...bookingData, activityLevel: level })}
                                className={cn(
                                  "flex-1 py-1 px-2 rounded-lg text-[10px] font-black transition-all",
                                  bookingData.activityLevel === level 
                                    ? "bg-white text-brand-600 shadow-sm" 
                                    : "text-slate-400 hover:text-slate-600"
                                )}
                              >
                                {level}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Quick Interests */}
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block pl-2">Interests</label>
                          <div className="flex flex-wrap gap-1.5">
                            {['Nature', 'Culture', 'Wildlife', 'Adventure'].map((interest) => (
                              <button
                                key={interest}
                                onClick={() => {
                                  const interests = bookingData.interests.includes(interest)
                                    ? bookingData.interests.filter(i => i !== interest)
                                    : [...bookingData.interests, interest];
                                  setBookingData({ ...bookingData, interests });
                                }}
                                className={cn(
                                  "px-2.5 py-1 rounded-lg text-[9px] font-black border transition-all uppercase tracking-tighter",
                                  bookingData.interests.includes(interest)
                                    ? "bg-brand-50 border-brand-200 text-brand-600"
                                    : "bg-white border-slate-100 text-slate-400 hover:border-slate-300"
                                )}
                              >
                                {interest}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="relative group">
                      {/* Decorative elements for textarea */}
                      <div className="absolute -inset-1 bg-gradient-to-r from-brand-500/20 to-purple-500/20 rounded-[2.5rem] blur opacity-0 group-focus-within:opacity-100 transition duration-1000 group-hover:duration-200" />
                      
                      <div className="relative">
                        <textarea
                          value={bookingData.prompt}
                          onChange={(e) => setBookingData({ ...bookingData, prompt: e.target.value })}
                          placeholder={placeholder ? `e.g. ${placeholder}` : t('ai.placeholder')}
                          className="w-full bg-slate-50/80 backdrop-blur-sm rounded-[2rem] md:rounded-[2.5rem] p-8 md:p-12 font-bold text-slate-900 outline-none placeholder:text-slate-300 text-lg md:text-xl min-h-[180px] md:min-h-[260px] resize-none leading-relaxed focus:bg-white focus:ring-0 transition-all border-2 border-transparent focus:border-brand-100 shadow-[inset_0_2px_10px_rgba(0,0,0,0.02)]"
                        />
                        <div className="absolute bottom-8 right-10 flex items-center gap-4">
                          <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl bg-white/80 border border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-widest shadow-sm">
                            <Clock className="w-3 h-3" />
                            Takes ~10s
                          </div>
                          <Wand2 className="w-6 h-6 md:w-8 md:h-8 text-brand-600/30 group-focus-within:text-brand-600 transition-colors" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <motion.button 
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={generateItinerary}
                        disabled={isLoading}
                        className="w-full bg-brand-600 hover:bg-brand-700 text-white px-8 py-5 md:py-7 rounded-[1.5rem] md:rounded-[2rem] font-black transition-all flex items-center justify-center gap-4 shadow-2xl shadow-brand-200 disabled:opacity-50 text-base md:text-xl group"
                      >
                        {isLoading ? (
                          <div className="flex items-center gap-4">
                            <div className="relative w-8 h-8 flex items-center justify-center">
                              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                                <circle cx="18" cy="18" r="16" fill="none" className="stroke-white/20" strokeWidth="4" />
                                <circle
                                  cx="18" cy="18" r="16" fill="none"
                                  className="stroke-white transition-all duration-300 ease-out"
                                  strokeWidth="4" strokeDasharray="100" strokeDashoffset={100 - progress} strokeLinecap="round"
                                />
                              </svg>
                            </div>
                            <div className="flex flex-col items-start leading-none">
                              <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-70 mb-1">AI Engine Working</span>
                              <div className="flex items-center gap-2">
                                <span className="text-base font-bold animate-pulse">{t('ai.planning')}</span>
                                <span className="text-sm font-mono opacity-60">{Math.round(progress)}%</span>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <>
                            <Wand2 className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                            {t('ai.button')}
                            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </motion.button>

                      <div className="flex flex-col sm:flex-row items-center gap-4">
                        <button 
                          onClick={() => window.open('https://wa.me/916003031569?text=Hi! I want to skip the AI planner and talk to you directly about a special trip.', '_blank')}
                          className="flex-1 w-full py-5 rounded-2xl md:rounded-[1.5rem] border-2 border-slate-100 hover:border-brand-200 text-slate-500 hover:text-brand-600 font-black text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-3 group bg-white hover:bg-brand-50/30"
                        >
                          <Headset className="w-5 h-5" />
                          Talk to Travel Expert
                        </button>
                        
                        <button 
                          onClick={() => setIsMinimized(true)}
                          className="sm:w-auto w-full px-8 py-5 rounded-2xl border-2 border-transparent hover:bg-slate-50 text-slate-400 font-bold text-xs uppercase tracking-widest transition-all"
                        >
                          Maybe Later
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-4 rounded-xl bg-red-50 border border-red-100 text-red-600 text-xs text-center font-bold"
          >
            {error}
          </motion.div>
        )}

        {/* AI Results Display */}
        <AnimatePresence>
          {itinerary && (
            <motion.div
              id="ai-results-section"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-12 space-y-6"
            >
              <div className="bg-white rounded-[2rem] p-5 md:p-10 border-2 border-slate-100 shadow-xl overflow-hidden relative">
                {/* Header Section */}
                <div className="flex flex-col gap-6 mb-10 pb-8 border-b border-slate-50">
                  <div className="space-y-3">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 text-brand-600 text-[10px] font-bold uppercase tracking-widest">
                      {t('ai.resultTitle')}
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight leading-tight">
                      {itinerary.title}
                    </h3>
                    <p className="text-slate-500 text-sm md:text-base leading-relaxed font-medium">
                      {itinerary.summary}
                    </p>
                  </div>
                </div>

                {/* Timeline Section */}
                <div className="space-y-8 relative">
                  {/* Vertical Line */}
                  <div className="absolute left-[15px] top-2 bottom-2 w-0.5 bg-slate-100 hidden sm:block" />
                  
                  {itinerary.days.map((day: any, idx: number) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="relative pl-0 sm:pl-12"
                    >
                      {/* Day Indicator */}
                      <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-brand-600 text-white flex items-center justify-center text-xs font-bold shadow-lg shadow-brand-100 z-10 hidden sm:flex">
                        {day.day}
                      </div>
                      
                      <div className="bg-slate-50/50 rounded-2xl p-5 border border-slate-100 hover:bg-white hover:shadow-md transition-all">
                        <div className="flex items-center gap-3 mb-4 sm:hidden">
                          <div className="w-6 h-6 rounded-full bg-brand-600 text-white flex items-center justify-center text-[10px] font-bold">
                            {day.day}
                          </div>
                          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Day {day.day}</span>
                        </div>
                        
                        <div className="space-y-6 mb-6">
                          {day.activities.map((a: any, i: number) => (
                            <div key={i} className="relative">
                              <div className="flex items-start gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-brand-400 mt-2 shrink-0" />
                                <div className="space-y-1">
                                  <div className="text-slate-900 font-bold text-sm">
                                    {typeof a === 'string' ? a : a.name}
                                  </div>
                                  {typeof a === 'object' && a.description && (
                                    <div className="text-slate-500 text-xs leading-relaxed">
                                      {a.description}
                                    </div>
                                  )}
                                  {typeof a === 'object' && a.travelTime && (
                                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-brand-500 uppercase tracking-wider mt-1">
                                      <Clock className="w-3 h-3" />
                                      {t('ai.travelTime')}: {a.travelTime}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-slate-100/50">
                          <div className="flex items-center gap-2 text-slate-400">
                            <MapPin className="w-3 h-3" />
                            <span className="text-[9px] font-bold uppercase tracking-widest">{t('ai.stay')}: {day.stay}</span>
                          </div>
                          {day.recommendedVehicle && (
                            <div className="flex items-center gap-2 text-slate-400">
                              <Car className="w-3 h-3" />
                              <span className="text-[9px] font-bold uppercase tracking-widest">{t('ai.vehicle')}: {day.recommendedVehicle}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Footer Action */}
                <div className="mt-10">
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={handleAiBook}
                    disabled={isBooking}
                    className="w-full bg-brand-600 hover:bg-brand-700 text-white p-5 rounded-2xl font-bold flex items-center justify-center gap-3 shadow-xl relative overflow-hidden group"
                  >
                    <AnimatePresence>
                      {isBooking && (
                        <motion.div
                          initial={{ x: "-100%" }}
                          animate={{ x: "100%" }}
                          transition={{ duration: 1.5, ease: "easeInOut", repeat: Infinity }}
                          className="absolute inset-0 bg-brand-600/20"
                        />
                      )}
                    </AnimatePresence>
                    
                    <MessageSquare className="w-5 h-5 text-brand-400 group-hover:text-brand-300 transition-colors" /> 
                    <span className="relative z-10">
                      {isBooking ? 'Preparing WhatsApp...' : 'Book This Entire Tour'}
                    </span>
                    <ArrowRight className="w-4 h-4 text-white/50 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                  <p className="text-center text-slate-400 text-[9px] mt-4 font-medium">
                    Secure your vehicle and driver for the entire duration via WhatsApp
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
