import { ACTIONS_CORS_HEADERS, ActionsJson } from "@solana/actions";
import { ACTION_API_PATH } from "../config/api";
import { NextResponse } from "next/server";

export const GET = async () => {
  const payload = {
    name: "BetAI",
    symbol: "BETAI",
    description:
      "BETAI tokenises Tiresias and operates as the ecosystem coin of betting against AI on degenmarkets.com",
    image: "https://degenmarkets.com/tiresias.png",
    showName: true,
    createdOn: "spl-token-cli",
    twitter: "https://x.com/TiresiasAI",
    website: "https://degenmarkets.com/",
  };

  return Response.json(payload, {
    headers: ACTIONS_CORS_HEADERS,
  });
};

export const OPTIONS = GET;
