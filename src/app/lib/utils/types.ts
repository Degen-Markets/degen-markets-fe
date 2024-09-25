export interface PixelArtLoaderProps {
  size?: number;
  pixelSize?: number;
  gap?: number;

  loaderColor?: string;

  textColor?: string;
  text: string;
  textSize?: string;
}

export type Pool = {
  address: string;
  title: string;
  description: string;
  image: `https://${string}`;
  isPaused: boolean;
};

export type PoolsResponse = Pool[];
