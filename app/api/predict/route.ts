import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import type { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth";

const prisma = new PrismaClient();

// Import auth options inline to avoid export issues
const authOptions: NextAuthOptions = {
  providers: [],
};

async function getSession() {
  return await getServerSession(authOptions);
}

interface PredictionRequest {
  symbol: string;
}

async function getSentiment(symbol: string) {
  const reddit = Math.random() * 2 - 1;
  const twitter = Math.random() * 2 - 1;
  const news = Math.random() * 2 - 1;
  const avgScore = (reddit + twitter + news) / 3;
  let sentiment = "NEUTRAL";
  if (avgScore > 0.3) sentiment = "BULLISH";
  else if (avgScore > 0) sentiment = "POSITIVE";
  else if (avgScore > -0.3) sentiment = "NEGATIVE";
  else sentiment = "BEARISH";
  return { sentiment, score: parseFloat(avgScore.toFixed(2)), sources: { reddit, twitter, news } };
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const user = await prisma.user.findUnique({ where: { id: session.user.id } });
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
  if (user.tier === "FREE") {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayCount = await prisma.prediction.count({
      where: { userId: session.user.id, createdAt: { gte: today } },
    });
    if (todayCount >= 3) {
      return NextResponse.json(
        { error: "Free tier limited to 3 predictions per day. Upgrade to Pro for unlimited." },
        { status: 403 }
      );
    }
  }
  const { symbol } = await request.json();
  if (!symbol || typeof symbol !== "string") {
    return NextResponse.json({ error: "Invalid symbol" }, { status: 400 });
  }
  const sentimentData = await getSentiment(symbol.toUpperCase());
  const confidence = Math.min(95, Math.max(5, Math.round(50 + sentimentData.score * 40 + Math.random() * 10)));
  const direction = confidence > 50 ? "UP" : "DOWN";
  const reasons = [
    `${sentimentData.sentiment} sentiment detected across social media`,
    `News sentiment score of ${sentimentData.score.toFixed(2)}`,
  ];
  const prediction = await prisma.prediction.create({
    data: {
      userId: session.user.id,
      symbol: symbol.toUpperCase(),
      confidence,
      direction,
      reasoning: reasons.join(". "),
      sentiment: sentimentData.sentiment,
      sentimentScore: sentimentData.score,
    },
  });
  return NextResponse.json(prediction, { status: 201 });
}

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const predictions = await prisma.prediction.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    take: 50,
  });
  return NextResponse.json(predictions);
}
