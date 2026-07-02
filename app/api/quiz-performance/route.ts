import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/authOptions";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { score, totalPoints, percentage } = body;

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const performance = await prisma.quizPerformance.create({
      data: {
        userId: user.id,
        score,
        totalPoints,
        percentage,
      },
    });

    return NextResponse.json({ success: true, performance });
  } catch (error) {
    console.error("Quiz performance save error:", error);
    return NextResponse.json({ error: "Failed to save performance" }, { status: 500 });
  }
}
