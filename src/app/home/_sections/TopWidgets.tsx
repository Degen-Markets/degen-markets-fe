import { FC, ReactElement } from "react";
import Widget, { CTA } from "@/app/components/Widget/Widget";
import WidgetIcon from "@/app/components/Widget/WidgetIcon";

interface WidgetData {
  title: string;
  icon: ReactElement;
  cta: CTA;
  bg: string;
}
const TopWidgets: FC<WidgetData[]> = () => {
  const widgetsData = [
    {
      title: "POOLS ON X",
      icon: <WidgetIcon name="pools" alt="Bull" className="bg-purple-light" />,
      cta: { text: "View", link: "/" },
      bg: "bg-pools-x.png",
    },
    {
      title: "$DGM AIRDROP",
      icon: <WidgetIcon name="airdrop" alt="Bull" className="bg-green-dark" />,
      cta: { text: "View", link: "/" },
      bg: "bg-airdrop.png",
    },
    {
      title: "DM US ON X FOR A SURPRISE",
      icon: (
        <WidgetIcon name="twitterX" alt="Bull" className="bg-blue-twitter" />
      ),
      cta: {
        text: "View",
        link: "https://twitter.com/DEGEN_MARKETS",
        target: "_blank",
      },
      bg: "bg-us-election.png",
    },
    {
      title: "BULL OR BEAR",
      icon: <WidgetIcon name="bull" alt="Bull" className="bg-orange-main" />,
      cta: { text: "Play", link: "/create-bet" },
      bg: "bull_or_bear.jpg",
    },
  ];

  return (
    <div className="grid lg:grid-cols-4 gap-4">
      {widgetsData.map((widget, index) => (
        <Widget
          key={index}
          title={widget.title}
          icon={widget.icon}
          cta={widget.cta}
          bg={widget.bg}
        />
      ))}
    </div>
  );
};

export default TopWidgets;
