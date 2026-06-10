import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import {
  getLeads,
  getLeadById,
  createLead,
  updateLead,
  deleteLead,
  getLeadStats,
} from './leads';
import type { LeadStatus } from './types';

// ─── Helper: get authenticated user or return 401 ───
async function requireAuth() {
  const session = await auth();
  if (!session?.user?.id) {
    return null;
  }
  return session.user.id;
}

// ─── GET /api/leads ───
export async function handleLeadsGET(req: Request) {
  const userId = await requireAuth();
  if (!userId) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  const url = new URL(req.url);
  const status = url.searchParams.get('status');
  const stats = url.searchParams.get('stats');

  if (stats === 'true') {
    const leadStats = await getLeadStats(userId);
    return NextResponse.json({ success: true, data: leadStats });
  }

  const leads = status
    ? await (await import('./leads')).getLeadsByStatus(userId, status as LeadStatus)
    : await getLeads(userId);

  return NextResponse.json({ success: true, data: leads });
}

// ─── POST /api/leads ───
export async function handleLeadsPOST(req: Request) {
  const userId = await requireAuth();
  if (!userId) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

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
  if (!input.address || typeof input.address !== 'string') {
    return NextResponse.json(
      { success: false, error: 'address is required' },
      { status: 400 }
    );
  }

  const lead = await createLead(userId, {
    businessName: input.businessName as string,
    category: input.category as string,
    address: input.address as string,
    phone: input.phone ? String(input.phone) : undefined,
    email: input.email ? String(input.email) : undefined,
    hasWebsite: input.hasWebsite === true,
    status: input.status ? (input.status as LeadStatus) : undefined,
    notes: input.notes ? String(input.notes) : undefined,
  });

  return NextResponse.json({ success: true, data: lead }, { status: 201 });
}

// ─── GET /api/leads/[id] ───
export async function handleLeadByIdGET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const userId = await requireAuth();
  if (!userId) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const lead = await getLeadById(userId, id);
  if (!lead) {
    return NextResponse.json(
      { success: false, error: 'Lead not found' },
      { status: 404 }
    );
  }
  return NextResponse.json({ success: true, data: lead });
}

// ─── PATCH /api/leads/[id] ───
export async function handleLeadByIdPATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const userId = await requireAuth();
  if (!userId) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;

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
  const lead = await updateLead(userId, id, {
    status: input.status ? (input.status as LeadStatus) : undefined,
    notes: input.notes !== undefined ? String(input.notes) : undefined,
    phone: input.phone !== undefined ? String(input.phone) : undefined,
    email: input.email !== undefined ? String(input.email) : undefined,
  });

  if (!lead) {
    return NextResponse.json(
      { success: false, error: 'Lead not found' },
      { status: 404 }
    );
  }
  return NextResponse.json({ success: true, data: lead });
}

// ─── DELETE /api/leads/[id] ───
export async function handleLeadByIdDELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const userId = await requireAuth();
  if (!userId) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const deleted = await deleteLead(userId, id);
  if (!deleted) {
    return NextResponse.json(
      { success: false, error: 'Lead not found' },
      { status: 404 }
    );
  }
  return NextResponse.json({ success: true, data: { deleted: true } });
}
