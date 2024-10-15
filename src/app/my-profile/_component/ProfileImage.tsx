import { FC } from "react";

interface ProfileImageProps {
  imageUrl: string;
  className?: string;
}

const ProfileImage: FC<ProfileImageProps> = ({ imageUrl, className }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 179 138"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.1562 29.2949H178.267L166.499 138H21.924L10.1562 29.2949Z"
        fill="#8F7CFF"
      />
      <path
        d="M0 0H168.11L156.343 108.705H11.7677L0 0Z"
        fill="#8F7CFF"
        fillOpacity="0.8"
      />
      <path
        d="M7 3H175.11L163.343 134.816H18.7677L7 3Z"
        fill="url(#pattern0_220_3253)"
      />
      <defs>
        <pattern
          id="pattern0_220_3253"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use
            xlinkHref="#image0_220_3253"
            transform="matrix(0.00195312 0 0 0.0024909 0 -0.137671)"
          />
        </pattern>
        <image id="image0_220_3253" width="512" height="512" href={imageUrl} />
      </defs>
    </svg>
  );
};

export default ProfileImage;
