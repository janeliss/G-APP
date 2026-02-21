// src/lib/apiNba.ts
// API-NBA wrapper — field names confirmed against real API response.
// All Zod schemas match the actual JSON structure from GET /games.

import { z } from "zod";

const BASE_URL = "https://api-nba-v1.p.rapidapi.com";

function getHeaders(): Record<string, string> {
  const key = process.env.RAPIDAPI_KEY;
  const host = process.env.RAPIDAPI_HOST ?? "api-nba-v1.p.rapidapi.com";
  if (!key) throw new Error("RAPIDAPI_KEY is not set in environment variables");
  return {
    "X-RapidAPI-Key": key,
    "X-RapidAPI-Host": host,
  };
}

// ---------------------------------------------------------------------------
// Zod schemas — field names taken directly from real GET /games response
// ---------------------------------------------------------------------------

// Team object inside teams.visitors / teams.home
const ApiTeamSchema = z.object({
  id:       z.number(),
  name:     z.string(),      // e.g. "Charlotte Hornets"
  nickname: z.string(),      // e.g. "Hornets"
  code:     z.string(),      // e.g. "CHA"
  logo:     z.string().nullable().optional(),
});

// Score sub-object (visitors or home)
const ApiScoreSideSchema = z.object({
  win:       z.number().nullable().optional(),
  loss:      z.number().nullable().optional(),
  series:    z.object({ win: z.number(), loss: z.number() }).optional(),
  linescore: z.array(z.string()).optional(),
  points:    z.number().nullable(),   // null when game hasn't started
});

// Full game object
const ApiGameSchema = z.object({
  id:     z.number(),
  league: z.string(),          // "standard" | "africa" | "vegas" …
  season: z.number(),          // e.g. 2021 (maps to 2021-22 season)

  date: z.object({
    start:    z.string(),                       // ISO UTC  "2022-02-12T00:00:00.000Z"
    end:      z.string().nullable().optional(),
    duration: z.string().nullable().optional(), // "2:08"
  }),

  stage: z.number().optional(),

  status: z.object({
    clock:    z.string().nullable(),   // "4:32" when live, null otherwise
    halftime: z.boolean(),
    short:    z.number(),              // 1 = NS, 2 = Live, 3 = FT
    long:     z.string(),             // "Not Started" | "Finished" | quarter label
  }),

  periods: z.object({
    current:     z.number(),
    total:       z.number(),
    endOfPeriod: z.boolean(),
  }),

  arena: z.object({
    name:    z.string().nullable().optional(),
    city:    z.string().nullable().optional(),
    state:   z.string().nullable().optional(),
    country: z.string().nullable().optional(),
  }).optional(),

  teams: z.object({
    visitors: ApiTeamSchema,   // away team
    home:     ApiTeamSchema,
  }),

  scores: z.object({
    visitors: ApiScoreSideSchema,
    home:     ApiScoreSideSchema,
  }),

  officials:   z.array(z.string()).optional(),
  timesTied:   z.number().nullable().optional(),
  leadChanges: z.number().nullable().optional(),
  nugget:      z.string().nullable().optional(),
});

// Top-level wrapper
const GamesResponseSchema = z.object({
  get:        z.string().optional(),
  parameters: z.record(z.unknown()).optional(),
  errors:     z.array(z.unknown()).optional(),
  results:    z.number(),
  response:   z.array(ApiGameSchema),
});

export type ApiGame = z.infer<typeof ApiGameSchema>;
export type ApiTeam = z.infer<typeof ApiTeamSchema>;

// ---------------------------------------------------------------------------
// Status helpers
// ---------------------------------------------------------------------------

/** Map status.short → consistent string stored in DB */
export function shortToStatus(short: number): "NS" | "LIVE" | "FT" | "UNKNOWN" {
  if (short === 1) return "NS";
  if (short === 2) return "LIVE";
  if (short === 3) return "FT";
  return "UNKNOWN";
}

// ---------------------------------------------------------------------------
// Base fetch
// ---------------------------------------------------------------------------

async function apiFetch(path: string, params: Record<string, string>) {
  const url = new URL(`${BASE_URL}${path}`);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));

  const res = await fetch(url.toString(), {
    method: "GET",
    headers: getHeaders(),
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(
      `API-NBA ${path} returned HTTP ${res.status}: ${res.statusText}`
    );
  }

  return res.json();
}

// ---------------------------------------------------------------------------
// Public API functions
// ---------------------------------------------------------------------------

/**
 * Fetch all standard-league NBA games for a given date.
 * @param date  YYYY-MM-DD (America/Chicago date)
 */
export async function fetchGames(date: string): Promise<ApiGame[]> {
  const raw = await apiFetch("/games", { date });

  const parsed = GamesResponseSchema.safeParse(raw);
  if (!parsed.success) {
    console.error(
      "[apiNba] Games response failed validation:",
      parsed.error.flatten()
    );
    throw new Error("Invalid response shape from API-NBA /games");
  }

  // Filter to standard league only (excludes summer league, G-League, Africa games)
  return parsed.data.response.filter((g) => g.league === "standard");
}
