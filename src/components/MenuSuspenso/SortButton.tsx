// src/components/MenuSuspenso/SortButton.tsx
import {
  ArrowDownMini,
  ArrowUpMini,
  IconAZ,
  IconAmount,
  IconCalendar,
  IconStar,
} from './icons'
import { type SortDirection, type SortOption } from './MenuSuspenso'

interface SortButtonProps {
  sortOption: SortOption
  sortDirection: SortDirection
  onToggle: () => void
}

export function SortButton({
  sortOption,
  sortDirection,
  onToggle,
}: SortButtonProps) {
  const arrow =
    sortDirection === 'asc' ? (
      <ArrowUpMini className='w-3.5 h-3.5 text-blue-500 dark:text-blue-400' />
    ) : (
      <ArrowDownMini className='w-3.5 h-3.5 text-blue-500 dark:text-blue-400' />
    )

  const base =
    sortOption === 'A-Z' ? (
      <IconAZ className='w-5 h-5 text-blue-500 dark:text-blue-400' />
    ) : sortOption === 'Amount' ? (
      <IconAmount className='w-5 h-5 text-green-500 dark:text-green-400' />
    ) : sortOption === 'Creation' ? (
      <IconCalendar className='w-5 h-5 text-purple-500 dark:text-purple-400' />
    ) : (
      <IconStar className='w-5 h-5 text-yellow-500 dark:text-yellow-400' />
    )

  return (
    <button
      onClick={onToggle}
      className='w-8 h-8 grid place-items-center rounded-full bg-white text-black 
                 dark:bg-zinc-800 dark:text-zinc-100 shadow 
                 hover:scale-110 transition-transform duration-150'
      title={`Sort by ${sortOption} (${
        sortDirection === 'asc' ? 'ascending' : 'descending'
      })`}
    >
      <span className='relative inline-grid place-items-center'>
        {base}
        <span className='absolute -bottom-1 -right-1 rounded-full bg-white/90 dark:bg-zinc-900/90 p-px'>
          {arrow}
        </span>
      </span>
    </button>
  )
}
