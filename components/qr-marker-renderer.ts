import { InnerMarkerStyle, MarkerStyle } from './qr-styles';

interface PositionMarkerOptions {
  ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
  moduleSize: number;
  darkColor: string;
  lightColor: string;
  markerStyle: MarkerStyle;
  innerMarkerStyle: InnerMarkerStyle;
}

function renderOuterMarker(ctx: CanvasRenderingContext2D, x: number, y: number, size: number, style: MarkerStyle) {
  if (style === 'square') {
    ctx.fillRect(x, y, size, size);
  } else if (style === 'rounded') {
    const radius = size / 2.5;
    ctx.beginPath();
    ctx.roundRect(x, y, size, size, radius);
    ctx.fill();
  } else if (style === 'circle') {
    const centerX = x + size / 2;
    const centerY = y + size / 2;
    const radius = (size / 2) * 0.95;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.fill();
  }
}

function renderInnerMarker(ctx: CanvasRenderingContext2D, x: number, y: number, size: number, style: InnerMarkerStyle) {
  if (style === 'square') {
    ctx.fillRect(x, y, size, size);
  } else if (style === 'rounded') {
    const radius = size / 3;
    ctx.beginPath();
    ctx.roundRect(x, y, size, size, radius);
    ctx.fill();
  } else if (style === 'circle') {
    const centerX = x + size / 2;
    const centerY = y + size / 2;
    const radius = (size / 2) * 0.85;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.fill();
  }
}

export function renderPositionMarker({
  ctx,
  x,
  y,
  moduleSize,
  darkColor,
  lightColor,
  markerStyle,
  innerMarkerStyle,
}: PositionMarkerOptions) {
  // Outer square (7x7)
  ctx.fillStyle = darkColor;
  renderOuterMarker(ctx, x, y, moduleSize * 7, markerStyle);

  // Inner white square (5x5)
  ctx.fillStyle = lightColor;
  renderOuterMarker(ctx, x + moduleSize, y + moduleSize, moduleSize * 5, markerStyle);

  // Inner dark square (3x3)
  ctx.fillStyle = darkColor;
  renderInnerMarker(ctx, x + moduleSize * 2, y + moduleSize * 2, moduleSize * 3, innerMarkerStyle);
}
