// ─── Business Discovery ───

export type BusinessCategory =
  | 'plumber'
  | 'electrician'
  | 'salon'
  | 'barbershop'
  | 'hvac'
  | 'landscaping'
  | 'cleaning'
  | 'auto_repair'
  | 'dental'
  | 'restaurant'
  | 'pet_grooming'
  | 'law_office'
  | 'gym'
  | 'roofing'
  | 'painting';

export interface DiscoveredBusiness {
  id: string;
  name: string;
  category: BusinessCategory;
  location: string;
  address: string;
  phone: string;
  email: string | null;
  hasWebsite: boolean;
  websiteUrl: string | null;
  rating: number | null;
  reviewCount: number;
  yearsInBusiness: number | null;
  description: string;
  discoveredAt: string;
}

export interface DiscoverFilters {
  category?: BusinessCategory;
  location?: string;
  hasWebsite?: boolean;
  minRating?: number;
  page?: number;
  limit?: number;
}

export interface DiscoverResult {
  businesses: DiscoveredBusiness[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  availableCategories: BusinessCategory[];
  availableLocations: string[];
}

// ─── Website Generation ───

export type WebsiteTemplate =
  | 'plumber'
  | 'electrician'
  | 'salon'
  | 'barbershop'
  | 'hvac'
  | 'landscaping'
  | 'cleaning'
  | 'auto_repair'
  | 'dental'
  | 'restaurant'
  | 'pet_grooming'
  | 'law_office'
  | 'gym'
  | 'generic';

export interface WebsiteGenerationRequest {
  businessId: string;
  businessName: string;
  category: BusinessCategory;
  phone: string;
  email?: string | null;
  address: string;
  description?: string;
  template?: WebsiteTemplate;
}

export interface GeneratedWebsite {
  id: string;
  businessName: string;
  template: WebsiteTemplate;
  subdomain: string;
  hero: {
    headline: string;
    subheadline: string;
    ctaText: string;
  };
  about: {
    title: string;
    description: string;
    highlights: string[];
  };
  services: {
    title: string;
    items: { name: string; description: string; price?: string }[];
  };
  testimonials: {
    name: string;
    rating: number;
    text: string;
  }[];
  contact: {
    phone: string;
    email?: string;
    address: string;
    hours: string;
  };
  html: string;
  status: 'draft' | 'published';
  createdAt: string;
}

// ─── Leads ───

export type LeadStatus = 'discovered' | 'contacted' | 'interested' | 'site_created' | 'converted' | 'lost';

export interface Lead {
  id: string;
  userId: string;
  businessName: string;
  category: string;
  address: string;
  phone: string | null;
  email: string | null;
  hasWebsite: boolean;
  status: LeadStatus;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateLeadInput {
  businessName: string;
  category: string;
  address: string;
  phone?: string;
  email?: string;
  hasWebsite?: boolean;
  status?: LeadStatus;
  notes?: string;
}

export interface UpdateLeadInput {
  status?: LeadStatus;
  notes?: string;
  phone?: string;
  email?: string;
}

// ─── API Response Wrappers ───

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
