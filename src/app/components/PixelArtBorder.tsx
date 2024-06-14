import { CSSProperties, FC, PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  className?: string;
  width: number;
  color: string;
} & PropsWithChildren;

const PixelArtBorder: FC<Props> = ({ width, color, children, className }) => {
  const styles: CSSProperties = {
    boxShadow: `${width}px 0 ${color}, -${width}px 0 ${color}, 0 -${width}px ${color}, 0 ${width}px ${color}`,
    margin: `${width}px auto`,
    backgroundColor: color,
    width: `calc(100% - ${width}px)`,
  };

  return (
    <div className={twMerge(className)} style={styles}>
      {children}
    </div>
  );
};

export default PixelArtBorder;
