import { NextResponse } from 'next/server';
import { discoverBusinesses, getBusinessById, searchBusinesses } from './discover';
import type { BusinessCategory, DiscoverFilters } from './types';

// ─── GET /api/discover ───
// Query params: category, location, hasWebsite, minRating, page, limit, q (search)
export async function handleDiscoverGET(req: Request) {
  const url = new URL(req.url);
  const q = url.searchParams.get('q');

  // If search query provided, return search results
  if (q) {
    const results = searchBusinesses(q);
    return NextResponse.json({
      success: true,
      data: {
        businesses: results,
        total: results.length,
        page: 1,
        limit: results.length,
        totalPages: 1,
      },
    });
  }

  const filters: DiscoverFilters = {};

  const category = url.searchParams.get('category');
  if (category) filters.category = category as BusinessCategory;

  const location = url.searchParams.get('location');
  if (location) filters.location = location;

  const hasWebsite = url.searchParams.get('hasWebsite');
  if (hasWebsite !== null) filters.hasWebsite = hasWebsite === 'true';

  const minRating = url.searchParams.get('minRating');
  if (minRating) filters.minRating = parseFloat(minRating);

  const page = url.searchParams.get('page');
  if (page) filters.page = parseInt(page, 10);

  const limit = url.searchParams.get('limit');
  if (limit) filters.limit = parseInt(limit, 10);

  const result = discoverBusinesses(filters);

  return NextResponse.json({
    success: true,
    data: result,
  });
}

// ─── GET /api/discover/[id] ───
export async function handleDiscoverByIdGET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const business = getBusinessById(id);
  if (!business) {
    return NextResponse.json(
      { success: false, error: 'Business not found' },
      { status: 404 }
    );
  }
  return NextResponse.json({
    success: true,
    data: business,
  });
}
