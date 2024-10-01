import IconProps from "@/app/types/Icon";
import { FC } from "react";

const RankingIcon: FC<IconProps> = ({ width = 64, height = 64, ...props }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 300 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_49_50)">
        <path
          d="M152.886 51H147.886C134.079 51 122.886 62.1929 122.886 76V190.571C122.886 204.379 134.079 215.571 147.886 215.571H152.886C166.693 215.571 177.886 204.379 177.886 190.571V76C177.886 62.1929 166.693 51 152.886 51Z"
          fill="url(#paint0_linear_49_50)"
        />
        <path
          d="M218.714 122.314H213.714C199.907 122.314 188.714 133.507 188.714 147.314V190.571C188.714 204.379 199.907 215.571 213.714 215.571H218.714C232.521 215.571 243.714 204.379 243.714 190.571V147.314C243.714 133.507 232.521 122.314 218.714 122.314Z"
          fill="url(#paint1_linear_49_50)"
        />
        <path
          d="M87.0571 98.1771H82.0571C68.25 98.1771 57.0571 109.37 57.0571 123.177V190.571C57.0571 204.379 68.25 215.571 82.0571 215.571H87.0571C100.864 215.571 112.057 204.379 112.057 190.571V123.177C112.057 109.37 100.864 98.1771 87.0571 98.1771Z"
          fill="url(#paint2_linear_49_50)"
        />
        <g filter="url(#filter0_bd_49_50)">
          <rect
            x="265"
            y="189"
            width="55"
            height="230"
            rx="25"
            transform="rotate(90 265 189)"
            fill="url(#paint3_linear_49_50)"
            shapeRendering="crispEdges"
          />
          <rect
            x="264.6"
            y="189.4"
            width="54.2"
            height="229.2"
            rx="24.6"
            transform="rotate(90 264.6 189.4)"
            stroke="url(#paint4_linear_49_50)"
            strokeWidth="0.8"
            shapeRendering="crispEdges"
          />
        </g>
      </g>
      <defs>
        <filter
          id="filter0_bd_49_50"
          x="25"
          y="179"
          width="250"
          height="75"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feGaussianBlur in="BackgroundImageFix" stdDeviation="5" />
          <feComposite
            in2="SourceAlpha"
            operator="in"
            result="effect1_backgroundBlur_49_50"
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
            in2="effect1_backgroundBlur_49_50"
            result="effect2_dropShadow_49_50"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect2_dropShadow_49_50"
            result="shape"
          />
        </filter>
        <linearGradient
          id="paint0_linear_49_50"
          x1="122.886"
          y1="52.497"
          x2="206.11"
          y2="197.922"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#BDBDFF" />
          <stop offset="1" stopColor="#8B7DEC" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_49_50"
          x1="188.875"
          y1="122.314"
          x2="262.445"
          y2="196.949"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#BDBDFF" />
          <stop offset="1" stopColor="#8B7DEC" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_49_50"
          x1="60.994"
          y1="98.1771"
          x2="130.177"
          y2="200.685"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#BDBDFF" />
          <stop offset="1" stopColor="#8B7DEC" />
        </linearGradient>
        <linearGradient
          id="paint3_linear_49_50"
          x1="256.75"
          y1="442"
          x2="371.848"
          y2="415.673"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" stopOpacity="0.2" />
          <stop offset="1" stopColor="white" stopOpacity="0.5" />
        </linearGradient>
        <linearGradient
          id="paint4_linear_49_50"
          x1="314.5"
          y1="442"
          x2="203.439"
          y2="410.278"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" stopOpacity="0" />
          <stop offset="1" stopColor="white" />
        </linearGradient>
        <clipPath id="clip0_49_50">
          <rect width="300" height="300" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default RankingIcon;
