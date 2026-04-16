import React from 'react';
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter, Compass, Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function Footer() {
  const { language, toggleLanguage, t } = useLanguage();

  return (
    <footer id="contact" className="bg-slate-900 text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="bg-brand-600 p-2 rounded-xl">
                <Compass className="text-white w-6 h-6" />
              </div>
              <span className="text-2xl font-display font-extrabold tracking-tight">
                Voya<span className="text-brand-400"> Cab.</span>
              </span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              {t('footer.desc')}
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-brand-600 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-brand-600 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-brand-600 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-display font-bold mb-6">{t('footer.quickLinks')}</h4>
            <ul className="space-y-4 text-slate-300">
              <li><a href="#hero" className="hover:text-brand-400 transition-colors">{t('nav.home')}</a></li>
              <li><a href="#fleet" className="hover:text-brand-400 transition-colors">Fleet</a></li>
              <li>
                <a 
                  href="https://wa.me/916003031569?text=Hi%20Voya%20Cab,%20I'd%20like%20to%20know%20more%20about%20your%20Booking%20Policy." 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-brand-400 transition-colors"
                >
                  Booking Policy
                </a>
              </li>
              <li>
                <a 
                  href="https://wa.me/916003031569?text=Hi%20Voya%20Cab,%20I'd%20like%20to%20know%20more%20about%20your%20Privacy%20Policy." 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-brand-400 transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-display font-bold mb-6">Services</h4>
            <ul className="space-y-4 text-slate-300">
              <li>
                <a 
                  href="https://wa.me/916003031569?text=Hi%20Voya%20Cab,%20I'm%20interested%20in%20booking%20a%20Local%20Sightseeing%20tour." 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-brand-400 transition-colors"
                >
                  Local Sightseeing
                </a>
              </li>
              <li>
                <a 
                  href="https://wa.me/916003031569?text=Hi%20Voya%20Cab,%20I'm%20interested%20in%20booking%20an%20Outstation%20Trip." 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-brand-400 transition-colors"
                >
                  Outstation Trips
                </a>
              </li>
              <li>
                <a 
                  href="https://wa.me/916003031569?text=Hi%20Voya%20Cab,%20I'm%20interested%20in%20Corporate%20Car%20Rentals." 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-brand-400 transition-colors"
                >
                  Corporate Rentals
                </a>
              </li>
              <li>
                <a 
                  href="https://wa.me/916003031569?text=Hi%20Voya%20Cab,%20I'm%20interested%20in%20booking%20a%20Wedding%20Car%20Rental." 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-brand-400 transition-colors"
                >
                  Wedding Car Rental
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-display font-bold mb-6">{t('footer.contact')}</h4>
            <ul className="space-y-4 text-slate-300">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-brand-500 shrink-0" />
                <span>GS Road, Guwahati, Assam - 781005</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-brand-500 shrink-0" />
                <a href="tel:+916003031569" className="hover:text-brand-400 transition-colors">
                  +91 60030 31569
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-brand-500 shrink-0" />
                <a href="mailto:contact@voyacab.com" className="hover:text-brand-400 transition-colors">
                  contact@voyacab.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-slate-800 text-center text-slate-500 text-sm">
          <p>© {new Date().getFullYear()} Voya Cab. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
