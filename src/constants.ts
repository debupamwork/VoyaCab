export interface Car {
  id: string;
  name: string;
  type: 'Dzire' | 'Innova' | 'Traveller' | 'Urbania';
  capacity: number;
  pricePerKm: number;
  priceDisplay: string;
  image: string;
  description: string;
}

export interface Destination {
  id: string;
  name: string;
  state: 'Assam' | 'Meghalaya' | 'Arunachal Pradesh';
  image: string;
  description: string;
}

export const CARS: Car[] = [
  {
    id: 'dzire',
    name: 'Swift Dzire',
    type: 'Dzire',
    capacity: 4,
    pricePerKm: 20,
    priceDisplay: '₹3,500 / Day',
    image: 'https://images.unsplash.com/photo-1605515298946-d062f2e9da53?auto=format&fit=crop&q=80&w=800',
    description: 'Perfect for small families or solo travelers. Comfortable and fuel-efficient for city and highway trips.'
  },
  {
    id: 'innova',
    name: 'Innova Crysta',
    type: 'Innova',
    capacity: 7,
    pricePerKm: 30,
    priceDisplay: '₹7,000 / Day',
    image: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&q=80&w=800',
    description: 'The gold standard for long-distance travel. Spacious, powerful, and extremely comfortable for groups.'
  },
  {
    id: 'traveller',
    name: 'Force Traveller',
    type: 'Traveller',
    capacity: 12,
    pricePerKm: 40,
    priceDisplay: '₹9,000 / Day',
    image: 'https://images.unsplash.com/photo-1530521954074-e64f6810b32d?auto=format&fit=crop&q=80&w=800',
    description: 'Ideal for large groups, corporate outings, or extended family vacations. Maximum space and comfort.'
  },
  {
    id: 'urbania',
    name: 'Force Urbania',
    type: 'Urbania',
    capacity: 10,
    pricePerKm: 50,
    priceDisplay: '₹14,999 / Day',
    image: 'https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?auto=format&fit=crop&q=80&w=800',
    description: 'Premium luxury van for executive travel and high-end group tours. Superior comfort and safety.'
  }
];

export const DESTINATIONS: Destination[] = [
  // Assam
  {
    id: 'assam-package',
    name: 'Assam Tourist Package',
    state: 'Assam',
    image: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&q=80&w=800',
    description: 'Complete tour of Assam\'s heritage and wildlife.'
  },
  {
    id: 'kamakhya',
    name: 'Maa Kamakhya Temple',
    state: 'Assam',
    image: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&q=80&w=800',
    description: 'One of the oldest and most revered Shakti Peethas.'
  },
  {
    id: 'kaziranga',
    name: 'Kaziranga National Park',
    state: 'Assam',
    image: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&q=80&w=800',
    description: 'Home to the one-horned rhinoceros and diverse wildlife.'
  },
  {
    id: 'majuli',
    name: 'Majuli Island',
    state: 'Assam',
    image: 'https://images.unsplash.com/photo-1624138784614-87fd1b6528f2?auto=format&fit=crop&q=80&w=800',
    description: 'The world\'s largest river island and cultural hub of Assam.'
  },
  {
    id: 'manas',
    name: 'Manas National Park',
    state: 'Assam',
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=800',
    description: 'A UNESCO World Heritage site known for its biodiversity.'
  },
  {
    id: 'tezpur',
    name: 'Tezpur',
    state: 'Assam',
    image: 'https://images.unsplash.com/photo-1612438214708-f428a707dd4e?auto=format&fit=crop&q=80&w=800',
    description: 'The City of Eternal Romance with beautiful parks and temples.'
  },
  {
    id: 'sivasagar',
    name: 'Sivasagar',
    state: 'Assam',
    image: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&q=80&w=800',
    description: 'Historical city with Ahom era monuments and temples.'
  },
  // Meghalaya
  {
    id: 'meghalaya-package',
    name: 'Meghalaya Tourist Package',
    state: 'Meghalaya',
    image: 'https://images.unsplash.com/photo-1505144808419-1957a94ca61e?auto=format&fit=crop&q=80&w=800',
    description: 'Explore the clouds, waterfalls, and root bridges of Meghalaya.'
  },
  {
    id: 'shillong',
    name: 'Shillong',
    state: 'Meghalaya',
    image: 'https://images.unsplash.com/photo-1612438214708-f428a707dd4e?auto=format&fit=crop&q=80&w=800',
    description: 'The Scotland of the East, famous for its hills and waterfalls.'
  },
  {
    id: 'dawki',
    name: 'Dawki (Umngot River)',
    state: 'Meghalaya',
    image: 'https://images.unsplash.com/photo-1505144808419-1957a94ca61e?auto=format&fit=crop&q=80&w=800',
    description: 'Famous for the crystal clear Umngot River.'
  },
  {
    id: 'cherrapunji',
    name: 'Cherrapunji (Sohra)',
    state: 'Meghalaya',
    image: 'https://images.unsplash.com/photo-1505144808419-1957a94ca61e?auto=format&fit=crop&q=80&w=800',
    description: 'One of the wettest places on earth with living root bridges.'
  },
  {
    id: 'mawlynnong',
    name: 'Mawlynnong Village',
    state: 'Meghalaya',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=800',
    description: 'Known as the cleanest village in Asia.'
  },
  {
    id: 'laitlum',
    name: 'Laitlum Canyons',
    state: 'Meghalaya',
    image: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&q=80&w=800',
    description: 'Breathtaking panoramic views of the deep gorges.'
  },
  {
    id: 'jowai',
    name: 'Jowai',
    state: 'Meghalaya',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800',
    description: 'Known for its beautiful monoliths and Tyrshi Falls.'
  },
  // Arunachal Pradesh
  {
    id: 'arunachal-package',
    name: 'Arunachal Pradesh Tourist Package',
    state: 'Arunachal Pradesh',
    image: 'https://images.unsplash.com/photo-1548678967-f1fa5d9be67c?auto=format&fit=crop&q=80&w=800',
    description: 'Experience the mystical monasteries and valleys of Arunachal.'
  },
  {
    id: 'tawang',
    name: 'Tawang Monastery',
    state: 'Arunachal Pradesh',
    image: 'https://images.unsplash.com/photo-1548678967-f1fa5d9be67c?auto=format&fit=crop&q=80&w=800',
    description: 'Breathtaking monasteries and high-altitude lakes.'
  },
  {
    id: 'ziro',
    name: 'Ziro Valley',
    state: 'Arunachal Pradesh',
    image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=800',
    description: 'A beautiful valley known for its unique culture and music festival.'
  },
  {
    id: 'bomdila',
    name: 'Bomdila',
    state: 'Arunachal Pradesh',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=800',
    description: 'A picturesque town with apple orchards and monasteries.'
  },
  {
    id: 'dirang',
    name: 'Dirang Valley',
    state: 'Arunachal Pradesh',
    image: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&q=80&w=800',
    description: 'Known for its hot springs and beautiful landscapes.'
  },
  {
    id: 'pasighat',
    name: 'Pasighat',
    state: 'Arunachal Pradesh',
    image: 'https://images.unsplash.com/photo-1624138784614-87fd1b6528f2?auto=format&fit=crop&q=80&w=800',
    description: 'The oldest town of Arunachal Pradesh on the banks of Siang River.'
  },
  {
    id: 'namsai',
    name: 'Namsai (Golden Pagoda)',
    state: 'Arunachal Pradesh',
    image: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&q=80&w=800',
    description: 'Home to the beautiful Golden Pagoda.'
  }
];
