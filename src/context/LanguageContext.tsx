import { createContext, ReactNode, useEffect, useMemo, useState } from "react";

import { DEFAULT_LANGUAGE, getTranslation } from "@/constants/translations";

import { getLanguage, saveLanguage } from "@/services/storage";

import { LanguageCode } from "@/types/language";

type Translation = ReturnType<typeof getTranslation>;

type TranslationKey = keyof Translation;

export interface LanguageContextType {
  language: LanguageCode;

  setLanguage: (language: LanguageCode) => Promise<void>;

  t: Translation;
}

export const LanguageContext = createContext<LanguageContextType | null>(null);

interface Props {
  children: ReactNode;
}

export function LanguageProvider({ children }: Props) {
  const [language, setCurrentLanguage] =
    useState<LanguageCode>(DEFAULT_LANGUAGE);

  useEffect(() => {
    initialize();
  }, []);

  async function initialize() {
    try {
      const storedLanguage = await getLanguage();

      if (storedLanguage) {
        setCurrentLanguage(storedLanguage);
      }
    } catch (error) {
      console.error("Failed to load language", error);
    }
  }

  async function setLanguage(language: LanguageCode) {
    setCurrentLanguage(language);

    await saveLanguage(language);
  }

  const t = useMemo(() => getTranslation(language), [language]);

  const value = useMemo(
    () => ({
      language,

      setLanguage,

      t,
    }),
    [language],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}
