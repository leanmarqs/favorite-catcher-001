import { useContext } from 'react'


import { LanguageSelector, ThemeSelector } from '@/components/ui'
import { LanguageContext } from '@/providers/languages'
import { messages } from '@/lib/i18n'

const HelloWeirdo = () => {
  const { locale } = useContext(LanguageContext)
  const t = messages[locale]
  return (
    <main className='min-h-screen grid place-items-center p-4 caret-transparent dark:bg-zinc-900 dark:text-zinc-100'>
      <div className='flex flex-col items-center justify-center gap-6 text-center'>
        <h1 className='text-2xl font-semibold'>{t.HelloWeirdo.greetings}</h1>
        <LanguageSelector />
        <ThemeSelector />
      </div>
    </main>
  )
}

export default HelloWeirdo