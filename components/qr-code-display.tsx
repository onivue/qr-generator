"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { Card } from "@/components/ui/card";

interface QRCodeDisplayProps {
  qrCode: string;
  isLoading: boolean;
  width: number;
  downloadText: string;
  onDownload: () => void;
}

export function QRCodeDisplay({ 
  qrCode, 
  isLoading, 
  width, 
  downloadText,
  onDownload 
}: QRCodeDisplayProps) {
  return (
    <Card className="p-6 flex flex-col items-center space-y-4 border-2 border-primary/20 shadow-lg shadow-primary/5">
      {isLoading ? (
        <div className="flex flex-col items-center space-y-4">
          <Skeleton className="rounded-lg" style={{ width: `${width}px`, height: `${width}px` }} />
          <Skeleton className="h-10 w-[120px] rounded-md" />
        </div>
      ) : (
        qrCode && (
          <>
            <img
              src={qrCode}
              alt="QR Code"
              width={width}
              height={width}
              className="rounded-lg shadow-lg"
            />
            <Button onClick={onDownload} className="bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25 transition-all hover:shadow-primary/40">
              <Download className="w-4 h-4 mr-2" />
              {downloadText}
            </Button>
          </>
        )
      )}
    </Card>
  );
}