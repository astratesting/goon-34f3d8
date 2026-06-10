import type {
  BusinessCategory,
  DiscoveredBusiness,
  DiscoverFilters,
  DiscoverResult,
} from './types';

// ─── Realistic Mock Data ───

const MOCK_BUSINESSES: DiscoveredBusiness[] = [
  {
    id: 'biz_001',
    name: "Mario's Plumbing & Drain",
    category: 'plumber',
    location: 'Springfield, IL',
    address: '142 Oak Street, Springfield, IL 62704',
    phone: '(217) 555-0142',
    email: 'mario@sdplumbing.com',
    hasWebsite: false,
    websiteUrl: null,
    rating: 4.7,
    reviewCount: 89,
    yearsInBusiness: 12,
    description: 'Family-owned plumbing business serving Springfield for over a decade. Specializing in emergency repairs, drain cleaning, and water heater installation.',
    discoveredAt: '2025-12-01T10:00:00Z',
  },
  {
    id: 'biz_002',
    name: 'Bright Spark Electric',
    category: 'electrician',
    location: 'Springfield, IL',
    address: '88 Maple Ave, Springfield, IL 62701',
    phone: '(217) 555-0188',
    email: null,
    hasWebsite: false,
    websiteUrl: null,
    rating: 4.9,
    reviewCount: 134,
    yearsInBusiness: 8,
    description: 'Licensed electrician offering residential and commercial electrical services. Panel upgrades, rewiring, lighting installation, and EV charger setup.',
    discoveredAt: '2025-12-02T14:30:00Z',
  },
  {
    id: 'biz_003',
    name: 'Bella Hair Studio',
    category: 'salon',
    location: 'Decatur, IL',
    address: '210 Pine Road, Decatur, IL 62521',
    phone: '(217) 555-0210',
    email: 'bella@hairstudio.com',
    hasWebsite: false,
    websiteUrl: null,
    rating: 4.5,
    reviewCount: 67,
    yearsInBusiness: 5,
    description: 'Full-service hair salon offering cuts, color, highlights, perms, and bridal styling. Walk-ins welcome.',
    discoveredAt: '2025-12-03T09:15:00Z',
  },
  {
    id: 'biz_004',
    name: 'Clean Sweep Janitorial',
    category: 'cleaning',
    location: 'Springfield, IL',
    address: '55 Elm Street, Springfield, IL 62702',
    phone: '(217) 555-0055',
    email: null,
    hasWebsite: false,
    websiteUrl: null,
    rating: 4.3,
    reviewCount: 42,
    yearsInBusiness: 3,
    description: 'Professional cleaning services for homes and offices. Deep cleaning, move-in/move-out, and recurring maintenance plans.',
    discoveredAt: '2025-12-04T11:00:00Z',
  },
  {
    id: 'biz_005',
    name: "Ace Auto Repair & Tire",
    category: 'auto_repair',
    location: 'Champaign, IL',
    address: '301 Cedar Lane, Champaign, IL 61820',
    phone: '(217) 555-0301',
    email: 'ace@autorepair.com',
    hasWebsite: false,
    websiteUrl: null,
    rating: 4.6,
    reviewCount: 201,
    yearsInBusiness: 18,
    description: 'Full-service auto repair shop. Oil changes, brake service, engine diagnostics, transmission work, and tire sales. ASE certified technicians.',
    discoveredAt: '2025-12-05T16:45:00Z',
  },
  {
    id: 'biz_006',
    name: 'Green Thumb Landscaping',
    category: 'landscaping',
    location: 'Springfield, IL',
    address: '77 Birch Blvd, Springfield, IL 62703',
    phone: '(217) 555-0077',
    email: null,
    hasWebsite: false,
    websiteUrl: null,
    rating: 4.8,
    reviewCount: 93,
    yearsInBusiness: 7,
    description: 'Complete landscaping solutions: lawn care, garden design, hardscaping, irrigation systems, and seasonal cleanup.',
    discoveredAt: '2025-12-06T08:30:00Z',
  },
  {
    id: 'biz_007',
    name: "Paws & Claws Pet Grooming",
    category: 'pet_grooming',
    location: 'Decatur, IL',
    address: '190 Walnut Way, Decatur, IL 62526',
    phone: '(217) 555-0190',
    email: 'grooming@pawsclaws.com',
    hasWebsite: false,
    websiteUrl: null,
    rating: 4.4,
    reviewCount: 56,
    yearsInBusiness: 4,
    description: 'Gentle grooming for dogs and cats. Bathing, haircuts, nail trimming, teeth cleaning, and flea treatments. All breeds welcome.',
    discoveredAt: '2025-12-07T13:20:00Z',
  },
  {
    id: 'biz_008',
    name: 'Heritage Law Office',
    category: 'law_office',
    location: 'Springfield, IL',
    address: '45 Spruce Street, Springfield, IL 62701',
    phone: '(217) 555-0045',
    email: null,
    hasWebsite: false,
    websiteUrl: null,
    rating: 4.9,
    reviewCount: 78,
    yearsInBusiness: 15,
    description: 'Experienced attorneys specializing in estate planning, real estate law, business formation, and family law. Free initial consultation.',
    discoveredAt: '2025-12-08T10:00:00Z',
  },
  {
    id: 'biz_009',
    name: 'Fresh Cuts Barbershop',
    category: 'barbershop',
    location: 'Urbana, IL',
    address: '123 Willow Drive, Urbana, IL 61801',
    phone: '(217) 555-0123',
    email: 'book@freshcutsbarber.com',
    hasWebsite: false,
    websiteUrl: null,
    rating: 4.7,
    reviewCount: 115,
    yearsInBusiness: 6,
    description: 'Classic barbershop with modern style. Fades, beard trims, hot towel shaves, and kids cuts. Walk-ins and appointments.',
    discoveredAt: '2025-12-09T15:00:00Z',
  },
  {
    id: 'biz_010',
    name: 'Cool Breeze HVAC',
    category: 'hvac',
    location: 'Springfield, IL',
    address: '320 Industrial Dr, Springfield, IL 62704',
    phone: '(217) 555-0320',
    email: null,
    hasWebsite: false,
    websiteUrl: null,
    rating: 4.5,
    reviewCount: 87,
    yearsInBusiness: 10,
    description: 'Heating and cooling experts. AC repair, furnace installation, duct cleaning, and 24/7 emergency service. Licensed and insured.',
    discoveredAt: '2025-12-10T09:00:00Z',
  },
  {
    id: 'biz_011',
    name: 'Golden Gate Fitness',
    category: 'gym',
    location: 'Champaign, IL',
    address: '88 Ash Court, Champaign, IL 61820',
    phone: '(217) 555-0088',
    email: 'info@goldengatefit.com',
    hasWebsite: false,
    websiteUrl: null,
    rating: 4.2,
    reviewCount: 63,
    yearsInBusiness: 2,
    description: 'Neighborhood gym with personal training, group classes, and 24/7 access. Cardio, free weights, and functional training area.',
    discoveredAt: '2025-12-11T11:30:00Z',
  },
  {
    id: 'biz_012',
    name: 'Sunshine Dental Care',
    category: 'dental',
    location: 'Decatur, IL',
    address: '450 Health Park, Decatur, IL 62521',
    phone: '(217) 555-0450',
    email: 'appointments@sunshinedental.com',
    hasWebsite: false,
    websiteUrl: null,
    rating: 4.8,
    reviewCount: 142,
    yearsInBusiness: 11,
    description: 'Family dental practice offering cleanings, fillings, crowns, bridges, teeth whitening, and Invisalign. Gentle care for anxious patients.',
    discoveredAt: '2025-12-12T14:00:00Z',
  },
  {
    id: 'biz_013',
    name: "Tony's Roofing Solutions",
    category: 'roofing',
    location: 'Springfield, IL',
    address: '675 Construction Way, Springfield, IL 62707',
    phone: '(217) 555-0675',
    email: null,
    hasWebsite: false,
    websiteUrl: null,
    rating: 4.6,
    reviewCount: 74,
    yearsInBusiness: 9,
    description: 'Residential and commercial roofing. Shingle, metal, and flat roof installation and repair. Storm damage specialists with insurance claim assistance.',
    discoveredAt: '2025-12-13T08:00:00Z',
  },
  {
    id: 'biz_014',
    name: 'Precision Painting Co.',
    category: 'painting',
    location: 'Urbana, IL',
    address: '22 Brush St, Urbana, IL 61801',
    phone: '(217) 555-0022',
    email: 'quotes@precisionpainting.com',
    hasWebsite: false,
    websiteUrl: null,
    rating: 4.4,
    reviewCount: 51,
    yearsInBusiness: 6,
    description: 'Interior and exterior painting for homes and businesses. Cabinet refinishing, deck staining, wallpaper removal, and color consultations.',
    discoveredAt: '2025-12-14T10:45:00Z',
  },
  {
    id: 'biz_015',
    name: "Luigi's Italian Kitchen",
    category: 'restaurant',
    location: 'Springfield, IL',
    address: '99 Pasta Lane, Springfield, IL 62702',
    phone: '(217) 555-0099',
    email: 'luigis@italianfood.com',
    hasWebsite: false,
    websiteUrl: null,
    rating: 4.7,
    reviewCount: 188,
    yearsInBusiness: 20,
    description: 'Authentic Italian restaurant. Handmade pasta, wood-fired pizza, fresh seafood, and an extensive wine list. Dine-in and catering available.',
    discoveredAt: '2025-12-15T17:00:00Z',
  },
  {
    id: 'biz_016',
    name: 'SafeGuard Security Systems',
    category: 'electrician',
    location: 'Decatur, IL',
    address: '510 Tech Blvd, Decatur, IL 62526',
    phone: '(217) 555-0510',
    email: null,
    hasWebsite: false,
    websiteUrl: null,
    rating: 4.3,
    reviewCount: 38,
    yearsInBusiness: 4,
    description: 'Security system installation and monitoring. Cameras, alarms, smart locks, and access control for homes and small businesses.',
    discoveredAt: '2025-12-16T12:00:00Z',
  },
  {
    id: 'biz_017',
    name: 'Serenity Spa & Nails',
    category: 'salon',
    location: 'Champaign, IL',
    address: '789 Relaxation Row, Champaign, IL 61820',
    phone: '(217) 555-0789',
    email: 'book@serenityspa.com',
    hasWebsite: false,
    websiteUrl: null,
    rating: 4.9,
    reviewCount: 205,
    yearsInBusiness: 8,
    description: 'Full-service day spa and nail salon. Facials, massages, manicures, pedicures, waxing, and eyelash extensions. Gift certificates available.',
    discoveredAt: '2025-12-17T09:30:00Z',
  },
  {
    id: 'biz_018',
    name: 'All-Star Plumbing & Heating',
    category: 'plumber',
    location: 'Champaign, IL',
    address: '445 Pipe Fitters Way, Champaign, IL 61822',
    phone: '(217) 555-0445',
    email: null,
    hasWebsite: false,
    websiteUrl: null,
    rating: 4.1,
    reviewCount: 29,
    yearsInBusiness: 2,
    description: 'New plumbing company offering competitive rates. Residential plumbing repairs, fixture installation, and water heater service.',
    discoveredAt: '2025-12-18T14:15:00Z',
  },
  {
    id: 'biz_019',
    name: 'Heritage Home Painting',
    category: 'painting',
    location: 'Springfield, IL',
    address: '312 Heritage Ln, Springfield, IL 62704',
    phone: '(217) 555-0312',
    email: null,
    hasWebsite: false,
    websiteUrl: null,
    rating: 4.6,
    reviewCount: 45,
    yearsInBusiness: 13,
    description: 'Historic home restoration painting specialists. Lead-safe certified. Detailed trim work, faux finishes, and period-appropriate color matching.',
    discoveredAt: '2025-12-19T11:00:00Z',
  },
  {
    id: 'biz_020',
    name: 'Pawsitive Vibes Dog Training',
    category: 'pet_grooming',
    location: 'Springfield, IL',
    address: '600 Good Boy Ave, Springfield, IL 62703',
    phone: '(217) 555-0600',
    email: 'train@pawsitivevibes.com',
    hasWebsite: false,
    websiteUrl: null,
    rating: 4.8,
    reviewCount: 73,
    yearsInBusiness: 5,
    description: 'Positive reinforcement dog training. Puppy classes, obedience, agility, and behavioral modification. Private and group sessions available.',
    discoveredAt: '2025-12-20T16:00:00Z',
  },
];

// ─── Category Display Names ───

const CATEGORY_LABELS: Record<BusinessCategory, string> = {
  plumber: 'Plumbing',
  electrician: 'Electrical',
  salon: 'Hair & Beauty Salon',
  barbershop: 'Barbershop',
  hvac: 'HVAC & Heating',
  landscaping: 'Landscaping',
  cleaning: 'Cleaning Services',
  auto_repair: 'Auto Repair',
  dental: 'Dental',
  restaurant: 'Restaurant',
  pet_grooming: 'Pet Grooming',
  law_office: 'Law Office',
  gym: 'Gym & Fitness',
  roofing: 'Roofing',
  painting: 'Painting',
};

// ─── Discovery Engine ───

export function getAvailableCategories(): BusinessCategory[] {
  const cats = new Set(MOCK_BUSINESSES.map((b) => b.category));
  return Array.from(cats).sort();
}

export function getAvailableLocations(): string[] {
  const locs = new Set(MOCK_BUSINESSES.map((b) => b.location));
  return Array.from(locs).sort();
}

export function getCategoryLabel(category: BusinessCategory): string {
  return CATEGORY_LABELS[category] ?? category;
}

export function discoverBusinesses(filters: DiscoverFilters = {}): DiscoverResult {
  const {
    category,
    location,
    hasWebsite,
    minRating,
    page = 1,
    limit = 10,
  } = filters;

  let results = [...MOCK_BUSINESSES];

  // Apply filters
  if (category) {
    results = results.filter((b) => b.category === category);
  }

  if (location) {
    const loc = location.toLowerCase();
    results = results.filter((b) => b.location.toLowerCase().includes(loc));
  }

  if (hasWebsite !== undefined) {
    results = results.filter((b) => b.hasWebsite === hasWebsite);
  }

  if (minRating !== undefined) {
    results = results.filter((b) => (b.rating ?? 0) >= minRating);
  }

  const total = results.length;
  const totalPages = Math.ceil(total / limit);
  const safePage = Math.max(1, Math.min(page, totalPages || 1));
  const start = (safePage - 1) * limit;
  const businesses = results.slice(start, start + limit);

  return {
    businesses,
    total,
    page: safePage,
    limit,
    totalPages,
    availableCategories: getAvailableCategories(),
    availableLocations: getAvailableLocations(),
  };
}

export function getBusinessById(id: string): DiscoveredBusiness | null {
  return MOCK_BUSINESSES.find((b) => b.id === id) ?? null;
}

export function searchBusinesses(query: string): DiscoveredBusiness[] {
  const q = query.toLowerCase();
  return MOCK_BUSINESSES.filter(
    (b) =>
      b.name.toLowerCase().includes(q) ||
      b.description.toLowerCase().includes(q) ||
      b.category.toLowerCase().includes(q) ||
      b.location.toLowerCase().includes(q) ||
      b.address.toLowerCase().includes(q)
  );
}
