import { FC } from "react";
import IconProps from "@/app/types/Icon";

interface IconWithOrderProps extends IconProps {
  order: number;
}

const Icon: FC<IconWithOrderProps> = ({ order, ...props }) => {
  return order <= 3 ? <TopThreeIcon {...props} /> : <DefaultIcon {...props} />;
};

export const TopThreeIcon: FC<IconProps> = ({ width, height, ...props }) => (
  <svg
    width={width}
    height={height}
    viewBox={`0 0 300 300`}
    transform="translate(0, 3) scale(0.65)" // Move down by 10px and scale
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#clip0_49_38)">
      <path
        d="M207.132 200.465V253.275C207.132 259.898 204.042 265.827 199.194 269.7C193.827 273.992 185.889 273.135 180.999 268.309L164.907 252.429C156.503 244.189 142.97 244.189 134.621 252.429L119.613 267.239C114.094 272.686 104.801 272.932 99.6825 267.122C96.4186 263.419 94.4342 258.571 94.4342 253.264V200.455C94.4342 188.791 104.02 179.331 115.84 179.331H185.727C197.546 179.331 207.132 188.791 207.132 200.455V200.465Z"
        fill="url(#paint0_linear_49_38)"
      />
      <g filter="url(#filter0_bd_49_38)">
        <circle
          cx="150.054"
          cy="133.068"
          r="90"
          fill="url(#paint1_linear_49_38)"
          shapeRendering="crispEdges"
        />
        <circle
          cx="150.054"
          cy="133.068"
          r="89.5"
          stroke="url(#paint2_linear_49_38)"
          shapeRendering="crispEdges"
        />
      </g>
    </g>
    <defs>
      <filter
        id="filter0_bd_49_38"
        x="50.0542"
        y="33.0677"
        width="200"
        height="200"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feGaussianBlur in="BackgroundImageFix" stdDeviation="5" />
        <feComposite
          in2="SourceAlpha"
          operator="in"
          result="effect1_backgroundBlur_49_38"
        />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="4" />
        <feGaussianBlur stdDeviation="2" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
        />
        <feBlend
          mode="normal"
          in2="effect1_backgroundBlur_49_38"
          result="effect2_dropShadow_49_38"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect2_dropShadow_49_38"
          result="shape"
        />
      </filter>
      <filter
        id="filter1_di_49_38"
        x="127.5"
        y="95.5"
        width="38"
        height="78.5"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="1" />
        <feGaussianBlur stdDeviation="0.75" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_49_38"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_49_38"
          result="shape"
        />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="8" />
        <feGaussianBlur stdDeviation="2" />
        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0"
        />
        <feBlend mode="normal" in2="shape" result="effect2_innerShadow_49_38" />
      </filter>
      <linearGradient
        id="paint0_linear_49_38"
        x1="94.5147"
        y1="179.761"
        x2="211.579"
        y2="271.993"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#BDBDFF" />
        <stop offset="1" stopColor="#8B7DEC" />
      </linearGradient>
      <linearGradient
        id="paint1_linear_49_38"
        x1="33.0542"
        y1="241.068"
        x2="240.054"
        y2="43.0677"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="white" stopOpacity="0.2" />
        <stop offset="1" stopColor="white" stopOpacity="0.5" />
      </linearGradient>
      <linearGradient
        id="paint2_linear_49_38"
        x1="222.054"
        y1="241.068"
        x2="60.0542"
        y2="47.5677"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="white" stopOpacity="0" />
        <stop offset="1" stopColor="white" />
      </linearGradient>
      <linearGradient
        id="paint3_linear_49_38"
        x1="141.25"
        y1="175.286"
        x2="181.73"
        y2="91.2069"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="white" stopOpacity="0.2" />
        <stop offset="1" stopColor="white" stopOpacity="0.5" />
      </linearGradient>
      <clipPath id="clip0_49_38">
        <rect width="300" height="300" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

const DefaultIcon: FC<IconProps> = ({ ...props }) => (
  <svg
    viewBox="0 0 278 278"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g filter="url(#filter0_f_407_14)">
      <circle cx="139" cy="139" r="95" fill="url(#paint0_linear_407_14)" />
    </g>
    <circle cx="166" cy="114" r="90" fill="url(#paint1_linear_407_14)" />
    <g filter="url(#filter1_bd_407_14)">
      <circle
        cx="139.055"
        cy="139.068"
        r="90"
        fill="url(#paint2_linear_407_14)"
        shapeRendering="crispEdges"
      />
      <circle
        cx="139.055"
        cy="139.068"
        r="89.5"
        stroke="url(#paint3_linear_407_14)"
        shapeRendering="crispEdges"
      />
    </g>
    <defs>
      <filter
        id="filter0_f_407_14"
        x="0"
        y="0"
        width="278"
        height="278"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        />
        <feGaussianBlur
          stdDeviation="22"
          result="effect1_foregroundBlur_407_14"
        />
      </filter>
      <filter
        id="filter1_bd_407_14"
        x="39.0547"
        y="39.0679"
        width="200"
        height="200"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feGaussianBlur in="BackgroundImageFix" stdDeviation="5" />
        <feComposite
          in2="SourceAlpha"
          operator="in"
          result="effect1_backgroundBlur_407_14"
        />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="4" />
        <feGaussianBlur stdDeviation="2" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
        />
        <feBlend
          mode="normal"
          in2="effect1_backgroundBlur_407_14"
          result="effect2_dropShadow_407_14"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect2_dropShadow_407_14"
          result="shape"
        />
      </filter>
      <filter
        id="filter2_di_407_14"
        x="99.3965"
        y="100.1"
        width="67.5117"
        height="84.4678"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="1" />
        <feGaussianBlur stdDeviation="0.75" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_407_14"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_407_14"
          result="shape"
        />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="8" />
        <feGaussianBlur stdDeviation="2" />
        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0"
        />
        <feBlend
          mode="normal"
          in2="shape"
          result="effect2_innerShadow_407_14"
        />
      </filter>
      <linearGradient
        id="paint0_linear_407_14"
        x1="44"
        y1="44"
        x2="234"
        y2="234"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#BDBDFF" stopOpacity="0.4" />
        <stop offset="1" stopColor="#8B7DEC" stopOpacity="0.4" />
      </linearGradient>
      <linearGradient
        id="paint1_linear_407_14"
        x1="76"
        y1="24"
        x2="256"
        y2="204"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#BDBDFF" stopOpacity="0.6" />
        <stop offset="1" stopColor="#8B7DEC" />
      </linearGradient>
      <linearGradient
        id="paint2_linear_407_14"
        x1="22.0547"
        y1="247.068"
        x2="229.055"
        y2="49.0679"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="white" stopOpacity="0.5" />
        <stop offset="1" stopColor="white" stopOpacity="0.3" />
      </linearGradient>
      <linearGradient
        id="paint3_linear_407_14"
        x1="211.055"
        y1="247.068"
        x2="49.0547"
        y2="53.5679"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="white" stopOpacity="0" />
        <stop offset="1" stopColor="white" />
      </linearGradient>
      <linearGradient
        id="paint4_linear_407_14"
        x1="124.15"
        y1="216.786"
        x2="196.128"
        y2="57.588"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="white" stopOpacity="0.2" />
        <stop offset="1" stopColor="white" stopOpacity="0.5" />
      </linearGradient>
    </defs>
  </svg>
);

const PositionIcon: FC<IconProps & { order: number }> = ({
  order,
  width = "64",
  height = "64",
  ...props
}) => {
  const iconWidth = order > 3 ? (width as number) - 36 : (width as number);
  const iconHeight = order > 3 ? (height as number) - 36 : (height as number);

  return (
    <div
      className="relative"
      style={{ width: `${iconWidth}px`, height: `${iconHeight}px` }}
    >
      <Icon order={order} {...props} />{" "}
      <span className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 drop-shadow-md font-bold">
        {order}
      </span>
    </div>
  );
};

export default PositionIcon;
