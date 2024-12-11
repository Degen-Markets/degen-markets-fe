export interface TabsVerticalProps {
  tabs: Tab[];
}

export interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
}
