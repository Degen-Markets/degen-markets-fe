import { FC } from "react";
import IconProps from "@/app/types/Icon";

interface IconWithOrderProps extends IconProps {
  order: number;
}

const Icon: FC<IconWithOrderProps> = ({ order, width = 64, height = 64 }) => {
  return order <= 3 ? (
    <TopThreeIcon width={width} height={height} />
  ) : (
    <DefaultIcon width={width} height={height} />
  );
};

const TopThreeIcon: FC<{ width: number; height: number }> = ({
  width,
  height,
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 148 145"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g filter="url(#filter0_f_406_202)">
      <ellipse
        cx="74"
        cy="72.3612"
        rx="30"
        ry="28.3612"
        fill="url(#paint0_linear_406_202)"
      />
    </g>
    <path
      d="M92.0414 92.5023V108.268C92.0414 110.245 91.0655 112.015 89.5348 113.172C87.8398 114.453 85.3332 114.197 83.7888 112.756L78.7072 108.015C76.0533 105.556 71.7798 105.556 69.1431 108.015L64.4039 112.437C62.6609 114.063 59.7263 114.136 58.11 112.402C57.0793 111.296 56.4526 109.849 56.4526 108.265V92.4991C56.4526 89.0169 59.4797 86.1929 63.2122 86.1929H85.2818C89.0143 86.1929 92.0414 89.0169 92.0414 92.4991V92.5023Z"
      fill="url(#paint1_linear_406_202)"
    />
    <g filter="url(#filter1_bd_406_202)">
      <ellipse
        cx="74.0172"
        cy="72.3814"
        rx="28.4211"
        ry="26.8685"
        fill="url(#paint2_linear_406_202)"
        shapeRendering="crispEdges"
      />
      <path
        d="M101.938 72.3814C101.938 86.9182 89.4645 98.7499 74.0172 98.7499C58.57 98.7499 46.0962 86.9182 46.0962 72.3814C46.0962 57.8446 58.57 46.0129 74.0172 46.0129C89.4645 46.0129 101.938 57.8446 101.938 72.3814Z"
        stroke="url(#paint3_linear_406_202)"
        shapeRendering="crispEdges"
      />
    </g>
    <defs>
      <filter
        id="filter0_f_406_202"
        x="0"
        y="0"
        width="148"
        height="144.722"
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
          result="effect1_foregroundBlur_406_202"
        />
      </filter>
      <filter
        id="filter1_bd_406_202"
        x="35.5962"
        y="35.5129"
        width="76.8423"
        height="73.7371"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feGaussianBlur in="BackgroundImageFix" stdDeviation="5" />
        <feComposite
          in2="SourceAlpha"
          operator="in"
          result="effect1_backgroundBlur_406_202"
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
          in2="effect1_backgroundBlur_406_202"
          result="effect2_dropShadow_406_202"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect2_dropShadow_406_202"
          result="shape"
        />
      </filter>
      <filter
        id="filter2_di_406_202"
        x="65.8687"
        y="60.8152"
        width="14.0527"
        height="26.5918"
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
          result="effect1_dropShadow_406_202"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_406_202"
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
          result="effect2_innerShadow_406_202"
        />
      </filter>
      <linearGradient
        id="paint0_linear_406_202"
        x1="44"
        y1="44"
        x2="100.633"
        y2="103.905"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#BDBDFF" stopOpacity="0.4" />
        <stop offset="1" stopColor="#8B7DEC" stopOpacity="0.4" />
      </linearGradient>
      <linearGradient
        id="paint1_linear_406_202"
        x1="56.4781"
        y1="86.3212"
        x2="91.8355"
        y2="115.788"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#BDBDFF" />
        <stop offset="1" stopColor="#8B7DEC" />
      </linearGradient>
      <linearGradient
        id="paint2_linear_406_202"
        x1="37.0699"
        y1="104.624"
        x2="98.9242"
        y2="42.0398"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="white" stopOpacity="0.2" />
        <stop offset="1" stopColor="white" stopOpacity="0.5" />
      </linearGradient>
      <linearGradient
        id="paint3_linear_406_202"
        x1="96.7541"
        y1="104.624"
        x2="48.9389"
        y2="44.2107"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="white" stopOpacity="0" />
        <stop offset="1" stopColor="white" />
      </linearGradient>
      <linearGradient
        id="paint4_linear_406_202"
        x1="71.2371"
        y1="84.985"
        x2="82.895"
        y2="59.372"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="white" stopOpacity="0.2" />
        <stop offset="1" stopColor="white" stopOpacity="0.5" />
      </linearGradient>
    </defs>
  </svg>
);

const DefaultIcon: FC<{ width: number; height: number }> = ({
  width,
  height,
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 278 278"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
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
        <stop stopColor="#BDBDFF" />
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
        <stop stopColor="white" stopOpacity="0.2" />
        <stop offset="1" stopColor="white" stopOpacity="0.5" />
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

const RankIcon: FC<IconProps & { order: number }> = ({
  width = 60,
  height = 70,
  order,
}) => {
  const iconWidth = order > 3 ? width - 36 : width;
  const iconHeight = order > 3 ? height - 36 : height;

  return (
    <div
      className="relative"
      style={{ width: `${iconWidth}px`, height: `${iconHeight}px` }}
    >
      <Icon order={order} height={iconWidth} width={iconWidth} />
      <span className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 drop-shadow-md opacity-70 font-bold">
        {order}
      </span>
    </div>
  );
};

export default RankIcon;
