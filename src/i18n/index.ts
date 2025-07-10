import { createI18n } from "vue-i18n";
import en from "./en.ts";
import zh from "./zh.ts";
const currentLanguage = navigator.language;
export const hellos = {
  es: {
    hello: "Hola",
  },
  fr: {
    hello: "Bonjour",
  },
  de: {
    hello: "Hallo",
  },
  ja: {
    hello: "こんにちは",
  },
  ko: {
    hello: "안녕하세요",
  },
  ru: {
    hello: "Привет",
  },
  ar: {
    hello: "مرحبا",
  },
  pt: {
    hello: "Olá",
  },
  it: {
    hello: "Ciao",
  },
  hi: {
    hello: "नमस्ते",
  },
  th: {
    hello: "สวัสดี",
  },
  vi: {
    hello: "Xin chào",
  },
  tr: {
    hello: "Merhaba",
  },
  nl: {
    hello: "Hallo",
  },
  sv: {
    hello: "Hej",
  },
  fi: {
    hello: "Hei",
  },
  da: {
    hello: "Hej",
  },
  no: {
    hello: "Hallo",
  },
  pl: {
    hello: "Cześć",
  },
  hu: {
    hello: "Szia",
  },
  cs: {
    hello: "Ahoj",
  },
  el: {
    hello: "Γειά σου",
  },
  he: {
    hello: "שלום",
  },
  id: {
    hello: "Halo",
  },
  ms: {
    hello: "Helo",
  },
  ro: {
    hello: "Salut",
  },
  uk: {
    hello: "Привіт",
  },
  bg: {
    hello: "Здравей",
  },
  hr: {
    hello: "Bok",
  },
  sr: {
    hello: "Здраво",
  },
  sk: {
    hello: "Ahoj",
  },
  sl: {
    hello: "Živjo",
  },
  et: {
    hello: "Tere",
  },
  lv: {
    hello: "Sveiki",
  },
  lt: {
    hello: "Labas",
  },
  fa: {
    hello: "سلام",
  },
  ur: {
    hello: "ہیلو",
  },
  bn: {
    hello: "হ্যালো",
  },
  tl: {
    hello: "Kamusta",
  },
};
export const i18n = createI18n({
  legacy: false,
  locale: currentLanguage,
  messages: {
    en,
    zh,
    ...hellos,
  },
});

export default i18n;
