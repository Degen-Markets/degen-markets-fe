export interface PixelArtLoaderProps {
  size?: number;
  pixelSize?: number;
  gap?: number;

  loaderColor?: string;

  textColor?: string;
  text: string;
  textSize?: string;
}

export type PoolWithOptions = {
  id: string;
  title: string;
  description: string;
  options: {
    title: string;
    id: string;
  }[];
  image: `https://${string}`;
};

export type Pool = {
  id: string;
  title: string;
  description: string;
  image: `https://${string}`;
  isPaused: boolean;
};

export type PoolsResponse = Pool[];
