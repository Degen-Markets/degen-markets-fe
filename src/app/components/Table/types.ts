import { BetResponse } from "@/app/lib/utils/bets/types";

export interface TableColumn {
  key: string;
  label: string;
}

export interface TableProps<T> {
  columns: TableColumn[];
  data: T[];
  isExpandable: boolean;
  renderExpandableContent?: (row: T) => React.ReactNode;
}

export interface BetTableRow {
  creator: JSX.Element;
  stake: JSX.Element;
  prediction: JSX.Element;
  vs: JSX.Element;
  outcome: JSX.Element;
  profitLoss: JSX.Element;
  acceptor: JSX.Element;
  bet: BetResponse;
}
