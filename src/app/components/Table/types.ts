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
