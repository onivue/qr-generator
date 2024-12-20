export interface Dictionary {
  title: string;
  description: string;
  form: {
    textOrUrl: string;
    darkColor: string;
    lightColor: string;
    size: string;
    errorCorrection: string;
    dotStyle: string;
    markerStyle: string;
    innerMarkerStyle: string;
  };
  download: string;
  footer: {
    builtWith: string;
    copyright: string;
  };
}