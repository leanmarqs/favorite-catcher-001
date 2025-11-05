import { useState, type ReactNode, useCallback } from 'react'
import { LanguageContext, type Locale } from './languageContext'

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [locale, setLocale] = useState<Locale>('en-US')

  const toggleLocale = useCallback(() => {
    setLocale((prev) => (prev === 'en-US' ? 'pt-BR' : 'en-US'))
  }, [])

  return (
    <LanguageContext.Provider value={{ locale, setLocale, toggleLocale }}>
      {children}
    </LanguageContext.Provider>
  )
}

