export interface FeatureTabsProps {
  tabs: Tab[];
}

export interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
}
