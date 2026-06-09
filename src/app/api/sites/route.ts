import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const dynamic = 'force-dynamic';

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const sites = await prisma.site.findMany({
    where: { userId: session.user.id },
    include: { lead: true },
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json({ sites });
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const { leadId, template } = await req.json();
  const lead = await prisma.lead.findUnique({ where: { id: leadId } });
  if (!lead) {
    return NextResponse.json({ error: 'Lead not found' }, { status: 404 });
  }
  const subdomain = lead.businessName.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');
  const site = await prisma.site.create({
    data: {
      userId: session.user.id,
      leadId,
      template: template || 'service',
      subdomain,
      status: 'draft',
    },
  });
  await prisma.lead.update({ where: { id: leadId }, data: { status: 'site_created' } });
  return NextResponse.json({ site }, { status: 201 });
}