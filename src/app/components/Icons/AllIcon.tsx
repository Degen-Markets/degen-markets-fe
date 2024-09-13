import React, { FC } from "react";
import IconProps from "@/app/types/Icon";

const AllIcon: FC<IconProps> = ({ width = "64", height = "64", style }) => {
  return (
    <svg
      width={width}
      height={height}
      style={style}
      viewBox="0 0 300 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_1_83)">
        <g filter="url(#filter0_bd_1_83)">
          <rect
            x="107.999"
            y="36"
            width="158.295"
            height="158.295"
            rx="25"
            transform="rotate(20 107.999 36)"
            fill="url(#paint0_linear_1_83)"
          />
        </g>
        <g filter="url(#filter1_bd_1_83)">
          <rect
            x="49.2765"
            y="101.429"
            width="158.295"
            height="158.295"
            rx="25"
            fill="url(#paint1_linear_1_83)"
            shape-rendering="crispEdges"
          />
          <rect
            x="49.6765"
            y="101.829"
            width="157.495"
            height="157.495"
            rx="24.6"
            stroke="url(#paint2_linear_1_83)"
            stroke-width="0.8"
            shape-rendering="crispEdges"
          />
        </g>
        <g filter="url(#filter2_di_1_83)">
          <circle
            cx="90.9608"
            cy="182.159"
            r="13.1912"
            fill="url(#paint3_linear_1_83)"
            shape-rendering="crispEdges"
          />
        </g>
        <g filter="url(#filter3_di_1_83)">
          <circle
            cx="128.952"
            cy="182.159"
            r="13.1912"
            fill="url(#paint4_linear_1_83)"
            shape-rendering="crispEdges"
          />
        </g>
        <g filter="url(#filter4_di_1_83)">
          <circle
            cx="166.942"
            cy="182.159"
            r="13.1912"
            fill="url(#paint5_linear_1_83)"
            shape-rendering="crispEdges"
          />
        </g>
      </g>
      <defs>
        <filter
          id="filter0_bd_1_83"
          x="56.8947"
          y="39.036"
          width="196.817"
          height="200.817"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feGaussianBlur in="BackgroundImageFix" stdDeviation="2" />
          <feComposite
            in2="SourceAlpha"
            operator="in"
            result="effect1_backgroundBlur_1_83"
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
            in2="effect1_backgroundBlur_1_83"
            result="effect2_dropShadow_1_83"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect2_dropShadow_1_83"
            result="shape"
          />
        </filter>
        <filter
          id="filter1_bd_1_83"
          x="39.2765"
          y="91.4286"
          width="178.295"
          height="178.295"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feGaussianBlur in="BackgroundImageFix" stdDeviation="5" />
          <feComposite
            in2="SourceAlpha"
            operator="in"
            result="effect1_backgroundBlur_1_83"
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
            in2="effect1_backgroundBlur_1_83"
            result="effect2_dropShadow_1_83"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect2_dropShadow_1_83"
            result="shape"
          />
        </filter>
        <filter
          id="filter2_di_1_83"
          x="76.2695"
          y="168.468"
          width="29.3825"
          height="30.8825"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
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
            result="effect1_dropShadow_1_83"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_1_83"
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
            result="effect2_innerShadow_1_83"
          />
        </filter>
        <filter
          id="filter3_di_1_83"
          x="114.26"
          y="168.468"
          width="29.3825"
          height="30.8825"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
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
            result="effect1_dropShadow_1_83"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_1_83"
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
            result="effect2_innerShadow_1_83"
          />
        </filter>
        <filter
          id="filter4_di_1_83"
          x="152.251"
          y="168.468"
          width="29.3825"
          height="30.8825"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
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
            result="effect1_dropShadow_1_83"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_1_83"
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
            result="effect2_innerShadow_1_83"
          />
        </filter>
        <linearGradient
          id="paint0_linear_1_83"
          x1="107.999"
          y1="36"
          x2="266.294"
          y2="194.295"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#BDBDFF" />
          <stop offset="1" stop-color="#8B7DEC" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_1_83"
          x1="25.5322"
          y1="275.553"
          x2="207.571"
          y2="101.429"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="white" stop-opacity="0.2" />
          <stop offset="1" stop-color="white" stop-opacity="0.5" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_1_83"
          x1="191.742"
          y1="275.553"
          x2="49.2765"
          y2="105.386"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="white" stop-opacity="0" />
          <stop offset="1" stop-color="white" />
        </linearGradient>
        <linearGradient
          id="paint3_linear_1_83"
          x1="73.8122"
          y1="197.989"
          x2="104.152"
          y2="168.968"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="white" stop-opacity="0.2" />
          <stop offset="1" stop-color="white" stop-opacity="0.5" />
        </linearGradient>
        <linearGradient
          id="paint4_linear_1_83"
          x1="111.803"
          y1="197.989"
          x2="142.143"
          y2="168.968"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="white" stop-opacity="0.2" />
          <stop offset="1" stop-color="white" stop-opacity="0.5" />
        </linearGradient>
        <linearGradient
          id="paint5_linear_1_83"
          x1="149.794"
          y1="197.989"
          x2="180.134"
          y2="168.968"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="white" stop-opacity="0.2" />
          <stop offset="1" stop-color="white" stop-opacity="0.5" />
        </linearGradient>
        <clipPath id="clip0_1_83">
          <rect width="300" height="300" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default AllIcon;
