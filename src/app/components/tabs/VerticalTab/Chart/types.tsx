export interface CurveSegment {
  x: number;
  y: number;
  curve: {
    type: "linear" | "cubic";
    controlPoints?: [number, number, number, number];
  };
}

export type LineConfiguration = {
  initialPoint: { x: number; y: number };
  segments: CurveSegment[];
  color: string;
};

export interface PieSegment {
  percentage: number;
  color: string;
}

export interface EndpointConfig {
  x: number;
  y: number;
  text: string;
}

export interface MobileEndpoints {
  first: EndpointConfig;
  second: EndpointConfig;
  third: EndpointConfig;
  fourth: EndpointConfig;
  fifth: EndpointConfig;
}

export interface DesktopEndpoints {
  right: EndpointConfig;
  top: EndpointConfig;
  leftFirst: EndpointConfig;
  leftSecond: EndpointConfig;
  down: EndpointConfig;
}

export interface MobileLineConfigs {
  first: LineConfiguration;
  second: LineConfiguration;
  third: LineConfiguration;
  fourth: LineConfiguration;
  fifth: LineConfiguration;
}

export interface DesktopLineConfigs {
  right: LineConfiguration;
  top: LineConfiguration;
  leftFirst: LineConfiguration;
  leftSecond: LineConfiguration;
  down: LineConfiguration;
}
