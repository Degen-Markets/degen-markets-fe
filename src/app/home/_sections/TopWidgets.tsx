import { FC } from "react";
import Widget from "@/app/components/Widget/Widget";
import WidgetIcon from "@/app/components/Widget/WidgetIcon";
import GradientText from "@/app/components/GradientText";

const TopWidgets: FC = () => {
  const widgetsData = [
    {
      title: "POOLS ON SOLANA",
      icon: <WidgetIcon name="pools" alt="Bull" className="bg-purple-light" />,
      cta: { text: "View", link: "/pools" },
      bg: "bg-pools-x.png",
      comingSoon: false,
    },
    {
      title: "$DGM AIRDROP",
      icon: <WidgetIcon name="airdrop" alt="Bull" className="bg-green-dark" />,
      cta: { text: "View", link: "https://twitter.com/DEGEN_MARKETS" },
      bg: "bg-airdrop.png",
      comingSoon: false,
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
      comingSoon: false,
    },
  ];

  return (
    <div className="grid lg:grid-cols-4 gap-4">
      {widgetsData.map((widget, index) => (
        <div key={index} className="relative">
          {widget.comingSoon && (
            <div className="absolute cursor-not-allowed inset-0 rounded-lg bg-black-main bg-opacity-90 flex items-center z-50 justify-center text-white text-2xl font-bold">
              <GradientText>Coming Soon</GradientText>
            </div>
          )}
          <Widget
            title={widget.title}
            icon={widget.icon}
            cta={widget.cta}
            bg={widget.bg}
            comingSoon={widget.comingSoon}
          />
        </div>
      ))}
    </div>
  );
};

export default TopWidgets;
