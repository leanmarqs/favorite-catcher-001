import { useContext, useEffect, useRef, useState } from 'react'
import { LanguageContext, type Locale } from '@/providers/languages'
import { LanguagesIcon, ChevronDownIcon } from 'lucide-react'

export function LanguageSelector() {
  const { locale, setLocale } = useContext(LanguageContext)
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!ref.current) return
      if (!ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('click', onDocClick)
    return () => document.removeEventListener('click', onDocClick)
  }, [])

  const currentLabel = locale.toLowerCase()

  const choose = (l: Locale) => {
    setLocale(l)
    setOpen(false)
  }

  return (
    <div ref={ref} className='relative select-none caret-transparent'>
      <button
        type='button'
        onClick={() => setOpen((o) => !o)}
        className='inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm font-medium text-primary hover:bg-accent hover:text-accent-foreground transition-colors'
      >
        <LanguagesIcon size={16} aria-hidden='true' />
        <span className='uppercase tracking-tight'>{currentLabel}</span>
        <ChevronDownIcon size={16} aria-hidden='true' />
      </button>

      {open && (
        <div className='absolute right-0 mt-2 w-40 overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md z-50'>
          <ul className='py-1 text-sm'>
            <li>
              <button
                className={`flex w-full items-center justify-between px-3 py-2 hover:bg-accent hover:text-accent-foreground ${
                  locale === 'en-US' ? 'bg-accent/40' : ''
                }`}
                onClick={() => choose('en-US')}
              >
                <span>English (US)</span>
                <span className='text-xs uppercase text-muted-foreground'></span>
              </button>
            </li>
            <li>
              <button
                className={`flex w-full items-center justify-between px-3 py-2 hover:bg-accent hover:text-accent-foreground ${
                  locale === 'pt-BR' ? 'bg-accent/40' : ''
                }`}
                onClick={() => choose('pt-BR')}
              >
                <span>Português (BR)</span>
                <span className='text-xs uppercase text-muted-foreground'></span>
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  )
}
