import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const MOCK_LEADS = [
  { businessName: "Mario's Pizza Palace", category: 'Restaurant', address: '142 Oak Street, Springfield', phone: '(555) 234-5678', email: 'mario@example.com' },
  { businessName: 'Quick Fix Plumbing', category: 'Plumber', address: '88 Maple Ave, Springfield', phone: '(555) 345-6789', email: null },
  { businessName: 'Bright Smile Dental', category: 'Dentist', address: '210 Pine Road, Springfield', phone: '(555) 456-7890', email: 'info@brightsmile.com' },
  { businessName: 'Green Thumb Landscaping', category: 'Landscaping', address: '55 Elm Street, Springfield', phone: '(555) 567-8901', email: null },
  { businessName: 'Ace Auto Repair', category: 'Auto Repair', address: '301 Cedar Lane, Springfield', phone: '(555) 678-9012', email: 'ace@example.com' },
  { businessName: 'Sunny Day Cleaning', category: 'Cleaning Service', address: '77 Birch Blvd, Springfield', phone: '(555) 789-0123', email: null },
  { businessName: 'Paws & Claws Pet Grooming', category: 'Pet Grooming', address: '190 Walnut Way, Springfield', phone: '(555) 890-1234', email: 'paws@example.com' },
  { businessName: 'Heritage Law Office', category: 'Law Office', address: '45 Spruce Street, Springfield', phone: '(555) 901-2345', email: null },
  { businessName: 'Fresh Cuts Barbershop', category: 'Barbershop', address: '123 Willow Drive, Springfield', phone: '(555) 012-3456', email: 'freshcuts@example.com' },
  { businessName: 'Golden Gate Fitness', category: 'Gym', address: '88 Ash Court, Springfield', phone: '(555) 123-4567', email: null },
];

export const dynamic = 'force-dynamic';

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const leads = await prisma.lead.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json({ leads });
}

export async function POST() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const mockLead = MOCK_LEADS[Math.floor(Math.random() * MOCK_LEADS.length)];
  const lead = await prisma.lead.create({
    data: {
      userId: session.user.id,
      ...mockLead,
      status: 'discovered',
    },
  });
  return NextResponse.json({ lead }, { status: 201 });
}