// src/components/MenuSuspenso/FilterButton.tsx
import { useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import { IconFilter } from './icons'
import { type SortOption } from './MenuSuspenso'

interface FilterButtonProps {
  current: SortOption
  onChange: (opt: SortOption) => void
}

export function FilterButton({ current, onChange }: FilterButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [menuPos, setMenuPos] = useState({ top: 0, left: 0 })
  const btnRef = useRef<HTMLButtonElement>(null)

  const toggleMenu = () => {
    if (!isOpen && btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect()
      setMenuPos({ top: rect.bottom + 8, left: rect.left + rect.width / 2 })
    }
    setIsOpen((v) => !v)
  }

  return (
    <div className='relative'>
      <button
        ref={btnRef}
        onClick={toggleMenu}
        className='w-8 h-8 grid place-items-center rounded-full bg-white text-black 
                   dark:bg-zinc-800 dark:text-zinc-100 shadow 
                   hover:scale-110 transition-transform duration-150'
      >
        <IconFilter className='w-5 h-5' />
      </button>

      {isOpen &&
        ReactDOM.createPortal(
          <div
            className='fixed inset-0 z-[9998]'
            onMouseDown={() => setIsOpen(false)}
          >
            <div
              onMouseDown={(e) => e.stopPropagation()}
              className='absolute bg-white dark:bg-zinc-800 text-black dark:text-zinc-100 
                         rounded-2xl shadow-xl border border-gray-200 dark:border-zinc-700 
                         w-56 p-2 z-[9999] backdrop-blur-sm'
              style={{
                top: `${menuPos.top}px`,
                left: `${menuPos.left}px`,
                transform: 'translateX(-50%)',
              }}
            >
              <ul className='space-y-1 text-sm'>
                {(
                  ['A-Z', 'Amount', 'Creation', 'Relevant'] as SortOption[]
                ).map((item) => (
                  <li
                    key={item}
                    onMouseDown={(e) => {
                      e.stopPropagation()
                      e.preventDefault()
                      onChange(item)
                      setIsOpen(false)
                    }}
                    className={`px-3 py-2 rounded-full cursor-pointer text-center transition-all
                                hover:bg-gray-100 dark:hover:bg-zinc-700 hover:shadow-md 
                                hover:-translate-y-0.5 ${
                                  current === item
                                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 font-semibold'
                                    : ''
                                }`}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>,
          document.body
        )}
    </div>
  )
}
