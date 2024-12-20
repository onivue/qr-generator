import { DotStyle, InnerMarkerStyle, MarkerStyle } from '@/components/qr-styles';
import { QRCodeErrorCorrectionLevel } from 'qrcode';

export interface QRFormState {
  text: string;
  darkColor: string;
  lightColor: string;
  width: number;
  errorCorrectionLevel: QRCodeErrorCorrectionLevel;
  dotStyle: DotStyle;
  markerStyle: MarkerStyle;
  innerMarkerStyle: InnerMarkerStyle;
}

export interface QRFormActions {
  setText: (text: string) => void;
  setDarkColor: (color: string) => void;
  setLightColor: (color: string) => void;
  setWidth: (width: number) => void;
  setErrorCorrectionLevel: (level: QRCodeErrorCorrectionLevel) => void;
  setDotStyle: (style: DotStyle) => void;
  setMarkerStyle: (style: MarkerStyle) => void;
  setInnerMarkerStyle: (style: InnerMarkerStyle) => void;
  reset: () => void;
}

export type QRFormStore = QRFormState & QRFormActions;
