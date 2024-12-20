import { DotStyle } from './qr-styles';

interface DotRenderOptions {
  ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
  size: number;
  connections: {
    top: boolean;
    right: boolean;
    bottom: boolean;
    left: boolean;
  };
  style: DotStyle;
}

export function renderDot({
  ctx,
  x,
  y,
  size,
  connections,
  style
}: DotRenderOptions) {
  switch (style) {
    case 'square':
      renderSquareDot(ctx, x, y, size);
      break;
    case 'rounded':
      renderFluidDot(ctx, x, y, size, connections);
      break;
    case 'dots':
      renderCircleDot(ctx, x, y, size);
      break;
  }
}

function renderSquareDot(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number
) {
  ctx.fillRect(x, y, size, size);
}

function renderCircleDot(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number
) {
  const radius = size * 0.4;
  ctx.beginPath();
  ctx.arc(x + size / 2, y + size / 2, radius, 0, Math.PI * 2);
  ctx.fill();
}

function renderFluidDot(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  connections: { top: boolean; right: boolean; bottom: boolean; left: boolean }
) {
  const dotRadius = size * 0.45;
  const connectionWidth = size * 0.9;
  const overlap = size * 0.1;
  
  // Draw connections first with rounded rectangles
  if (connections.top) {
    ctx.beginPath();
    ctx.roundRect(
      x + (size - connectionWidth) / 2,
      y - overlap,
      connectionWidth,
      size / 2 + overlap * 2,
      [connectionWidth / 2, connectionWidth / 2, 0, 0]
    );
    ctx.fill();
  }
  
  if (connections.right) {
    ctx.beginPath();
    ctx.roundRect(
      x + size / 2 - overlap,
      y + (size - connectionWidth) / 2,
      size / 2 + overlap * 2,
      connectionWidth,
      [0, connectionWidth / 2, connectionWidth / 2, 0]
    );
    ctx.fill();
  }
  
  if (connections.bottom) {
    ctx.beginPath();
    ctx.roundRect(
      x + (size - connectionWidth) / 2,
      y + size / 2 - overlap,
      connectionWidth,
      size / 2 + overlap * 2,
      [0, 0, connectionWidth / 2, connectionWidth / 2]
    );
    ctx.fill();
  }
  
  if (connections.left) {
    ctx.beginPath();
    ctx.roundRect(
      x - overlap,
      y + (size - connectionWidth) / 2,
      size / 2 + overlap * 2,
      connectionWidth,
      [connectionWidth / 2, 0, 0, connectionWidth / 2]
    );
    ctx.fill();
  }

  // Draw the main dot on top
  ctx.beginPath();
  ctx.arc(x + size / 2, y + size / 2, dotRadius, 0, Math.PI * 2);
  ctx.fill();
}