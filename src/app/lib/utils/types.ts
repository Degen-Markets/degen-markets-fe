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
  value: string;
  createdAt: string;
};

export type PoolsResponse = Pool[];
