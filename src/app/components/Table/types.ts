export interface TableColumn {
  key: string;
  label: string;
}

export interface TableProps {
  columns: TableColumn[];
  data: Record<string, any>[];
  isExpandable: boolean;
  renderExpandableContent?: (row: Record<string, any>) => React.ReactNode;
}
