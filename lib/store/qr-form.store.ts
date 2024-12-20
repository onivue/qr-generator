import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { QRFormStore } from '@/lib/types/qr-form.types';

const initialState = {
  text: 'https://qr.onivue.ch',
  darkColor: '#000000',
  lightColor: '#ffffff',
  width: 300,
  errorCorrectionLevel: 'M',
  dotStyle: 'square',
  markerStyle: 'square',
  innerMarkerStyle: 'square'
} as const;

export const useQRFormStore = create<QRFormStore>()(
  persist(
    (set) => ({
      ...initialState,
      setText: (text) => set({ text }),
      setDarkColor: (darkColor) => set({ darkColor }),
      setLightColor: (lightColor) => set({ lightColor }),
      setWidth: (width) => set({ width }),
      setErrorCorrectionLevel: (errorCorrectionLevel) => set({ errorCorrectionLevel }),
      setDotStyle: (dotStyle) => set({ dotStyle }),
      setMarkerStyle: (markerStyle) => set({ markerStyle }),
      setInnerMarkerStyle: (innerMarkerStyle) => set({ innerMarkerStyle }),
      reset: () => set(initialState)
    }),
    {
      name: 'qr-form-storage'
    }
  )
);