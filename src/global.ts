import type { routing } from './i18n/routing'
import type messages from '../messages/ja.json'

declare module 'next-intl' {
  interface AppConfig {
    Locale: (typeof routing.locales)[number]
    Messages: Omit<typeof messages, 'UnicodeBlocks'> & {
      /** `${from}-${to}` をキーとしたUnicodeブロック名 */
      UnicodeBlocks: Record<string, string>
    }
  }
}
