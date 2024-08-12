import { Address } from "viem";

export type Player = {
  address: Address;
  betCount: number;
  points: number;
  winCount: number;
};
