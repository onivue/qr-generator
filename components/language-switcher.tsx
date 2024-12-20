"use client";

import { usePathname } from 'next/navigation';
import { Languages } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { languages, getLanguageInfo } from '@/lib/languages';

interface LanguageSwitcherProps {
  lang: string;
}

export function LanguageSwitcher({ lang }: LanguageSwitcherProps) {
  const pathname = usePathname();
  const currentLanguage = getLanguageInfo(lang);

  const handleLanguageChange = (newLocale: string) => {
    const segments = pathname.split('/');
    segments[1] = newLocale;
    return segments.join('/');
  };

  return (
    <div className="flex items-center gap-2">
      <Languages className="h-4 w-4 text-muted-foreground" />
      <Select 
        value={"de"} 
        onValueChange={(value) => {
          window.location.href = handleLanguageChange(value);
        }}
      >
        <SelectTrigger className="w-[140px] border-2">
          <SelectValue defaultValue={lang}>
            <div className="flex items-center gap-2">
              {currentLanguage.flag}
              {currentLanguage.name}
            </div>
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {Object.entries(languages).map(([code, { name, flag }]) => (
            <SelectItem key={code} value={code}>
              <div className="flex items-center gap-2">
                {flag}
                {name}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}