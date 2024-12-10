import { FC } from "react";
import IconProps from "@/app/types/Icon";

const SvgComponent: FC<IconProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 8V4H8M18 8H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2ZM2 14h2m16 0h2m-7-1v2m-6-2v2"
    />
  </svg>
);
export default SvgComponent;
