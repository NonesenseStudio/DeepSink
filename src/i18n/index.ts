import { createI18n } from "vue-i18n";
import en from "./en.ts";
import zh from "./zh.ts";
const currentLanguage = navigator.language;
export const i18n = createI18n({
  legacy: false,
  locale: currentLanguage,
  fallbackLocale: "en",
  messages: {
    en,
    zh,
    zh_TW: {
      hello: "哈囉，世界",
    },
    ja: {
      hello: "こんにちは、世界",
    },
    ko: {
      hello: "안녕하세요, 세계",
    },
    fr: {
      hello: "bonjour le monde",
    },
    de: {
      hello: "hallo welt",
    },
    es: {
      hello: "hola mundo",
    },
    ru: {
      hello: "привет, мир",
    },
    pt: {
      hello: "olá mundo",
    },
    it: {
      hello: "ciao mondo",
    },
    ar: {
      hello: "مرحبا بالعالم",
    },
    hi: {
      hello: "नमस्ते दुनिया",
    },
  },
});
