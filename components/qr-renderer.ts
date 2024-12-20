import QRCode from 'qrcode';
import { DotStyle, MarkerStyle, InnerMarkerStyle } from './qr-styles';
import { isPositionMarker } from './qr-utils';
import { renderPositionMarker } from './qr-marker-renderer';
import { renderDot } from './qr-dot-renderer';
import type { QRCodeOptions, QRCodeConnections } from '@/lib/qr-code.types';

function getConnections(row: number, col: number, moduleCount: number, qrData: any): QRCodeConnections {
  return {
    top: row > 0 && qrData.modules.get(row - 1, col),
    right: col < moduleCount - 1 && qrData.modules.get(row, col + 1),
    bottom: row < moduleCount - 1 && qrData.modules.get(row + 1, col),
    left: col > 0 && qrData.modules.get(row, col - 1)
  };
}

export async function renderQRCode(options: QRCodeOptions): Promise<string> {
  const { 
    text, 
    width, 
    darkColor, 
    lightColor, 
    errorCorrectionLevel, 
    dotStyle, 
    markerStyle,
    innerMarkerStyle
  } = options;

  const qrData = await QRCode.create(text, {
    errorCorrectionLevel,
  });

  const canvas = document.createElement('canvas');
  const moduleCount = qrData.modules.size;
  const moduleSize = Math.floor(width / moduleCount);
  const margin = Math.floor(moduleSize * 4);
  
  canvas.width = moduleSize * moduleCount + margin * 2;
  canvas.height = moduleSize * moduleCount + margin * 2;
  
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';

  // Fill background
  ctx.fillStyle = lightColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = darkColor;

  // Draw regular modules
  for (let row = 0; row < moduleCount; row++) {
    for (let col = 0; col < moduleCount; col++) {
      if (!isPositionMarker(row, col, moduleCount) && qrData.modules.get(row, col)) {
        const x = col * moduleSize + margin;
        const y = row * moduleSize + margin;
        const connections = getConnections(row, col, moduleCount, qrData);
        
        renderDot({
          ctx,
          x,
          y,
          size: moduleSize,
          connections,
          style: dotStyle
        });
      }
    }
  }

  // Draw position markers
  const markerPositions = [
    { row: 0, col: 0 },
    { row: 0, col: moduleCount - 7 },
    { row: moduleCount - 7, col: 0 }
  ];

  for (const { row, col } of markerPositions) {
    const x = col * moduleSize + margin;
    const y = row * moduleSize + margin;

    renderPositionMarker({
      ctx,
      x,
      y,
      moduleSize,
      darkColor,
      lightColor,
      markerStyle,
      innerMarkerStyle
    });
  }

  return canvas.toDataURL();
}