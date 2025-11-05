import { ThemeContext, type Theme } from './themeContext'
import { useEffect, useState, type ReactNode } from 'react'

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>('system')

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  useEffect(() => {
    const el = document.documentElement
    const apply = () => {
      const prefersDark =
        typeof window !== 'undefined' &&
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches
      const isDark = theme === 'dark' || (theme === 'system' && prefersDark)
      el.classList.toggle('dark', isDark)
    }

    apply()

    let mql: MediaQueryList | undefined
    const onChange = () => apply()
    if (
      theme === 'system' &&
      typeof window !== 'undefined' &&
      window.matchMedia
    ) {
      mql = window.matchMedia('(prefers-color-scheme: dark)')
      mql.addEventListener?.('change', onChange)
    }

    return () => {
      mql?.removeEventListener?.('change', onChange)
    }
  }, [theme])
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
