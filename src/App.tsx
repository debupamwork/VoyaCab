import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Fleet from './components/Fleet';
import AIPlanner from './components/AIPlanner';
import Footer from './components/Footer';
import QuickBookWidget from './components/QuickBookWidget';
import { motion, useScroll, useSpring } from 'motion/react';
import { Car } from './constants';
import { LanguageProvider } from './contexts/LanguageContext';

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const handleSelectCar = (car: Car) => {
    const message = `*New Booking Inquiry - Voya Cab*%0A%0A` +
      `*Vehicle:* ${car.name}%0A` +
      `*Rate:* ${car.priceDisplay}`;

    const whatsappUrl = `https://wa.me/916003031569?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <LanguageProvider>
      <div className="relative">
        {/* Progress Bar */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-brand-500 z-[60] origin-left"
          style={{ scaleX }}
        />

        <Navbar activeTab="home" />
        
        <main>
          <Hero />
          <AIPlanner />
          <Fleet onSelectCar={handleSelectCar} />
        </main>

        <Footer />
        <QuickBookWidget />
      </div>
    </LanguageProvider>
  );
}
