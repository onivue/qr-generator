"use client";

import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { QRFormStore } from '@/lib/types/qr-form.types';

interface FormDictionary {
  textOrUrl: string;
  darkColor: string;
  lightColor: string;
  size: string;
  errorCorrection: string;
  dotStyle: string;
  markerStyle: string;
  innerMarkerStyle: string;
}

interface QRCodeFormProps {
  formState: QRFormStore;
  dict: FormDictionary;
}

export function QRCodeForm({ formState, dict }: QRCodeFormProps) {
  return (
    <Card className="p-6 space-y-6 border-2 border-primary/20 shadow-lg shadow-primary/5">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="text">{dict.textOrUrl}</Label>
          <Input
            id="text"
            value={formState.text}
            onChange={(e) => formState.setText(e.target.value)}
            placeholder={dict.textOrUrl}
            className="border-2 focus-visible:ring-primary"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="darkColor">{dict.darkColor}</Label>
            <div className="flex space-x-2">
              <Input
                id="darkColor"
                type="color"
                value={formState.darkColor}
                onChange={(e) => formState.setDarkColor(e.target.value)}
                className="w-16 h-10 p-1 border-2"
              />
              <Input
                value={formState.darkColor}
                onChange={(e) => formState.setDarkColor(e.target.value)}
                className="flex-1 border-2"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="lightColor">{dict.lightColor}</Label>
            <div className="flex space-x-2">
              <Input
                id="lightColor"
                type="color"
                value={formState.lightColor}
                onChange={(e) => formState.setLightColor(e.target.value)}
                className="w-16 h-10 p-1 border-2"
              />
              <Input
                value={formState.lightColor}
                onChange={(e) => formState.setLightColor(e.target.value)}
                className="flex-1 border-2"
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label>{dict.size} ({formState.width}px)</Label>
          <Slider
            value={[formState.width]}
            onValueChange={(value) => formState.setWidth(value[0])}
            min={100}
            max={500}
            step={10}
            className="w-full"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="errorCorrection">{dict.errorCorrection}</Label>
            <Select
              value={formState.errorCorrectionLevel}
              onValueChange={formState.setErrorCorrectionLevel}
            >
              <SelectTrigger className="border-2">
                <SelectValue placeholder={dict.errorCorrection} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="L">Low (7%)</SelectItem>
                <SelectItem value="M">Medium (15%)</SelectItem>
                <SelectItem value="Q">Quartile (25%)</SelectItem>
                <SelectItem value="H">High (30%)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="dotStyle">{dict.dotStyle}</Label>
            <Select value={formState.dotStyle} onValueChange={formState.setDotStyle}>
              <SelectTrigger className="border-2">
                <SelectValue placeholder={dict.dotStyle} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="square">Square</SelectItem>
                <SelectItem value="rounded">Rounded</SelectItem>
                <SelectItem value="dots">Dots</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="markerStyle">{dict.markerStyle}</Label>
            <Select value={formState.markerStyle} onValueChange={formState.setMarkerStyle}>
              <SelectTrigger className="border-2">
                <SelectValue placeholder={dict.markerStyle} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="square">Square</SelectItem>
                <SelectItem value="rounded">Rounded</SelectItem>
                <SelectItem value="circle">Circle</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="innerMarkerStyle">{dict.innerMarkerStyle}</Label>
            <Select value={formState.innerMarkerStyle} onValueChange={formState.setInnerMarkerStyle}>
              <SelectTrigger className="border-2">
                <SelectValue placeholder={dict.innerMarkerStyle} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="square">Square</SelectItem>
                <SelectItem value="rounded">Rounded</SelectItem>
                <SelectItem value="circle">Circle</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </Card>
  );
}