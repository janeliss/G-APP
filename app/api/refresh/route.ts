// app/api/refresh/route.ts
// POST /api/refresh — fetches today's games, upserts to DB, generates daily brief.
// GET  /api/refresh — returns last refresh log for today (status check).

import { NextResponse } from "next/server";
import { runRefresh, getTodayChicago } from "@/lib/refreshService";
import { prisma } from "@/lib/db";

// ---------------------------------------------------------------------------
// POST — trigger a refresh
// ---------------------------------------------------------------------------
export async function POST() {
  try {
    const result = await runRefresh();

    if (result.rateLimited) {
      return NextResponse.json(
        {
          ok:      false,
          message: "Rate limited — refresh already ran within the last 5 minutes.",
          date:    result.date,
        },
        { status: 429 }
      );
    }

    if (!result.ok) {
      return NextResponse.json(
        {
          ok:    false,
          error: result.error ?? "Unknown error",
          date:  result.date,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ok:            true,
      date:          result.date,
      gamesCount:    result.gamesCount,
      injuriesCount: result.injuriesCount,
      changesCount:  result.changesCount,
    });

  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[POST /api/refresh] Unhandled error:", message);
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}

// ---------------------------------------------------------------------------
// GET — return today's last refresh log
// ---------------------------------------------------------------------------
export async function GET() {
  try {
    const date = getTodayChicago();

    const log = await prisma.refreshLog.findFirst({
      where: { date },
      orderBy: { startedAt: "desc" },
    });

    const brief = await prisma.dailyBrief.findUnique({
      where: { date },
    });

    return NextResponse.json({
      date,
      lastRefresh: log
        ? {
            startedAt:    log.startedAt,
            completedAt:  log.completedAt,
            success:      log.success,
            gamesCount:   log.gamesCount,
            injuriesCount: log.injuriesCount,
            changesCount:  log.changesCount,
            error:        log.errorMessage,
          }
        : null,
      brief: brief
        ? {
            gamesCount:    brief.gamesCount,
            injuriesCount: brief.injuriesCount,
            changesCount:  brief.changesCount,
            generatedAt:   brief.generatedAt,
          }
        : null,
    });

  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
