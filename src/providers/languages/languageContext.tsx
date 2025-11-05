import { createContext } from 'react'

export type Locale = 'en-US' | 'pt-BR'

export type LanguageContextValue = {
  locale: Locale
  setLocale: (l: Locale) => void
  toggleLocale: () => void
}

export const LanguageContext = createContext<LanguageContextValue>({
  locale: 'en-US',
  setLocale: () => {},
  toggleLocale: () => {},
})

