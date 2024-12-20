// QR code utility functions
export function isPositionMarker(row: number, col: number, size: number): boolean {
  // Position detection patterns are 7x7 modules in the corners
  return (
    // Top-left corner
    (row < 7 && col < 7) ||
    // Top-right corner
    (row < 7 && col >= size - 7) ||
    // Bottom-left corner
    (row >= size - 7 && col < 7)
  );
}

export function getMarkerPosition(row: number, col: number, size: number): 'top-left' | 'top-right' | 'bottom-left' | null {
  if (row < 7 && col < 7) return 'top-left';
  if (row < 7 && col >= size - 7) return 'top-right';
  if (row >= size - 7 && col < 7) return 'bottom-left';
  return null;
}

export function getMarkerCornerType(row: number, col: number, size: number): 'outer' | 'inner' | null {
  if (!isPositionMarker(row, col, size)) return null;

  // Normalize coordinates relative to the marker's top-left corner
  const markerRow = row >= size - 7 ? row - (size - 7) : row;
  const markerCol = col >= size - 7 ? col - (size - 7) : col;

  // Check outer corners
  if ((markerRow === 0 && markerCol === 0) ||
      (markerRow === 0 && markerCol === 6) ||
      (markerRow === 6 && markerCol === 0) ||
      (markerRow === 6 && markerCol === 6)) {
    return 'outer';
  }

  // Check inner corners
  if ((markerRow === 2 && markerCol === 2) ||
      (markerRow === 2 && markerCol === 4) ||
      (markerRow === 4 && markerCol === 2) ||
      (markerRow === 4 && markerCol === 4)) {
    return 'inner';
  }

  return null;
}