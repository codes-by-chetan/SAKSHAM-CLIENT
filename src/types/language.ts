export type LanguageCode =
  | "en"
  | "mr"
  | "hi"
  | "gu"
  | "kn"
  | "ta"
  | "te";

export interface Language {
  code: LanguageCode;
  nativeName: string;
  englishName: string;
}

export interface AppSettings {
  /**
   * User selected language.
   * Undefined means the user has never completed onboarding.
   */
  language?: LanguageCode;

  /**
   * Indicates whether the onboarding flow
   * (language selection, welcome, etc.) has been completed.
   */
  onboardingCompleted: boolean;

  /**
   * Application theme.
   */
  theme: "light" | "dark" | "system";

  /**
   * Push notification preference.
   */
  notifications: boolean;
}

export type TranslationRecord = Record<
  string,
  string
>;

export type Translations = Record<
  LanguageCode,
  TranslationRecord
>;
