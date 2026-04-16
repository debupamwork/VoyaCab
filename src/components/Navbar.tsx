import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Compass, MapPin, Phone, Calendar } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { useLanguage } from '../contexts/LanguageContext';

export default function Navbar({ activeTab = 'home' }: { activeTab?: string }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t('nav.home'), href: '#' },
    { name: 'Fleet', href: '#fleet' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4',
        isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-3' : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="bg-brand-600 p-2.5 rounded-xl shadow-lg shadow-brand-500/20 rotate-3 group-hover:rotate-0 transition-transform">
            <Compass className="text-white w-7 h-7" />
          </div>
          <span className={cn(
            "text-3xl font-display font-black tracking-tighter transition-colors",
            (isScrolled || activeTab !== 'home') ? "text-slate-900" : "text-white"
          )}>
            Voya<span className={cn(
              "transition-colors",
              (isScrolled || activeTab !== 'home') ? "text-brand-600" : "text-brand-200"
            )}>Cab</span>
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={cn(
                "text-sm font-semibold transition-colors",
                isScrolled ? "text-slate-700 hover:text-brand-600" : "text-white/90 hover:text-white"
              )}
            >
              {link.name}
            </a>
          ))}
          <button 
            onClick={() => {
              const heroSection = document.getElementById('hero');
              if (heroSection) heroSection.scrollIntoView({ behavior: 'smooth' });
            }}
            className={cn(
              "px-6 py-2.5 rounded-xl text-sm font-bold transition-all transform hover:scale-105 active:scale-95 shadow-lg",
              isScrolled || activeTab === 'home'
                ? "bg-brand-600 hover:bg-brand-700 text-white shadow-brand-100"
                : "bg-white text-brand-600 hover:bg-slate-50 shadow-black/10"
            )}
          >
            {t('nav.bookNow')}
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          className={cn(
            "md:hidden p-2 transition-colors",
            (isScrolled || activeTab !== 'home') ? "text-slate-900" : "text-white"
          )}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white shadow-xl border-t border-slate-100 p-6 md:hidden"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-slate-600 font-medium hover:text-brand-600 transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
