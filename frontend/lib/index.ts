// ─── Core Features Module ───
// Central export for the Goon core-features module.
// Import from '@frontend/lib' or 'frontend/lib' depending on path config.

// Database
export { default as prisma } from './db';

// Types
export type {
  BusinessCategory,
  DiscoveredBusiness,
  DiscoverFilters,
  DiscoverResult,
  WebsiteTemplate,
  WebsiteGenerationRequest,
  GeneratedWebsite,
  LeadStatus,
  Lead,
  CreateLeadInput,
  UpdateLeadInput,
  ApiResponse,
} from './types';

// Business Discovery
export {
  discoverBusinesses,
  getBusinessById,
  searchBusinesses,
  getAvailableCategories,
  getAvailableLocations,
  getCategoryLabel,
} from './discover';

// Website Generator
export {
  generateWebsite,
  getTemplateForCategory,
} from './generator';

// Lead Operations
export {
  getLeads,
  getLeadById,
  createLead,
  updateLead,
  deleteLead,
  getLeadsByStatus,
  getLeadStats,
} from './leads';

// API Route Handlers - Discover
export {
  handleDiscoverGET,
  handleDiscoverByIdGET,
} from './api-discover';

// API Route Handlers - Generate
export { handleGeneratePOST } from './api-generate';

// API Route Handlers - Leads
export {
  handleLeadsGET,
  handleLeadsPOST,
  handleLeadByIdGET,
  handleLeadByIdPATCH,
  handleLeadByIdDELETE,
} from './api-leads';
