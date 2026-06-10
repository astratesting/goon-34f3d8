import { NextResponse } from 'next/server';
import { generateWebsite } from './generator';
import type { WebsiteGenerationRequest, BusinessCategory, WebsiteTemplate } from './types';

// ─── POST /api/generate ───
export async function handleGeneratePOST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { success: false, error: 'Invalid JSON body' },
      { status: 400 }
    );
  }

  const input = body as Record<string, unknown>;

  // Validate required fields
  if (!input.businessName || typeof input.businessName !== 'string') {
    return NextResponse.json(
      { success: false, error: 'businessName is required' },
      { status: 400 }
    );
  }
  if (!input.category || typeof input.category !== 'string') {
    return NextResponse.json(
      { success: false, error: 'category is required' },
      { status: 400 }
    );
  }
  if (!input.phone || typeof input.phone !== 'string') {
    return NextResponse.json(
      { success: false, error: 'phone is required' },
      { status: 400 }
    );
  }
  if (!input.address || typeof input.address !== 'string') {
    return NextResponse.json(
      { success: false, error: 'address is required' },
      { status: 400 }
    );
  }

  const genReq: WebsiteGenerationRequest = {
    businessId: input.businessId ? String(input.businessId) : `biz_${Date.now()}`,
    businessName: input.businessName as string,
    category: input.category as BusinessCategory,
    phone: input.phone as string,
    email: input.email ? String(input.email) : null,
    address: input.address as string,
    description: input.description ? String(input.description) : undefined,
    template: input.template ? (input.template as WebsiteTemplate) : undefined,
  };

  const result = generateWebsite(genReq);

  return NextResponse.json({
    success: true,
    data: result,
  }, { status: 201 });
}
