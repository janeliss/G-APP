// src/lib/refreshService.ts
// Orchestrates: fetch → upsert teams/games → daily brief → refresh log.
// Injuries skipped (free-tier plan — endpoint not available).
// Schema is injury-ready for future upgrade.

import { prisma } from "./db";
import { fetchGames, shortToStatus, ApiGame, ApiTeam } from "./apiNba";

// ---------------------------------------------------------------------------
// Timezone helper — "today" in America/Chicago
// ---------------------------------------------------------------------------

export function getTodayChicago(): string {
  // en-CA locale produces YYYY-MM-DD format
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Chicago",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

// ---------------------------------------------------------------------------
// Rate-limit guard — block duplicate refresh within 5 minutes
// ---------------------------------------------------------------------------

async function isRateLimited(date: string): Promise<boolean> {
  const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
  const recent = await prisma.refreshLog.findFirst({
    where: {
      date,
      success: true,
      startedAt: { gte: fiveMinutesAgo },
    },
    orderBy: { startedAt: "desc" },
  });
  return recent !== null;
}

// ---------------------------------------------------------------------------
// Upsert helpers
// ---------------------------------------------------------------------------

/** Derive city from team name + nickname. e.g. "Golden State Warriors" → "Golden State" */
function deriveCity(name: string, nickname: string): string {
  return name.endsWith(` ${nickname}`)
    ? name.slice(0, -(nickname.length + 1)).trim()
    : name;
}

async function upsertTeam(team: ApiTeam): Promise<void> {
  const city = deriveCity(team.name, team.nickname);
  await prisma.team.upsert({
    where: { id: team.id },
    update: {
      name:     team.name,
      nickname: team.nickname,
      logo:     team.logo ?? null,
    },
    create: {
      id:       team.id,
      name:     team.name,
      nickname: team.nickname,
      city,
      logo:     team.logo ?? null,
    },
  });
}

async function upsertGame(game: ApiGame, date: string): Promise<void> {
  // Teams must exist before game FK constraints
  await upsertTeam(game.teams.visitors);
  await upsertTeam(game.teams.home);

  const status     = shortToStatus(game.status.short);
  const awayScore  = game.scores.visitors.points ?? null;
  const homeScore  = game.scores.home.points ?? null;

  await prisma.game.upsert({
    where: { id: game.id },
    update: {
      status,
      statusLong:  game.status.long,
      clock:       game.status.clock ?? null,
      period:      game.periods.current,
      awayScore,
      homeScore,
    },
    create: {
      id:          game.id,
      date,
      startTimeUtc: game.date.start,
      status,
      statusLong:  game.status.long,
      clock:       game.status.clock ?? null,
      period:      game.periods.current,
      awayTeamId:  game.teams.visitors.id,
      homeTeamId:  game.teams.home.id,
      awayScore,
      homeScore,
      season:      game.season,
      league:      game.league,
    },
  });
}

// ---------------------------------------------------------------------------
// Daily Brief
// ---------------------------------------------------------------------------

async function generateDailyBrief(
  date: string,
  gamesCount: number
): Promise<void> {
  await prisma.dailyBrief.upsert({
    where: { date },
    update: {
      gamesCount,
      injuriesCount: 0,
      changesCount:  0,
      notableReturns: "[]",
    },
    create: {
      date,
      gamesCount,
      injuriesCount: 0,
      changesCount:  0,
      notableReturns: "[]",
    },
  });
}

// ---------------------------------------------------------------------------
// Public refresh entry point
// ---------------------------------------------------------------------------

export type RefreshResult = {
  ok:           boolean;
  date:         string;
  gamesCount:   number;
  injuriesCount: number;
  changesCount:  number;
  rateLimited?: boolean;
  error?:       string;
};

export async function runRefresh(): Promise<RefreshResult> {
  const date = getTodayChicago();

  // --- Rate limit check ---
  if (await isRateLimited(date)) {
    return {
      ok:            false,
      date,
      gamesCount:    0,
      injuriesCount: 0,
      changesCount:  0,
      rateLimited:   true,
    };
  }

  // --- Start refresh log ---
  const log = await prisma.refreshLog.create({ data: { date } });

  try {
    // 1. Fetch games from API-NBA
    const games = await fetchGames(date);

    // 2. Upsert teams + games
    for (const game of games) {
      await upsertGame(game, date);
    }

    // 3. Generate daily brief
    await generateDailyBrief(date, games.length);

    // 4. Mark log success
    await prisma.refreshLog.update({
      where: { id: log.id },
      data: {
        completedAt:   new Date(),
        success:       true,
        gamesCount:    games.length,
        injuriesCount: 0,
        changesCount:  0,
      },
    });

    return {
      ok:            true,
      date,
      gamesCount:    games.length,
      injuriesCount: 0,
      changesCount:  0,
    };

  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[refreshService] Refresh failed:", message);

    await prisma.refreshLog.update({
      where: { id: log.id },
      data: {
        completedAt:  new Date(),
        success:      false,
        errorMessage: message,
      },
    });

    return {
      ok:            false,
      date,
      gamesCount:    0,
      injuriesCount: 0,
      changesCount:  0,
      error:         message,
    };
  }
}
