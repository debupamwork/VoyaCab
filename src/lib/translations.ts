export type Language = 'en';

export const translations = {
  en: {
    'nav.home': 'Home',
    'nav.bookings': 'Bookings',
    'nav.profile': 'Profile',
    'nav.bookNow': 'Book Now',
    
    'hero.title': 'Premium Cabs in Northeast India',
    'hero.subtitle': 'Experience the beauty of Assam and Meghalaya with our luxury fleet and professional drivers.',
    'hero.bookAirport': 'Book Airport Transfer',
    'hero.planPackage': 'Plan Tour Package',
    'hero.bookRide': 'Book Your Ride',
    
    'ai.title': 'AI Trip Planner',
    'ai.heading': 'Type the place you want to go with how many people.',
    'ai.subtitle': 'I will prepare the best places you can visit.',
    'ai.placeholder': 'e.g., A 3-day trip to Meghalaya focusing on waterfalls',
    'ai.button': 'Plan My Trip',
    'ai.planning': 'Planning your adventure...',
    'ai.resultTitle': 'Your Itinerary',
    'ai.stay': 'Stay',
    'ai.vehicle': 'Recommended Vehicle',
    'ai.travelTime': 'Travel Time',
    
    'fleet.title': 'Our Premium Fleet',
    'fleet.subtitle': 'Choose from our selection of well-maintained, comfortable vehicles.',
    'fleet.passengers': 'Passengers',
    'fleet.luggage': 'Luggage',
    'fleet.bookNow': 'Book Now',
    
    'footer.desc': 'Your trusted travel partner in Northeast India. Premium cabs, professional drivers, and unforgettable experiences.',
    'footer.quickLinks': 'Quick Links',
    'footer.contact': 'Contact Us',
    'footer.switchLang': 'Switch Language',
    
    'bottomNav.home': 'Home',
    'bottomNav.bookings': 'Bookings',
    'bottomNav.profile': 'Profile',
  }
};

export type TranslationKey = keyof typeof translations.en;
