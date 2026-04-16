import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, Luggage, ShieldCheck, Zap, MapPin, Star, ArrowRight, 
  Car as CarIcon, UserCheck, Hotel, Utensils, Info 
} from 'lucide-react';
import { CARS, Car, DESTINATIONS } from '@/src/constants';
import { cn } from '@/src/lib/utils';
import { useLanguage } from '../contexts/LanguageContext';

interface FleetProps {
  onSelectCar: (car: Car) => void;
  highlightedType?: string;
}

export default function Fleet({ onSelectCar, highlightedType }: FleetProps) {
  const { language, t } = useLanguage();
  const [view, setView] = useState<'packages' | 'fleet'>('fleet');
  const [carTypeFilter, setCarTypeFilter] = useState<string>('All');

  const carTypes = ['All', 'Dzire', 'Innova', 'Traveller', 'Urbania'];

  const filteredCars = carTypeFilter === 'All' 
    ? CARS 
    : CARS.filter(car => car.type === carTypeFilter);

  useEffect(() => {
    if (highlightedType && carTypes.includes(highlightedType)) {
      setCarTypeFilter(highlightedType);
    }
  }, [highlightedType]);

  const popularPackages = [
    {
      id: 'meghalaya',
      title: 'Meghalaya',
      subtitle: 'The Abode of Clouds',
      description: 'A curated journey through mist-covered hills, crystal rivers, and ancient root bridges.',
      highlights: ['Private Boat in Dawki', 'Luxury Resort Stays', 'Root Bridge Trek'],
      price: 'Enquire for Best Deals',
      duration: '5 Days / 4 Nights',
      image: 'https://images.unsplash.com/photo-1505144808419-1957a94ca61e?auto=format&fit=crop&q=80&w=1200',
      accent: 'bg-blue-500'
    },
    {
      id: 'assam',
      title: 'Assam',
      subtitle: 'The Land of Red River',
      description: 'Experience the wild heart of India with private safaris and heritage tea bungalow stays.',
      highlights: ['Private Jeep Safari', 'Tea Garden Walk', 'River Cruise'],
      price: 'Enquire for Best Deals',
      duration: '4 Days / 3 Nights',
      image: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&q=80&w=1200',
      accent: 'bg-emerald-500'
    },
    {
      id: 'arunachal',
      title: 'Arunachal',
      subtitle: 'The Mystical Frontier',
      description: 'A high-altitude expedition to the land of rising sun and ancient monasteries.',
      highlights: ['Monastery Visit', 'Sela Pass Drive', 'Cultural Immersion'],
      price: 'Enquire for Best Deals',
      duration: '7 Days / 6 Nights',
      image: 'https://images.unsplash.com/photo-1548678967-f1fa5d9be67c?auto=format&fit=crop&q=80&w=1200',
      accent: 'bg-orange-500'
    }
  ];

  return (
    <section id="fleet" className="py-24 bg-slate-50/50 relative overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-brand-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center mb-20">
          <div className="flex bg-white p-2 rounded-[2rem] w-full max-w-md shadow-2xl shadow-slate-200/50 border border-slate-100">
            <button
              onClick={() => setView('fleet')}
              className={cn(
                "flex-1 py-4 rounded-[1.5rem] text-xs font-black uppercase tracking-[0.2em] transition-all duration-500",
                view === 'fleet' 
                  ? "bg-brand-600 text-white shadow-xl shadow-brand-100" 
                  : "text-slate-400 hover:text-slate-600"
              )}
            >
              Our Fleet
            </button>
            <button
              onClick={() => setView('packages')}
              className={cn(
                "flex-1 py-4 rounded-[1.5rem] text-xs font-black uppercase tracking-[0.2em] transition-all duration-500",
                view === 'packages' 
                  ? "bg-brand-600 text-white shadow-xl shadow-brand-100" 
                  : "text-slate-400 hover:text-slate-600"
              )}
            >
              Tour Packages
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {view === 'packages' ? (
            <motion.div
              key="packages-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-16"
            >
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="max-w-2xl">
                  <h2 className="text-5xl md:text-7xl font-playfair italic font-medium text-slate-900 mb-6 leading-[0.9]">
                    Curated <br /> Experiences
                  </h2>
                  <p className="text-slate-500 font-medium text-lg max-w-lg">
                    Hand-picked journeys designed for the discerning traveler. 
                    Luxury meets adventure in the heart of North East India.
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center text-slate-400">
                    <ArrowRight className="w-5 h-5 rotate-180" />
                  </div>
                  <div className="w-12 h-12 rounded-full border border-brand-500 flex items-center justify-center text-brand-600">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {popularPackages.map((pkg, index) => (
                  <motion.div
                    key={pkg.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className={cn(
                      "group relative rounded-[3rem] overflow-hidden bg-white border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-700",
                      index === 0 ? "lg:col-span-7 h-[600px]" : 
                      index === 1 ? "lg:col-span-5 h-[600px]" : 
                      "lg:col-span-12 h-[500px]"
                    )}
                  >
                    {/* Background Image */}
                    <div className="absolute inset-0">
                      <img 
                        src={pkg.image} 
                        alt={pkg.title}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                    </div>

                    {/* Content Overlay */}
                    <div className="absolute inset-0 p-10 md:p-16 flex flex-col justify-end">
                      <div className="max-w-2xl">
                        <div className="flex items-center gap-3 mb-6">
                          <span className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10px] font-black text-white uppercase tracking-[0.2em]">
                            {pkg.duration}
                          </span>
                          <div className={cn("w-2 h-2 rounded-full", pkg.accent)} />
                        </div>

                        <h3 className="text-4xl md:text-6xl font-playfair text-white font-medium mb-4 leading-none">
                          {pkg.title}
                        </h3>
                        <p className="text-white/70 text-lg font-medium mb-8 max-w-lg line-clamp-2">
                          {pkg.description}
                        </p>

                        <div className="flex flex-wrap gap-3 mb-10">
                          {pkg.highlights.map((h, i) => (
                            <span key={i} className="text-[10px] font-bold uppercase tracking-widest text-white/50 border border-white/10 px-3 py-1.5 rounded-lg">
                              {h}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center justify-between pt-8 border-t border-white/10">
                          <div>
                            <span className="text-white/40 text-[10px] uppercase font-black tracking-widest block mb-1">Inquiry</span>
                            <div className="text-2xl font-black text-white tracking-tight">{pkg.price}</div>
                          </div>
                          
                          <motion.button 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                              const message = `*Luxury Inquiry for ${pkg.title}*%0A%0A*Duration:* ${pkg.duration}%0A*Request:* I'm interested in this curated experience.`;
                              window.open(`https://wa.me/916003031569?text=${message}`, '_blank');
                            }}
                            className="bg-white text-slate-900 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-brand-500 hover:text-white transition-all shadow-xl"
                          >
                            Enquire Now
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="fleet-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-12"
            >
              {/* Car Type Filter */}
              <div className="flex flex-wrap justify-center gap-3">
                {carTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => setCarTypeFilter(type)}
                    className={cn(
                      "px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-300 border",
                      carTypeFilter === type
                        ? "bg-brand-600 text-white border-brand-600 shadow-lg shadow-brand-100"
                        : "bg-white text-slate-400 border-slate-100 hover:border-brand-200 hover:text-slate-600"
                    )}
                  >
                    {type}
                  </button>
                ))}
              </div>

              <motion.div
                key="fleet-grid"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
              >
                {filteredCars.map((car, index) => (
                <motion.div
                  key={car.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={cn(
                    "group bg-white rounded-[2.5rem] p-10 border transition-all duration-700 flex flex-col justify-between relative overflow-hidden",
                    highlightedType === car.type 
                      ? "border-brand-500 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] ring-4 ring-brand-500/5" 
                      : "border-slate-100 hover:shadow-2xl hover:border-brand-100"
                  )}
                >
                  {/* Decorative Icon Background */}
                  <div className="absolute -top-10 -right-10 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity pointer-events-none">
                    <CarIcon className="w-40 h-40 rotate-12" />
                  </div>

                  <div className="relative z-10">
                    <div className="mb-10">
                      <div className={cn(
                        "inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-4",
                        highlightedType === car.type ? "bg-brand-600 text-white" : "bg-brand-50 text-brand-600"
                      )}>
                        <Zap className="w-3 h-3" />
                        {car.type}
                      </div>
                      <h3 className="text-3xl font-black text-slate-900 tracking-tight leading-none mb-2">{car.name}</h3>
                      <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Premium Class</p>
                    </div>
                    
                    <div className="space-y-5 mb-12">
                      <div className="flex items-center gap-4 text-slate-600">
                        <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100">
                          <Users className="w-4 h-4 text-brand-600" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Capacity</span>
                          <span className="text-sm font-bold text-slate-900">{car.capacity} Passengers</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-slate-600">
                        <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100">
                          <ShieldCheck className="w-4 h-4 text-brand-600" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Safety</span>
                          <span className="text-sm font-bold text-slate-900">Fully Insured</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-8 border-t border-slate-50 relative z-10">
                    <div className="mb-8">
                      <span className="text-slate-400 text-[10px] uppercase font-black tracking-widest block mb-2">Pricing</span>
                      <div className="text-xl font-black text-slate-900 tracking-tight">
                        {car.priceDisplay}
                      </div>
                    </div>
                    
                    <motion.button 
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => onSelectCar(car)}
                      className="w-full bg-brand-600 hover:bg-brand-700 text-white py-5 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-brand-100 transition-all flex items-center justify-center gap-3 group/btn"
                    >
                      {t('fleet.bookNow')}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
        </AnimatePresence>

        {/* Creative Service Details Note moved to bottom */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 w-full max-w-4xl mx-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Included Section */}
            <div className="relative group">
              <div className="absolute inset-0 bg-brand-600 rounded-[2.5rem] blur-3xl opacity-5 group-hover:opacity-10 transition-opacity" />
              <div className="relative bg-white rounded-[2.5rem] border border-brand-100 p-8 h-full shadow-sm hover:shadow-xl hover:shadow-brand-100/10 transition-all duration-500">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-brand-600 flex items-center justify-center shadow-lg shadow-brand-100">
                      <ShieldCheck className="w-5 h-5 text-white" />
                    </div>
                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-600">VoyaCab Provides</h4>
                  </div>
                  <div className="px-3 py-1 rounded-full bg-brand-50 text-[9px] font-black text-brand-600 uppercase tracking-widest border border-brand-100">
                    Included
                  </div>
                </div>
                
                <ul className="space-y-5">
                  <li className="flex items-center gap-4 group/item">
                    <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center group-hover/item:bg-brand-600 group-hover/item:text-white transition-colors">
                      <CarIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="block text-sm font-bold text-slate-900">Premium Vehicle & Fuel</span>
                      <span className="text-[10px] text-slate-400 font-medium">Meticulously maintained fleet</span>
                    </div>
                  </li>
                  <li className="flex items-center gap-4 group/item">
                    <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center group-hover/item:bg-brand-600 group-hover/item:text-white transition-colors">
                      <UserCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="block text-sm font-bold text-slate-900">Professional Driver</span>
                      <span className="text-[10px] text-slate-400 font-medium">Experienced & verified experts</span>
                    </div>
                  </li>
                  <li className="flex items-center gap-4 group/item">
                    <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center group-hover/item:bg-brand-600 group-hover/item:text-white transition-colors">
                      <Star className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="block text-sm font-bold text-slate-900">Driver's Boarding & Lodging (D&B)</span>
                      <span className="text-[10px] text-brand-600 font-black uppercase tracking-wider">Zero cost to you</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* Excluded Section */}
            <div className="relative group">
              <div className="relative bg-slate-50/50 rounded-[2.5rem] border border-slate-100 p-8 h-full hover:bg-white transition-all duration-500">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
                      <Info className="w-5 h-5 text-slate-400" />
                    </div>
                    <div>
                      <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Traveller's Expense</h4>
                      <p className="text-[9px] text-slate-400 font-bold mt-0.5">Not included in fare</p>
                    </div>
                  </div>
                  <div className="px-3 py-1 rounded-full bg-red-50 text-[9px] font-black text-red-500 uppercase tracking-widest border border-red-100">
                    Not Included
                  </div>
                </div>
                
                <ul className="space-y-5">
                  <li className="flex items-center gap-4 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all">
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center border border-slate-100">
                      <Hotel className="w-5 h-5 text-slate-400" />
                    </div>
                    <div>
                      <span className="block text-sm font-bold text-slate-600">Your Stay / Accommodation</span>
                      <span className="text-[10px] text-slate-400 font-medium italic">To be paid by you directly</span>
                    </div>
                  </li>
                  <li className="flex items-center gap-4 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all">
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center border border-slate-100">
                      <Utensils className="w-5 h-5 text-slate-400" />
                    </div>
                    <div>
                      <span className="block text-sm font-bold text-slate-600">Your Fooding / Meals</span>
                      <span className="text-[10px] text-slate-400 font-medium italic">To be paid by you directly</span>
                    </div>
                  </li>
                  <li className="flex items-center gap-4 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all">
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center border border-slate-100">
                      <MapPin className="w-5 h-5 text-slate-400" />
                    </div>
                    <div>
                      <span className="block text-sm font-bold text-slate-600">Entry Fees & Personal Spends</span>
                      <span className="text-[10px] text-slate-400 font-medium italic">To be paid by you directly</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
