import type {
  BusinessCategory,
  WebsiteGenerationRequest,
  WebsiteTemplate,
  GeneratedWebsite,
} from './types';

// ─── Template Selection ───

const CATEGORY_TO_TEMPLATE: Record<BusinessCategory, WebsiteTemplate> = {
  plumber: 'plumber',
  electrician: 'electrician',
  salon: 'salon',
  barbershop: 'barbershop',
  hvac: 'hvac',
  landscaping: 'landscaping',
  cleaning: 'cleaning',
  auto_repair: 'auto_repair',
  dental: 'dental',
  restaurant: 'restaurant',
  pet_grooming: 'pet_grooming',
  law_office: 'law_office',
  gym: 'gym',
  roofing: 'plumber',       // reuse plumbing template for roofing
  painting: 'landscaping',  // reuse landscaping template for painting
};

// ─── Industry-Specific Content Templates ───

interface TemplateContent {
  heroHeadline: (name: string) => string;
  heroSubheadline: (name: string, location: string) => string;
  ctaText: string;
  aboutHighlights: string[];
  services: { name: string; description: string; price?: string }[];
  testimonialPool: { name: string; rating: number; text: string }[];
  hours: string;
}

const TEMPLATES: Record<WebsiteTemplate, TemplateContent> = {
  plumber: {
    heroHeadline: (name) => `Trusted Plumbing Experts in Your Area`,
    heroSubheadline: (name, loc) =>
      `${name} delivers fast, reliable plumbing services to homes and businesses across ${loc}. Available 24/7 for emergencies.`,
    ctaText: 'Get a Free Estimate',
    aboutHighlights: [
      'Licensed and insured professionals',
      '24/7 emergency service available',
      'Upfront pricing with no hidden fees',
      'Satisfaction guaranteed on every job',
    ],
    services: [
      { name: 'Emergency Repairs', description: 'Fast response for burst pipes, leaks, and flooding emergencies.', price: 'From $99' },
      { name: 'Drain Cleaning', description: 'Professional clog removal and drain maintenance for all fixtures.', price: 'From $149' },
      { name: 'Water Heater Install', description: 'Tank and tankless water heater installation and replacement.', price: 'From $899' },
      { name: 'Fixture Installation', description: 'Faucets, toilets, sinks, and garbage disposal installation.', price: 'From $125' },
      { name: 'Pipe Repair & Repiping', description: 'Leak detection, pipe repair, and whole-house repiping.', price: 'Free estimate' },
      { name: 'Sewer Line Service', description: 'Sewer inspection, cleaning, and repair with trenchless options.', price: 'Free estimate' },
    ],
    testimonialPool: [
      { name: 'Sarah M.', rating: 5, text: 'They showed up within an hour of my call. Fixed the leak quickly and the price was very fair. Highly recommend!' },
      { name: 'James K.', rating: 5, text: 'Best plumber in town. They replaced our water heater the same day. Professional and clean work.' },
      { name: 'Linda R.', rating: 5, text: 'Had a major drain issue. They diagnosed it fast and had everything working perfectly by the afternoon.' },
      { name: 'Robert P.', rating: 4, text: 'Great service on a Saturday emergency. Slightly pricier than expected but quality work was worth it.' },
    ],
    hours: 'Mon-Fri 7AM-6PM | Sat 8AM-2PM | 24/7 Emergency',
  },

  electrician: {
    heroHeadline: () => `Licensed Electricians You Can Trust`,
    heroSubheadline: (name, loc) =>
      `${name} provides expert electrical services for homes and businesses throughout ${loc}. Safety and quality are our top priorities.`,
    ctaText: 'Schedule Service',
    aboutHighlights: [
      'Licensed, bonded, and insured',
      'Residential and commercial services',
      'Free safety inspections with every visit',
      'All work meets NEC code requirements',
    ],
    services: [
      { name: 'Panel Upgrades', description: 'Upgrade your electrical panel to handle modern power demands safely.', price: 'From $1,200' },
      { name: 'Wiring & Rewiring', description: 'Complete home wiring and rewiring for renovations and older homes.', price: 'Free estimate' },
      { name: 'Lighting Installation', description: 'Indoor and outdoor lighting design, installation, and upgrades.', price: 'From $150' },
      { name: 'EV Charger Installation', description: 'Level 2 EV charging station installation for your garage.', price: 'From $800' },
      { name: 'Outlet & Switch Repair', description: 'Repair and install outlets, switches, GFCI, and dimmers.', price: 'From $85' },
      { name: 'Generator Installation', description: 'Whole-home standby generator installation and maintenance.', price: 'Free estimate' },
    ],
    testimonialPool: [
      { name: 'Mark T.', rating: 5, text: 'Installed our EV charger and upgraded the panel. Clean work, on time, and explained everything clearly.' },
      { name: 'Jennifer L.', rating: 5, text: 'They rewired our 1960s house. Huge job done perfectly. Feel so much safer now.' },
      { name: 'David W.', rating: 5, text: 'Quick response for an outlet that was sparking. Diagnosed the issue and fixed it the same visit.' },
      { name: 'Amy S.', rating: 4, text: 'Great lighting installation in our kitchen. Would definitely hire again for future projects.' },
    ],
    hours: 'Mon-Fri 7:30AM-5PM | Sat by appointment',
  },

  salon: {
    heroHeadline: () => `Where Style Meets Perfection`,
    heroSubheadline: (name) =>
      `${name} offers premium hair and beauty services in a relaxing atmosphere. Book your transformation today.`,
    ctaText: 'Book Appointment',
    aboutHighlights: [
      'Experienced, certified stylists',
      'Premium products and latest techniques',
      'Relaxing, welcoming atmosphere',
      'Walk-ins always welcome',
    ],
    services: [
      { name: 'Haircut & Styling', description: 'Precision cuts, blowouts, and special occasion styling.', price: 'From $45' },
      { name: 'Color & Highlights', description: 'Full color, balayage, ombré, and dimensional highlights.', price: 'From $85' },
      { name: 'Keratin Treatment', description: 'Smoothing keratin treatments for frizz-free, manageable hair.', price: 'From $200' },
      { name: 'Bridal Package', description: 'Complete bridal hair and makeup with trial session included.', price: 'From $300' },
      { name: 'Deep Conditioning', description: 'Intensive hair treatments to restore moisture and shine.', price: 'From $35' },
      { name: 'Extensions', description: 'Professional tape-in, sew-in, and clip-in hair extensions.', price: 'From $250' },
    ],
    testimonialPool: [
      { name: 'Michelle B.', rating: 5, text: 'Best haircut I have ever had! The stylist really listened to what I wanted. My hair has never looked better.' },
      { name: 'Karen D.', rating: 5, text: 'The balayage they did is absolutely gorgeous. Everyone keeps asking where I got my hair done.' },
      { name: 'Stephanie R.', rating: 5, text: 'Such a relaxing experience. The scalp massage during the wash was heavenly. Will be coming back monthly!' },
      { name: 'Nicole F.', rating: 4, text: 'Great color work and friendly staff. Booking online was easy and they were right on time.' },
    ],
    hours: 'Tue-Fri 9AM-7PM | Sat 9AM-5PM | Sun-Mon Closed',
  },

  barbershop: {
    heroHeadline: () => `Classic Cuts, Modern Style`,
    heroSubheadline: (name) =>
      `${name} is your neighborhood barbershop. Sharp cuts, hot towel shaves, and a great atmosphere every visit.`,
    ctaText: 'Book a Cut',
    aboutHighlights: [
      'Skilled barbers with years of experience',
      'Relaxing hot towel and straight razor services',
      'Walk-ins and appointments welcome',
      'Complimentary beverage with every visit',
    ],
    services: [
      { name: 'Haircut', description: 'Classic and modern cuts tailored to your style.', price: 'From $30' },
      { name: 'Beard Trim & Shape', description: 'Precision beard grooming and shaping.', price: 'From $20' },
      { name: 'Hot Towel Shave', description: 'Traditional straight razor shave with hot towels.', price: 'From $35' },
      { name: 'Kids Cut', description: 'Haircuts for children under 12.', price: 'From $20' },
      { name: 'Hair + Beard Combo', description: 'Complete haircut and beard grooming package.', price: 'From $45' },
      { name: 'Scalp Treatment', description: 'Deep cleansing scalp treatment and massage.', price: 'From $25' },
    ],
    testimonialPool: [
      { name: 'Chris M.', rating: 5, text: 'Best fade in town. Been coming here for two years and never had a bad cut. The hot towel shave is incredible.' },
      { name: 'Mike R.', rating: 5, text: 'Great atmosphere, great cuts. Feels like a real barbershop, not a chain. My go-to spot.' },
      { name: 'Tom H.', rating: 5, text: 'The barbers here actually listen. Showed them a photo and got exactly what I wanted.' },
      { name: 'Jake P.', rating: 4, text: 'Solid cuts every time. Can get busy on Saturdays so I usually book ahead. Worth the wait though.' },
    ],
    hours: 'Mon-Sat 8AM-7PM | Sun 10AM-4PM',
  },

  hvac: {
    heroHeadline: () => `Your Comfort Is Our Priority`,
    heroSubheadline: (name, loc) =>
      `${name} keeps ${loc} comfortable year-round with expert heating and cooling services.`,
    ctaText: 'Request Service',
    aboutHighlights: [
      'NATE-certified technicians',
      '24/7 emergency heating and cooling service',
      'Free estimates on new installations',
      'Maintenance plans available',
    ],
    services: [
      { name: 'AC Repair', description: 'Fast diagnosis and repair of all air conditioning systems.', price: 'From $89' },
      { name: 'Furnace Installation', description: 'High-efficiency furnace installation and replacement.', price: 'From $2,500' },
      { name: 'AC Installation', description: 'Central air and ductless mini-split installation.', price: 'From $3,000' },
      { name: 'Duct Cleaning', description: 'Professional air duct cleaning for better air quality.', price: 'From $300' },
      { name: 'Maintenance Plans', description: 'Seasonal tune-ups to keep your system running efficiently.', price: 'From $149/yr' },
      { name: 'Indoor Air Quality', description: 'Air purifiers, humidifiers, and ventilation solutions.', price: 'Free estimate' },
    ],
    testimonialPool: [
      { name: 'Patricia G.', rating: 5, text: 'Our AC died in the middle of a heatwave. They had a tech out the same day and got us back up and running.' },
      { name: 'George B.', rating: 5, text: 'Had a new furnace installed. Professional from start to finish. Our energy bills have dropped noticeably.' },
      { name: 'Sandra M.', rating: 5, text: 'Been on their maintenance plan for two years. No surprises, no breakdowns. Great preventive care.' },
      { name: 'Bill W.', rating: 4, text: 'Good service on our AC repair. Fair pricing and the technician explained everything clearly.' },
    ],
    hours: 'Mon-Fri 7AM-6PM | Sat 8AM-12PM | 24/7 Emergency',
  },

  landscaping: {
    heroHeadline: () => `Transform Your Outdoor Space`,
    heroSubheadline: (name) =>
      `${name} creates beautiful, functional landscapes that enhance your property value and curb appeal.`,
    ctaText: 'Get a Free Quote',
    aboutHighlights: [
      'Full-service landscape design and maintenance',
      'Licensed and insured professionals',
      'Eco-friendly and sustainable practices',
      'Serving residential and commercial properties',
    ],
    services: [
      { name: 'Lawn Care', description: 'Mowing, fertilization, aeration, and weed control programs.', price: 'From $45/visit' },
      { name: 'Landscape Design', description: 'Custom garden and landscape design with 3D renderings.', price: 'Free consultation' },
      { name: 'Hardscaping', description: 'Patios, walkways, retaining walls, and outdoor living spaces.', price: 'Free estimate' },
      { name: 'Irrigation Systems', description: 'Sprinkler installation, repair, and smart controller upgrades.', price: 'From $500' },
      { name: 'Tree & Shrub Care', description: 'Pruning, trimming, removal, and disease treatment.', price: 'From $150' },
      { name: 'Seasonal Cleanup', description: 'Spring and fall cleanup, leaf removal, and garden prep.', price: 'From $200' },
    ],
    testimonialPool: [
      { name: 'Nancy D.', rating: 5, text: 'They completely transformed our backyard. The patio and garden design exceeded our expectations.' },
      { name: 'Ron C.', rating: 5, text: 'Reliable weekly lawn service. Our yard has never looked this good. Neighbors keep asking who we use.' },
      { name: 'Cathy S.', rating: 5, text: 'Professional landscape design with great attention to detail. They really understood our vision.' },
      { name: 'Steve L.', rating: 4, text: 'Good hardscaping work on our retaining wall. Solid craftsmanship and fair pricing.' },
    ],
    hours: 'Mon-Fri 7AM-5PM | Sat 8AM-2PM',
  },

  cleaning: {
    heroHeadline: () => `Sparkling Clean, Every Time`,
    heroSubheadline: (name) =>
      `${name} delivers thorough, reliable cleaning services for homes and offices. Your space, spotless.`,
    ctaText: 'Book a Cleaning',
    aboutHighlights: [
      'Background-checked and trained cleaning teams',
      'Eco-friendly cleaning products available',
      'Satisfaction guaranteed or we re-clean free',
      'Flexible scheduling including weekends',
    ],
    services: [
      { name: 'Regular Cleaning', description: 'Weekly, bi-weekly, or monthly home cleaning service.', price: 'From $120' },
      { name: 'Deep Cleaning', description: 'Comprehensive top-to-bottom cleaning for a fresh start.', price: 'From $250' },
      { name: 'Move-In/Move-Out', description: 'Thorough cleaning for moving transitions.', price: 'From $300' },
      { name: 'Office Cleaning', description: 'Commercial cleaning for offices and workspaces.', price: 'Custom quote' },
      { name: 'Post-Construction', description: 'Cleanup after renovation or construction projects.', price: 'Free estimate' },
      { name: 'Carpet Cleaning', description: 'Professional steam cleaning for carpets and rugs.', price: 'From $0.35/sqft' },
    ],
    testimonialPool: [
      { name: 'Rebecca T.', rating: 5, text: 'They do an amazing job every two weeks. I love coming home to a spotless house. Totally worth it.' },
      { name: 'Daniel K.', rating: 5, text: 'Used them for our move-out cleaning. Got our full security deposit back thanks to their thorough work.' },
      { name: 'Laura M.', rating: 5, text: 'Our office has never been cleaner. The team is professional, on time, and very detail-oriented.' },
      { name: 'Paul H.', rating: 4, text: 'Great deep cleaning service. The kitchen and bathrooms looked brand new afterward.' },
    ],
    hours: 'Mon-Sat 8AM-6PM',
  },

  auto_repair: {
    heroHeadline: () => `Honest Repairs, Fair Prices`,
    heroSubheadline: (name, loc) =>
      `${name} is ${loc}'s trusted auto repair shop. ASE-certified technicians keeping your vehicle running safely.`,
    ctaText: 'Schedule Repair',
    aboutHighlights: [
      'ASE-certified master technicians',
      'State-of-the-art diagnostic equipment',
      '24-month / 24,000-mile warranty on repairs',
      'Free shuttle service while your car is in the shop',
    ],
    services: [
      { name: 'Oil Change & Maintenance', description: 'Full synthetic and conventional oil changes with multi-point inspection.', price: 'From $49' },
      { name: 'Brake Service', description: 'Brake pad, rotor, and caliper replacement. ABS system repair.', price: 'From $199' },
      { name: 'Engine Diagnostics', description: 'Computer diagnostics to identify check engine light issues.', price: 'From $89' },
      { name: 'Transmission Service', description: 'Transmission flush, repair, and rebuild services.', price: 'From $150' },
      { name: 'Tire Sales & Service', description: 'New tires, rotation, balancing, and alignment.', price: 'From $25/tire' },
      { name: 'AC Service', description: 'Auto AC recharge, leak detection, and compressor repair.', price: 'From $120' },
    ],
    testimonialPool: [
      { name: 'Brian F.', rating: 5, text: 'Honest shop that does not upsell unnecessary work. They explained the issue clearly and the price was fair.' },
      { name: 'Maria G.', rating: 5, text: 'Been bringing my cars here for five years. Consistent quality and they always stand behind their work.' },
      { name: 'Jason W.', rating: 5, text: 'They diagnosed an engine issue two other shops missed. Fixed it right the first time.' },
      { name: 'Teresa L.', rating: 4, text: 'Good brake job. The free shuttle was a nice touch. Will definitely be back for future service.' },
    ],
    hours: 'Mon-Fri 7:30AM-6PM | Sat 8AM-3PM',
  },

  dental: {
    heroHeadline: () => `Your Smile, Our Passion`,
    heroSubheadline: (name) =>
      `${name} provides gentle, comprehensive dental care for the whole family in a comfortable environment.`,
    ctaText: 'Book Appointment',
    aboutHighlights: [
      'Gentle care for anxious patients',
      'Modern technology including digital X-rays',
      'Most insurance plans accepted',
      'Flexible payment options available',
    ],
    services: [
      { name: 'Cleaning & Exam', description: 'Professional cleaning, exam, and digital X-rays.', price: 'From $150' },
      { name: 'Fillings & Crowns', description: 'Tooth-colored fillings and porcelain crowns.', price: 'From $200' },
      { name: 'Teeth Whitening', description: 'Professional in-office and take-home whitening systems.', price: 'From $350' },
      { name: 'Invisalign', description: 'Clear aligner orthodontic treatment for straighter teeth.', price: 'From $3,500' },
      { name: 'Root Canal', description: 'Gentle root canal therapy to save damaged teeth.', price: 'From $800' },
      { name: 'Dental Implants', description: 'Permanent tooth replacement with implant technology.', price: 'From $2,500' },
    ],
    testimonialPool: [
      { name: 'Angela M.', rating: 5, text: 'I have terrible dental anxiety but this office made me feel so comfortable. The staff is incredibly patient and kind.' },
      { name: 'Edward S.', rating: 5, text: 'Great family dentist. My kids actually look forward to their checkups here. That says a lot!' },
      { name: 'Diane P.', rating: 5, text: 'The Invisalign results are amazing. Dr. explained every step and the process was smooth.' },
      { name: 'Carl B.', rating: 4, text: 'Good dental work and friendly staff. Office is modern and clean. Would recommend.' },
    ],
    hours: 'Mon-Thu 8AM-5PM | Fri 8AM-1PM',
  },

  restaurant: {
    heroHeadline: () => `Authentic Flavors, Memorable Dining`,
    heroSubheadline: (name) =>
      `Welcome to ${name}. Fresh ingredients, time-honored recipes, and a warm atmosphere for every occasion.`,
    ctaText: 'View Menu & Reserve',
    aboutHighlights: [
      'Locally sourced, fresh ingredients daily',
      'Family recipes passed down through generations',
      'Cozy dine-in and private event space',
      'Takeout and catering available',
    ],
    services: [
      { name: 'Dine-In', description: 'Enjoy our full menu in a warm, welcoming atmosphere.', price: '' },
      { name: 'Takeout', description: 'Order ahead for quick pickup of your favorites.', price: '' },
      { name: 'Catering', description: 'Full-service catering for events of any size.', price: 'Custom quote' },
      { name: 'Private Events', description: 'Host your celebration in our private dining room.', price: 'From $500' },
      { name: 'Gift Cards', description: 'The perfect gift for the food lover in your life.', price: 'From $25' },
      { name: 'Weekly Specials', description: 'Chef-curated seasonal dishes and prix fixe menus.', price: 'Varies' },
    ],
    testimonialPool: [
      { name: 'Sandra L.', rating: 5, text: 'The best Italian food outside of Italy. The handmade pasta is incredible. We come here every anniversary.' },
      { name: 'Mark J.', rating: 5, text: 'Catered our company party and it was a hit. Everyone raved about the food. Will definitely use again.' },
      { name: 'Emily R.', rating: 5, text: 'Cozy atmosphere, amazing food, and wonderful service. Our new favorite date night spot.' },
      { name: 'Tom K.', rating: 4, text: 'Great food and reasonable prices. Can get busy on weekends so reservations are recommended.' },
    ],
    hours: 'Tue-Thu 11AM-9PM | Fri-Sat 11AM-10PM | Sun 12PM-8PM',
  },

  pet_grooming: {
    heroHeadline: () => `Where Every Pet Is Family`,
    heroSubheadline: (name) =>
      `${name} provides gentle, professional grooming services that keep your furry friends looking and feeling their best.`,
    ctaText: 'Book Grooming',
    aboutHighlights: [
      'Certified and experienced groomers',
      'Gentle handling for nervous pets',
      'All-natural, pet-safe products',
      'Cat and dog grooming specialists',
    ],
    services: [
      { name: 'Full Groom', description: 'Bath, haircut, nail trim, ear cleaning, and blow dry.', price: 'From $55' },
      { name: 'Bath & Brush', description: 'Shampoo, conditioning, blow dry, and brushing.', price: 'From $35' },
      { name: 'Nail Trim', description: 'Quick and gentle nail trimming for dogs and cats.', price: 'From $15' },
      { name: 'Teeth Brushing', description: 'Dental hygiene with pet-safe toothpaste.', price: 'From $12' },
      { name: 'De-shedding Treatment', description: 'Reduce shedding with our specialized treatment.', price: 'From $40' },
      { name: 'Flea & Tick Bath', description: 'Medicated bath to eliminate fleas and ticks.', price: 'From $45' },
    ],
    testimonialPool: [
      { name: 'Rachel B.', rating: 5, text: 'My anxious rescue dog actually enjoys going here. The groomers are so patient and gentle with him.' },
      { name: 'Kevin M.', rating: 5, text: 'Best grooming experience we have had. Our poodle looks like a show dog every time we pick him up.' },
      { name: 'Sophia T.', rating: 5, text: 'They do a wonderful job with our cat, which is not easy to find. Highly recommend for cat owners.' },
      { name: 'Derek H.', rating: 4, text: 'Good grooming service. Friendly staff and they always send us home with a bandana and treat.' },
    ],
    hours: 'Mon-Sat 8AM-5PM | Sun Closed',
  },

  law_office: {
    heroHeadline: () => `Experienced Legal Counsel You Can Count On`,
    heroSubheadline: (name) =>
      `${name} provides trusted legal representation in estate planning, real estate, business, and family law.`,
    ctaText: 'Free Consultation',
    aboutHighlights: [
      'Decades of combined legal experience',
      'Personalized attention to every case',
      'Transparent billing and fee structures',
      'Free initial consultation for new clients',
    ],
    services: [
      { name: 'Estate Planning', description: 'Wills, trusts, powers of attorney, and estate administration.', price: 'From $500' },
      { name: 'Real Estate Law', description: 'Closings, title disputes, zoning, and property transfers.', price: 'From $750' },
      { name: 'Business Formation', description: 'LLC, corporation, partnership formation and operating agreements.', price: 'From $600' },
      { name: 'Family Law', description: 'Divorce, custody, child support, and adoption proceedings.', price: 'Hourly rate' },
      { name: 'Contract Review', description: 'Review and drafting of business and personal contracts.', price: 'From $300' },
      { name: 'Litigation', description: 'Civil litigation representation for disputes and claims.', price: 'Hourly rate' },
    ],
    testimonialPool: [
      { name: 'William C.', rating: 5, text: 'Helped us set up our family trust. Very thorough and explained everything in terms we could understand.' },
      { name: 'Janet P.', rating: 5, text: 'Handled our real estate closing smoothly. Caught issues we would have missed. Very professional.' },
      { name: 'Richard M.', rating: 5, text: 'Excellent business attorney. Helped us navigate a complex partnership agreement. Fair and responsive.' },
      { name: 'Mary F.', rating: 4, text: 'Good family law representation. Cared about our case and fought for a fair outcome.' },
    ],
    hours: 'Mon-Fri 9AM-5PM | Evenings by appointment',
  },

  gym: {
    heroHeadline: () => `Your Fitness Journey Starts Here`,
    heroSubheadline: (name) =>
      `${name} offers everything you need to reach your fitness goals. Modern equipment, expert trainers, and a motivating community.`,
    ctaText: 'Start Free Trial',
    aboutHighlights: [
      'State-of-the-art equipment and facilities',
      'Certified personal trainers on staff',
      'Supportive, motivating community',
      '24/7 access for members',
    ],
    services: [
      { name: 'Membership', description: 'Unlimited gym access with flexible month-to-month plans.', price: 'From $39/mo' },
      { name: 'Personal Training', description: 'One-on-one training customized to your goals.', price: 'From $65/session' },
      { name: 'Group Classes', description: 'HIIT, yoga, spin, and strength training classes.', price: 'Included' },
      { name: 'Body Composition', description: 'InBody scans to track your progress accurately.', price: 'From $25' },
      { name: 'Nutrition Coaching', description: 'Personalized meal plans and nutrition guidance.', price: 'From $99/mo' },
      { name: 'Recovery Zone', description: 'Sauna, cold plunge, and massage gun station.', price: 'Included' },
    ],
    testimonialPool: [
      { name: 'Alex R.', rating: 5, text: 'Best gym in the area. Clean, great equipment, and the trainers genuinely care about your progress.' },
      { name: 'Jordan T.', rating: 5, text: 'Lost 30 pounds with their personal training program. The trainers kept me motivated the entire time.' },
      { name: 'Sam K.', rating: 5, text: 'Love the group classes. The instructors are energetic and the community is so welcoming.' },
      { name: 'Casey M.', rating: 4, text: 'Great equipment selection and never too crowded. The 24/7 access fits perfectly with my schedule.' },
    ],
    hours: '24/7 Access | Staffed: Mon-Fri 5AM-9PM | Sat-Sun 7AM-5PM',
  },

  generic: {
    heroHeadline: (name) => `Welcome to ${name}`,
    heroSubheadline: (name, loc) =>
      `${name} is proud to serve the ${loc} community with quality service and dedication to customer satisfaction.`,
    ctaText: 'Contact Us',
    aboutHighlights: [
      'Locally owned and operated',
      'Dedicated to customer satisfaction',
      'Quality service at fair prices',
      'Serving the community with pride',
    ],
    services: [
      { name: 'Consultation', description: 'Free initial consultation to discuss your needs.', price: 'Free' },
      { name: 'Core Service', description: 'Our primary service offering tailored to your needs.', price: 'Contact for pricing' },
      { name: 'Premium Package', description: 'Comprehensive service package with priority scheduling.', price: 'Contact for pricing' },
      { name: 'Maintenance Plan', description: 'Ongoing maintenance to keep things running smoothly.', price: 'Monthly plans available' },
    ],
    testimonialPool: [
      { name: 'Happy Customer', rating: 5, text: 'Excellent service! They went above and beyond my expectations. Will definitely use them again.' },
      { name: 'Satisfied Client', rating: 5, text: 'Professional, reliable, and fairly priced. I recommend them to all my friends and family.' },
      { name: 'Loyal Patron', rating: 5, text: 'Been a customer for years. Consistent quality every single time. They truly care about their clients.' },
      { name: 'New Customer', rating: 4, text: 'Great first experience. The team was friendly and the work was done efficiently. Will return.' },
    ],
    hours: 'Mon-Fri 9AM-5PM',
  },
};

// ─── HTML Generator ───

function generateHtml(req: WebsiteGenerationRequest, content: TemplateContent): string {
  const { businessName, phone, email, address } = req;
  const loc = address.split(',').slice(-2).join(',').trim() || 'our area';

  const servicesHtml = content.services
    .map(
      (s) => `
    <div class="service-card">
      <h3>${s.name}</h3>
      <p>${s.description}</p>
      ${s.price ? `<span class="price">${s.price}</span>` : ''}
    </div>`
    )
    .join('\n');

  const testimonialsHtml = content.testimonialPool
    .slice(0, 3)
    .map(
      (t) => `
    <div class="testimonial">
      <div class="stars">${'★'.repeat(t.rating)}${'☆'.repeat(5 - t.rating)}</div>
      <blockquote>"${t.text}"</blockquote>
      <cite>— ${t.name}</cite>
    </div>`
    )
    .join('\n');

  const highlightsHtml = content.aboutHighlights
    .map((h) => `<li>${h}</li>`)
    .join('\n');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${businessName}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: #1a1a2e; line-height: 1.6; }
    .hero {
      background: linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0f172a 100%);
      color: white;
      padding: 80px 24px;
      text-align: center;
    }
    .hero h1 { font-size: 2.5rem; font-weight: 800; margin-bottom: 16px; letter-spacing: -0.02em; }
    .hero p { font-size: 1.2rem; max-width: 600px; margin: 0 auto 32px; opacity: 0.9; }
    .cta-btn {
      display: inline-block;
      background: #2563eb;
      color: white;
      padding: 14px 32px;
      border-radius: 8px;
      text-decoration: none;
      font-weight: 600;
      font-size: 1.1rem;
      transition: background 0.2s;
    }
    .cta-btn:hover { background: #1d4ed8; }
    .section { max-width: 900px; margin: 0 auto; padding: 60px 24px; }
    .section h2 { font-size: 1.8rem; font-weight: 700; margin-bottom: 32px; text-align: center; color: #0f172a; }
    .about ul { list-style: none; display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
    .about li { padding: 12px 16px; background: #f1f5f9; border-radius: 8px; font-weight: 500; }
    .about li::before { content: "✓ "; color: #16a34a; font-weight: 700; }
    .services-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 20px; }
    .service-card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px; }
    .service-card h3 { font-size: 1.1rem; font-weight: 700; margin-bottom: 8px; color: #0f172a; }
    .service-card p { font-size: 0.95rem; color: #475569; margin-bottom: 12px; }
    .price { display: inline-block; background: #dbeafe; color: #1e40af; padding: 4px 12px; border-radius: 20px; font-size: 0.85rem; font-weight: 600; }
    .testimonials { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 20px; }
    .testimonial { background: white; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px; }
    .stars { color: #f59e0b; font-size: 1.2rem; margin-bottom: 12px; }
    .testimonial blockquote { font-style: italic; color: #334155; margin-bottom: 12px; }
    .testimonial cite { font-size: 0.9rem; color: #64748b; font-style: normal; font-weight: 600; }
    .contact {
      background: #0f172a;
      color: white;
      padding: 60px 24px;
      text-align: center;
    }
    .contact h2 { color: white; }
    .contact-info { display: flex; justify-content: center; gap: 40px; flex-wrap: wrap; margin-top: 24px; }
    .contact-item { text-align: center; }
    .contact-item strong { display: block; margin-bottom: 4px; font-size: 0.85rem; text-transform: uppercase; opacity: 0.7; }
    .contact-item span { font-size: 1.05rem; }
    .footer { background: #020617; color: #94a3b8; text-align: center; padding: 24px; font-size: 0.85rem; }
    @media (max-width: 640px) {
      .hero h1 { font-size: 1.8rem; }
      .about ul { grid-template-columns: 1fr; }
      .contact-info { flex-direction: column; gap: 20px; }
    }
  </style>
</head>
<body>
  <section class="hero">
    <h1>${content.heroHeadline(businessName)}</h1>
    <p>${content.heroSubheadline(businessName, loc)}</p>
    <a href="tel:${phone}" class="cta-btn">${content.ctaText}</a>
  </section>

  <section class="section about">
    <h2>Why Choose ${businessName}?</h2>
    <ul>${highlightsHtml}</ul>
  </section>

  <section class="section">
    <h2>Our Services</h2>
    <div class="services-grid">
      ${servicesHtml}
    </div>
  </section>

  <section class="section">
    <h2>What Our Customers Say</h2>
    <div class="testimonials">
      ${testimonialsHtml}
    </div>
  </section>

  <section class="contact">
    <h2>Get In Touch</h2>
    <div class="contact-info">
      <div class="contact-item">
        <strong>Phone</strong>
        <span>${phone}</span>
      </div>
      ${email ? `<div class="contact-item"><strong>Email</strong><span>${email}</span></div>` : ''}
      <div class="contact-item">
        <strong>Address</strong>
        <span>${address}</span>
      </div>
      <div class="contact-item">
        <strong>Hours</strong>
        <span>${content.hours}</span>
      </div>
    </div>
  </section>

  <footer class="footer">
    <p>&copy; ${new Date().getFullYear()} ${businessName}. All rights reserved.</p>
  </footer>
</body>
</html>`;
}

// ─── Main Generator ───

export function generateWebsite(req: WebsiteGenerationRequest): GeneratedWebsite {
  const template = req.template ?? CATEGORY_TO_TEMPLATE[req.category] ?? 'generic';
  const content = TEMPLATES[template] ?? TEMPLATES.generic;
  const html = generateHtml(req, content);
  const subdomain = req.businessName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

  const id = `site_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

  return {
    id,
    businessName: req.businessName,
    template,
    subdomain,
    hero: {
      headline: content.heroHeadline(req.businessName),
      subheadline: content.heroSubheadline(req.businessName, req.address.split(',').slice(-2).join(',').trim()),
      ctaText: content.ctaText,
    },
    about: {
      title: `Why Choose ${req.businessName}?`,
      description: req.description ?? `${req.businessName} is a trusted local business serving the community with quality service.`,
      highlights: content.aboutHighlights,
    },
    services: {
      title: 'Our Services',
      items: content.services,
    },
    testimonials: content.testimonialPool.slice(0, 3),
    contact: {
      phone: req.phone,
      email: req.email ?? undefined,
      address: req.address,
      hours: content.hours,
    },
    html,
    status: 'draft',
    createdAt: new Date().toISOString(),
  };
}

export function getTemplateForCategory(category: BusinessCategory): WebsiteTemplate {
  return CATEGORY_TO_TEMPLATE[category] ?? 'generic';
}
