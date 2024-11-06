import { ReactNode } from "react";

interface PoolCardSectionProps<T> {
  data: T[];
  renderItem: (item: T, index: number) => ReactNode;
  className: string;
}

function PoolCardSection<T>({
  data,
  renderItem,
  className,
}: PoolCardSectionProps<T>) {
  return (
    <section className={className}>
      {data.map((item, index) => renderItem(item, index))}
    </section>
  );
}

export default PoolCardSection;
