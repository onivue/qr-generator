import { DotStyle, InnerMarkerStyle, MarkerStyle } from '@/components/qr-styles';
import { QRCodeErrorCorrectionLevel } from 'qrcode';

export interface QRCodeOptions {
  text: string;
  width: number;
  darkColor: string;
  lightColor: string;
  errorCorrectionLevel: QRCodeErrorCorrectionLevel;
  dotStyle: DotStyle;
  markerStyle: MarkerStyle;
  innerMarkerStyle: InnerMarkerStyle;
}

export interface QRCodeConnections {
  top: boolean;
  right: boolean;
  bottom: boolean;
  left: boolean;
}

export interface DotRenderOptions {
  ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
  size: number;
  connections: QRCodeConnections;
  style: DotStyle;
}

export interface PositionMarkerOptions {
  ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
  moduleSize: number;
  darkColor: string;
  lightColor: string;
  markerStyle: MarkerStyle;
  innerMarkerStyle: InnerMarkerStyle;
}
