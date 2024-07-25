import { FC, ReactElement } from "react";
import Link from "next/link";
import WidgetIcon from "@/app/components/Widget/WidgetIcon";
import { Button } from "@/app/components/Button";

export interface CTA {
  text: string;
  link: string;
  target?: "_blank" | "_self" | "_top" | "_parent";
}
interface WidgetProps {
  title: string;
  icon: ReactElement<typeof WidgetIcon>;
  cta: CTA;
  bg: string;
}

const Widget: FC<WidgetProps> = ({ title, icon, cta, bg }) => {
  return (
    <div
      className="relative text-white grid grid-cols-3 gap-4 items-center py-9 pl-2 uppercase rounded-lg bg-cover"
      style={{ backgroundImage: `url(/top-widgets/${bg})` }}
    >
      <div className="flex flex-col items-center col-span-2 h-full justify-between">
        <h3 className="font-bold text-2xl">{title}</h3>
        <Link href={cta.link} target={cta.target}>
          <Button size="small" className="rounded-full">
            {cta.text}
          </Button>
        </Link>
      </div>
      <div className="col-span-1">{icon}</div>
    </div>
  );
};

export default Widget;
