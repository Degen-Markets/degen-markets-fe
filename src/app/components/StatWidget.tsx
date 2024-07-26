import { FC, ReactElement } from "react";
import GradientText from "@/app/components/WalletMenu/GradientText";
import GradientBorder from "@/app/components/GradiantBorder";

interface StatWidgetProps {
  total: number;
  icon: ReactElement;
  title: string;
}

const StatWidget: FC<StatWidgetProps> = ({ total, icon, title }) => {
  return (
    <div className="bg-blue-light bg-opacity-30 rounded-xl border border-white py-2 px-3">
      <div className="flex items-center gap-x-4 text-xl font-bold pb-1 w-full">
        {icon}
        <span className="text-lg">{title}</span>
      </div>
      <GradientBorder width={60} />
      <GradientText className="text-6xl font-bold mt-8">{total}</GradientText>
    </div>
  );
};

export default StatWidget;
