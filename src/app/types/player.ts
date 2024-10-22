export type Player = {
  address: string;
  points: number;
  twitterUsername?: string;
  twitterPfpUrl?: string;
};

interface Pool {
  address: string;
  title: string;
  totalValue: string;
  image: string;
}

interface Option {
  address: string;
  title: string;
  totalValue: string;
}

export interface PoolEntry {
  address: string;
  value: string;
  pool: Pool;
  option: Option;
}

export interface PlayerStats {
  poolEntries: PoolEntry[];
}
