import React from 'react';
import { motion } from 'motion/react';
import BookingHub from './BookingHub';

export default function Hero() {
  return (
    <div id="hero" className="relative flex flex-col items-center justify-center pt-24 pb-20 overflow-hidden bg-slate-900">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=2070" 
          alt="North East Scenery" 
          className="w-full h-full object-cover opacity-90"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/20 to-slate-50" />
      </div>

      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 mb-12 text-center">
        {/* Heading and content moved to BookingHub for better flow */}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full"
      >
        <BookingHub />
      </motion.div>
    </div>
  );
}
