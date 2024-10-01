import IconProps from "@/app/types/Icon";
import { FC } from "react";

const ProfitLossIcon: FC<IconProps> = ({
  width = 64,
  height = 64,
  ...props
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 300 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_46_26)">
        <path
          d="M115.848 265.814L106.972 241.168C106.145 238.873 103.783 237.509 101.383 237.941L75.6 242.577C71.4121 243.33 68.2575 238.841 70.385 235.156L113.008 161.33C114.389 158.939 117.447 158.119 119.838 159.5L142.757 172.732L165.675 185.964C168.067 187.345 168.886 190.403 167.506 192.794L124.882 266.62C122.755 270.305 117.29 269.817 115.848 265.814Z"
          fill="url(#paint0_linear_46_26)"
        />
        <path
          d="M223.472 242.63L197.689 237.994C195.288 237.562 192.927 238.926 192.1 241.221L183.224 265.867C181.782 269.87 176.317 270.358 174.189 266.673L131.566 192.847C130.185 190.456 131.005 187.398 133.396 186.017L156.315 172.785L179.233 159.553C181.625 158.172 184.683 158.992 186.063 161.383L228.687 235.209C230.814 238.894 227.66 243.383 223.472 242.63Z"
          fill="url(#paint1_linear_46_26)"
        />
        <g filter="url(#filter0_bd_46_26)">
          <path
            d="M221.979 86.8565C221.802 86.7546 221.703 86.5563 221.728 86.3535C221.907 84.8994 222 83.4458 222 82C222 60.702 202.916 43.5895 181.65 46.2706C181.446 46.2963 181.245 46.1971 181.143 46.0193C174.862 35.0899 163.076 28 150 28C136.924 28 125.138 35.09 118.857 46.0194C118.755 46.1971 118.554 46.2963 118.35 46.2707C97.0398 43.5891 78 60.7018 78 82C78 83.4458 78.0931 84.8994 78.2722 86.3535C78.2971 86.5563 78.1978 86.7546 78.0207 86.8565C67.0906 93.1458 60 104.932 60 118C60 131.068 67.0904 142.854 78.0203 149.143C78.1976 149.245 78.2969 149.444 78.2717 149.647C78.0927 151.091 78.002 152.545 78 154C78 175.298 97.0402 192.367 118.351 189.728C118.554 189.703 118.755 189.803 118.857 189.98C125.137 200.91 136.923 208 150 208C163.077 208 174.863 200.91 181.143 189.98C181.245 189.803 181.446 189.703 181.649 189.729C202.916 192.366 222 175.298 222 154C222 152.554 221.907 151.101 221.728 149.647C221.703 149.444 221.802 149.245 221.979 149.144C232.909 142.854 240 131.068 240 118C240 104.932 232.909 93.1458 221.979 86.8565Z"
            fill="url(#paint2_linear_46_26)"
            shapeRendering="crispEdges"
          />
          <path
            d="M221.232 86.2924L221.728 86.3535L221.232 86.2924C221.182 86.6952 221.379 87.088 221.73 87.2899C232.508 93.4919 239.5 105.115 239.5 118C239.5 130.885 232.508 142.508 221.73 148.71C221.379 148.912 221.182 149.305 221.232 149.708L221.728 149.647L221.232 149.708C221.408 151.143 221.5 152.576 221.5 154C221.5 175 202.676 191.833 181.711 189.232C181.31 189.183 180.913 189.377 180.71 189.731C174.517 200.509 162.894 207.5 150 207.5C137.106 207.5 125.483 200.509 119.29 189.731C119.087 189.377 118.691 189.183 118.29 189.232C97.2801 191.833 78.5004 175.001 78.5 154.001C78.502 152.566 78.5914 151.132 78.7679 149.708C78.8179 149.305 78.6209 148.912 78.2696 148.71C67.4915 142.508 60.5 130.885 60.5 118C60.5 105.115 67.4917 93.4919 78.2701 87.2899C78.6209 87.088 78.818 86.6952 78.7684 86.2924C78.5917 84.8575 78.5 83.4243 78.5 82C78.5 60.9984 97.2802 44.1233 118.288 46.7668C118.689 46.8174 119.087 46.6226 119.291 46.2685C125.484 35.4912 137.106 28.5 150 28.5C162.894 28.5 174.516 35.4911 180.709 46.2684L181.143 46.0193L180.709 46.2684C180.913 46.6225 181.311 46.8174 181.712 46.7667C202.676 44.1238 221.5 60.9989 221.5 82C221.5 83.4243 221.408 84.8575 221.232 86.2924Z"
            stroke="url(#paint3_linear_46_26)"
            shapeRendering="crispEdges"
          />
        </g>
        <g filter="url(#filter1_di_46_26)">
          <path
            d="M151.116 111.595C151.116 111.592 151.114 111.59 151.112 111.589C141.771 109.513 138.926 108.165 138.926 105.851C138.926 103.282 143.543 100.289 149.5 100.289C155.457 100.289 160.074 103.273 160.074 105.851C160.074 107.258 161.226 108.394 162.653 108.394H171.421C172.848 108.394 174 107.258 174 105.851C174 98.2675 168.222 91.6019 159.362 88.6611C158.945 88.5224 158.655 88.1354 158.655 87.6951V81.5435C158.655 80.1361 157.503 79 156.076 79H142.924C141.497 79 140.345 80.1361 140.345 81.5435V87.6873C140.345 88.1272 140.056 88.5141 139.638 88.653C130.778 91.6011 125 98.259 125 105.851C125 119.128 138.213 122.18 147.884 124.418C157.228 126.495 160.074 127.843 160.074 130.158C160.074 132.727 155.457 135.72 149.5 135.72C143.543 135.72 138.926 132.735 138.926 130.158C138.926 128.75 137.774 127.614 136.347 127.614H127.579C126.152 127.614 125 128.75 125 130.158C125 137.741 130.778 144.399 139.638 147.347C140.056 147.486 140.345 147.873 140.345 148.313V154.457C140.345 155.864 141.497 157 142.924 157H156.076C157.503 157 158.655 155.864 158.655 154.457V148.313C158.655 147.873 158.944 147.486 159.362 147.347C168.222 144.399 174 137.741 174 130.158C174 116.883 160.791 113.83 151.12 111.6C151.118 111.599 151.116 111.597 151.116 111.595Z"
            fill="url(#paint4_linear_46_26)"
            shapeRendering="crispEdges"
          />
        </g>
      </g>
      <defs>
        <filter
          id="filter0_bd_46_26"
          x="50"
          y="18"
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
            result="effect1_backgroundBlur_46_26"
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
            in2="effect1_backgroundBlur_46_26"
            result="effect2_dropShadow_46_26"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect2_dropShadow_46_26"
            result="shape"
          />
        </filter>
        <filter
          id="filter1_di_46_26"
          x="123.5"
          y="78.5"
          width="52"
          height="82.5"
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
            result="effect1_dropShadow_46_26"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_46_26"
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
            result="effect2_innerShadow_46_26"
          />
        </filter>
        <linearGradient
          id="paint0_linear_46_26"
          x1="115.508"
          y1="157"
          x2="165.79"
          y2="251.251"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#BDBDFF" />
          <stop offset="1" stopColor="#8B7DEC" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_46_26"
          x1="129.066"
          y1="188.517"
          x2="235.83"
          y2="192.098"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#BDBDFF" />
          <stop offset="1" stopColor="#8B7DEC" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_46_26"
          x1="33"
          y1="226"
          x2="240"
          y2="28"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" stopOpacity="0.2" />
          <stop offset="1" stopColor="white" stopOpacity="0.5" />
        </linearGradient>
        <linearGradient
          id="paint3_linear_46_26"
          x1="222"
          y1="226"
          x2="60"
          y2="32.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" stopOpacity="0" />
          <stop offset="1" stopColor="white" />
        </linearGradient>
        <linearGradient
          id="paint4_linear_46_26"
          x1="142.15"
          y1="162.571"
          x2="177.126"
          y2="66.0831"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" stopOpacity="0.2" />
          <stop offset="1" stopColor="white" stopOpacity="0.5" />
        </linearGradient>
        <clipPath id="clip0_46_26">
          <rect width="300" height="300" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default ProfitLossIcon;
