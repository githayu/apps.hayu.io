import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  defaultLocale: 'ja',
  locales: [
    'ja',
    'en',
    'zh',
    'hi',
    'es',
    'ar',
    'fr',
    'bn',
    'pt',
    'id',
    'ur',
    'ru',
    'de',
    'it',
    'nl',
    'pl',
    'tr',
    'fa',
    'vi',
    'ko',
    'zh-Hant',
    'uk',
    'th',
  ],
})

/** 右から左に書く言語 */
export const rtlLocales: string[] = ['ar', 'fa', 'ur']

/** 言語切替メニューに表示する各言語の自称 */
export const localeNames: Record<(typeof routing.locales)[number], string> = {
  ar: 'العربية',
  bn: 'বাংলা',
  de: 'Deutsch',
  en: 'English',
  es: 'Español',
  fa: 'فارسی',
  fr: 'Français',
  hi: 'हिन्दी',
  id: 'Bahasa Indonesia',
  it: 'Italiano',
  ja: '日本語',
  ko: '한국어',
  nl: 'Nederlands',
  pl: 'Polski',
  pt: 'Português',
  ru: 'Русский',
  th: 'ไทย',
  tr: 'Türkçe',
  uk: 'Українська',
  ur: 'اردو',
  vi: 'Tiếng Việt',
  zh: '简体中文',
  'zh-Hant': '繁體中文',
}
