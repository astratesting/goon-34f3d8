import prisma from './db';
import type { CreateLeadInput, UpdateLeadInput, Lead, LeadStatus } from './types';

// ─── Lead CRUD Operations ───

export async function getLeads(userId: string): Promise<Lead[]> {
  const leads = await prisma.lead.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  });
  return leads.map((l) => ({
    id: l.id,
    userId: l.userId,
    businessName: l.businessName,
    category: l.category,
    address: l.address,
    phone: l.phone,
    email: l.email,
    hasWebsite: l.hasWebsite,
    status: l.status as LeadStatus,
    notes: l.notes,
    createdAt: l.createdAt.toISOString(),
    updatedAt: l.updatedAt.toISOString(),
  }));
}

export async function getLeadById(userId: string, leadId: string): Promise<Lead | null> {
  const lead = await prisma.lead.findFirst({
    where: { id: leadId, userId },
  });
  if (!lead) return null;
  return {
    id: lead.id,
    userId: lead.userId,
    businessName: lead.businessName,
    category: lead.category,
    address: lead.address,
    phone: lead.phone,
    email: lead.email,
    hasWebsite: lead.hasWebsite,
    status: lead.status as LeadStatus,
    notes: lead.notes,
    createdAt: lead.createdAt.toISOString(),
    updatedAt: lead.updatedAt.toISOString(),
  };
}

export async function createLead(userId: string, input: CreateLeadInput): Promise<Lead> {
  const lead = await prisma.lead.create({
    data: {
      userId,
      businessName: input.businessName,
      category: input.category,
      address: input.address,
      phone: input.phone ?? null,
      email: input.email ?? null,
      hasWebsite: input.hasWebsite ?? false,
      status: input.status ?? 'discovered',
      notes: input.notes ?? null,
    },
  });
  return {
    id: lead.id,
    userId: lead.userId,
    businessName: lead.businessName,
    category: lead.category,
    address: lead.address,
    phone: lead.phone,
    email: lead.email,
    hasWebsite: lead.hasWebsite,
    status: lead.status as LeadStatus,
    notes: lead.notes,
    createdAt: lead.createdAt.toISOString(),
    updatedAt: lead.updatedAt.toISOString(),
  };
}

export async function updateLead(
  userId: string,
  leadId: string,
  input: UpdateLeadInput
): Promise<Lead | null> {
  const existing = await prisma.lead.findFirst({
    where: { id: leadId, userId },
  });
  if (!existing) return null;

  const data: Record<string, unknown> = {};
  if (input.status !== undefined) data.status = input.status;
  if (input.notes !== undefined) data.notes = input.notes;
  if (input.phone !== undefined) data.phone = input.phone;
  if (input.email !== undefined) data.email = input.email;

  const lead = await prisma.lead.update({
    where: { id: leadId },
    data,
  });
  return {
    id: lead.id,
    userId: lead.userId,
    businessName: lead.businessName,
    category: lead.category,
    address: lead.address,
    phone: lead.phone,
    email: lead.email,
    hasWebsite: lead.hasWebsite,
    status: lead.status as LeadStatus,
    notes: lead.notes,
    createdAt: lead.createdAt.toISOString(),
    updatedAt: lead.updatedAt.toISOString(),
  };
}

export async function deleteLead(userId: string, leadId: string): Promise<boolean> {
  const existing = await prisma.lead.findFirst({
    where: { id: leadId, userId },
  });
  if (!existing) return false;
  await prisma.lead.delete({ where: { id: leadId } });
  return true;
}

export async function getLeadsByStatus(userId: string, status: LeadStatus): Promise<Lead[]> {
  const leads = await prisma.lead.findMany({
    where: { userId, status },
    orderBy: { createdAt: 'desc' },
  });
  return leads.map((l) => ({
    id: l.id,
    userId: l.userId,
    businessName: l.businessName,
    category: l.category,
    address: l.address,
    phone: l.phone,
    email: l.email,
    hasWebsite: l.hasWebsite,
    status: l.status as LeadStatus,
    notes: l.notes,
    createdAt: l.createdAt.toISOString(),
    updatedAt: l.updatedAt.toISOString(),
  }));
}

export async function getLeadStats(userId: string) {
  const all = await prisma.lead.findMany({
    where: { userId },
    select: { status: true },
  });

  const byStatus: Record<string, number> = {};
  for (const lead of all) {
    byStatus[lead.status] = (byStatus[lead.status] ?? 0) + 1;
  }

  return {
    total: all.length,
    byStatus,
  };
}
