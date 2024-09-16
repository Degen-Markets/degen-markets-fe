import { Address } from "@/app/lib/utils/bets/types";

export type Player = {
  address: Address;
  points: number;
  twitterUsername?: string;
  twitterPfpUrl?: string;
};
