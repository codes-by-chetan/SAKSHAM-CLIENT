import { LanguageCode } from "@/types/language";

export interface Language {
  code: LanguageCode;
  name: string;
  nativeName: string;
}

export const LANGUAGES: Language[] = [
  {
    code: "mr",
    name: "Marathi",
    nativeName: "मराठी",
  },
  {
    code: "hi",
    name: "Hindi",
    nativeName: "हिन्दी",
  },
  {
    code: "en",
    name: "English",
    nativeName: "English",
  },
  {
    code: "gu",
    name: "Gujarati",
    nativeName: "ગુજરાતી",
  },
  {
    code: "kn",
    name: "Kannada",
    nativeName: "ಕನ್ನಡ",
  },
  {
    code: "ta",
    name: "Tamil",
    nativeName: "தமிழ்",
  },
  {
    code: "te",
    name: "Telugu",
    nativeName: "తెలుగు",
  },
];