import { track } from '@vercel/analytics';

export const trackEvent = {
  qrDownload: (data: { text: string; style: string }) => {
    track('qr_download', {
      text: data.text,
      style: data.style,
      timestamp: new Date().toISOString(),
    });
  },
};