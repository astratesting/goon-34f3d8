import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import type { NextAuthOptions } from "next-auth";

const prisma = new PrismaClient();

const authOptions: NextAuthOptions = { providers: [] };

async function getSession() {
  return await getServerSession(authOptions);
}

export async function GET() {
  const session = await getSession();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const watchlist = await prisma.watchlist.findMany({
    where: { userId: session.user.id },
    orderBy: { addedAt: "desc" },
  });
  return NextResponse.json(watchlist);
}

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { symbol } = await request.json();
  if (!symbol || typeof symbol !== "string") {
    return NextResponse.json({ error: "Invalid symbol" }, { status: 400 });
  }
  const user = await prisma.user.findUnique({ where: { id: session.user.id } });
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
  const watchlistCount = await prisma.watchlist.count({ where: { userId: session.user.id } });
  if (user.tier === "FREE" && watchlistCount >= 5) {
    return NextResponse.json(
      { error: "Free tier limited to 5 watchlist items. Upgrade to Pro for unlimited." },
      { status: 403 }
    );
  }
  try {
    const item = await prisma.watchlist.create({
      data: { userId: session.user.id, symbol: symbol.toUpperCase() },
    });
    return NextResponse.json(item, { status: 201 });
  } catch (error: any) {
    if (error.code === "P2002") {
      return NextResponse.json({ error: "Symbol already in watchlist" }, { status: 400 });
    }
    throw error;
  }
}

export async function DELETE(request: NextRequest) {
  const session = await getSession();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { searchParams } = new URL(request.url);
  const symbol = searchParams.get("symbol");
  if (!symbol) {
    return NextResponse.json({ error: "Symbol required" }, { status: 400 });
  }
  await prisma.watchlist.deleteMany({ where: { userId: session.user.id, symbol } });
  return NextResponse.json({ message: "Removed from watchlist" });
}
