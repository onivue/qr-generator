"use client";

import { useEffect, useState } from 'react';
import { QRCodeForm } from './qr-code-form';
import { QRCodeDisplay } from './qr-code-display';
import { renderQRCode } from './qr-renderer';
import { trackEvent } from '@/lib/analytics';
import { useQRFormStore } from '@/lib/store/qr-form.store';
import type { Dictionary } from '@/lib/dictionary.types';

interface QRCodeGeneratorClientProps {
  dict: Dictionary;
}

export function QRCodeGeneratorClient({ dict }: QRCodeGeneratorClientProps) {
  const [qrCode, setQrCode] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  
  const formState = useQRFormStore();

  const generateQRCode = async () => {
    try {
      setIsLoading(true);
      const dataUrl = await renderQRCode({
        text: formState.text,
        width: formState.width,
        darkColor: formState.darkColor,
        lightColor: formState.lightColor,
        errorCorrectionLevel: formState.errorCorrectionLevel,
        dotStyle: formState.dotStyle,
        markerStyle: formState.markerStyle,
        innerMarkerStyle: formState.innerMarkerStyle,
      });
      setQrCode(dataUrl);
    } catch (err) {
      console.error('Failed to generate QR code:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    generateQRCode();
  }, [
    formState.text,
    formState.darkColor,
    formState.lightColor,
    formState.width,
    formState.errorCorrectionLevel,
    formState.dotStyle,
    formState.markerStyle,
    formState.innerMarkerStyle
  ]);

  const downloadQRCode = () => {
    trackEvent.qrDownload({
      text: formState.text,
      style: `${formState.dotStyle}-${formState.markerStyle}-${formState.innerMarkerStyle}`,
    });

    const link = document.createElement('a');
    link.download = 'qrcode.png';
    link.href = qrCode;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-primary mb-2">
          {dict.title}
        </h1>
        <p className="text-muted-foreground">
          {dict.description}
        </p>
      </div>

      <div className="max-w-2xl mx-auto space-y-8">
        <QRCodeDisplay
          qrCode={qrCode}
          isLoading={isLoading}
          width={formState.width}
          downloadText={dict.download}
          onDownload={downloadQRCode}
        />

        <QRCodeForm
          formState={formState}
          dict={dict.form}
        />
      </div>
    </div>
  );
}