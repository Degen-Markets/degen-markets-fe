import { Address } from "@/app/lib/utils/bets/types";

export interface Player {
  address: Address;
  points: number;
  twitterUsername?: string;
  twitterPfpUrl?: string;
}
