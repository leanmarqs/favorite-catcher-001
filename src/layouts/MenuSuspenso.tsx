import { useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import { motion } from 'framer-motion'
import { LocalDataCollection } from '@/utils/LocalDataCollection'

export type SortOption = 'A-Z' | 'Amount' | 'Creation' | 'Relevant'
export type SortDirection = 'asc' | 'desc'

interface MenuSuspensoProps {
  // (opcional) controle externo
  sortOption?: SortOption
  sortDirection?: SortDirection
  onSortChange?: (option: SortOption) => void
  onDirectionToggle?: (next: SortDirection) => void
}

// === ICONES BASE ===
function IconAZ(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      {...props}
    >
      <path d='M4 7h8M4 12h6M4 17h4' />
      <path d='M16 6v12l4-4' />
    </svg>
  )
}
function IconAmount(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      {...props}
    >
      <circle cx='6' cy='6' r='2' />
      <circle cx='6' cy='12' r='2' />
      <circle cx='6' cy='18' r='2' />
      <path d='M12 6h6M12 12h8M12 18h4' />
    </svg>
  )
}
function IconCalendar(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      {...props}
    >
      <rect x='3' y='4' width='18' height='18' rx='2' ry='2' />
      <line x1='16' y1='2' x2='16' y2='6' />
      <line x1='8' y1='2' x2='8' y2='6' />
      <line x1='3' y1='10' x2='21' y2='10' />
    </svg>
  )
}
function IconStar(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      {...props}
    >
      <path d='M12 3l2.9 5.9 6.5.9-4.7 4.6 1.1 6.4L12 18.8 6.2 20.8 7.3 14 2.6 9.8l6.5-.9L12 3z' />
    </svg>
  )
}

// === ICONES AUXILIARES ===
function IconFilter(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      {...props}
    >
      <polygon points='22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3' />
    </svg>
  )
}
function IconPlus(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      {...props}
    >
      <line x1='12' y1='5' x2='12' y2='19' />
      <line x1='5' y1='12' x2='19' y2='12' />
    </svg>
  )
}
// setas pequenas para sobrepor
function ArrowUpMini(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox='0 0 24 24' fill='currentColor' {...props}>
      <path d='M12 6l5 6h-3v6H10v-6H7l5-6z' />
    </svg>
  )
}
function ArrowDownMini(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox='0 0 24 24' fill='currentColor' {...props}>
      <path d='M12 18l-5-6h3V6h4v6h3l-5 6z' />
    </svg>
  )
}

// === COMPONENTE ===
export default function MenuSuspenso({
  sortOption: controlledOption,
  sortDirection: controlledDirection,
  onSortChange,
  onDirectionToggle,
}: MenuSuspensoProps) {
  // estados internos (usados se não houver controle externo)
  const [internalOption, setInternalOption] = useState<SortOption>('A-Z')
  const [internalDir, setInternalDir] = useState<SortDirection>('asc')
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [isCreating, setIsCreating] = useState(false)
  const [collectionName, setCollectionName] = useState('')
  const [isPublic, setIsPublic] = useState(true)
  const menuRef = useRef<HTMLDivElement>(null)
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 })
  const filterButtonRef = useRef<HTMLButtonElement>(null)
  const sortOption = controlledOption ?? internalOption
  const sortDirection = controlledDirection ?? internalDir

  const toggleFilter = () => {
    if (!isFilterOpen && filterButtonRef.current) {
      const rect = filterButtonRef.current.getBoundingClientRect()
      setMenuPosition({
        top: rect.bottom + 20, // 8px abaixo do botão
        left: rect.left + rect.width / 2, // centraliza no meio
      })
    }
    setIsFilterOpen((v) => !v)
  }

  // alterna somente direção (↑/↓)
  const toggleDirection = () => {
    const next: SortDirection = sortDirection === 'asc' ? 'desc' : 'asc'
    if (onDirectionToggle) onDirectionToggle(next)
    if (controlledDirection === undefined) setInternalDir(next)
  }

  // altera o tipo (A-Z / Amount / Creation / Relevant)
  const changeOption = (opt: SortOption) => {
    if (onSortChange) onSortChange(opt)
    if (controlledOption === undefined) setInternalOption(opt)
    setIsFilterOpen(false)
  }

  // Ícone conforme tipo + seta conforme direção
  const getSortIcon = () => {
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

    // wrapper com seta sobreposta (canto inferior direito)
    return (
      <span className='relative inline-grid place-items-center'>
        {base}
        <span className='absolute -bottom-1 -right-1 rounded-full bg-white/90 dark:bg-zinc-900/90 p-px'>
          {arrow}
        </span>
      </span>
    )
  }

  // fechar dropdown ao clicar fora
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsFilterOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div
      className='relative flex justify-center items-center gap-4 mt-2'
      ref={menuRef}
    >
      {/* ➕ Criar coleção (placeholder) */}
      <button
        onClick={() => setIsCreating(true)}
        className='w-8 h-8 grid place-items-center rounded-full bg-white text-black 
                   dark:bg-zinc-800 dark:text-zinc-100 shadow 
                   hover:scale-110 transition-transform duration-150'
        aria-label='Create new collection'
      >
        <IconPlus className='w-5 h-5' />
      </button>

      {/* 🔤 Sort (só alterna direção) */}
      <button
        onClick={toggleDirection}
        className='w-8 h-8 grid place-items-center rounded-full bg-white text-black 
                   dark:bg-zinc-800 dark:text-zinc-100 shadow 
                   hover:scale-110 transition-transform duration-150'
        aria-label='Toggle sort direction'
        title={`Sort by ${sortOption} (${
          sortDirection === 'asc' ? 'ascending' : 'descending'
        })`}
      >
        {getSortIcon()}
      </button>

      {/* ⚙️ Filter (escolhe o tipo) */}
      <div className='relative'>
        <button
          ref={filterButtonRef}
          onClick={toggleFilter}
          className='w-8 h-8 grid place-items-center rounded-full bg-white text-black 
                     dark:bg-zinc-800 dark:text-zinc-100 shadow 
                     hover:scale-110 transition-transform duration-150'
          aria-label='Filter collections'
          title='Choose sort field'
        >
          <IconFilter className='w-5 h-5' />
        </button>

        {isFilterOpen &&
          ReactDOM.createPortal(
            <div
              className='fixed inset-0 z-[9998]'
              onMouseDown={() => setIsFilterOpen(false)} // fecha ao clicar fora
            >
              <div
                onMouseDown={(e) => e.stopPropagation()} // impede que o overlay feche
                className='absolute bg-white dark:bg-zinc-800 text-black dark:text-zinc-100 
                   rounded-2xl shadow-xl border border-gray-200 dark:border-zinc-700 
                   w-56 p-2 z-[9999] backdrop-blur-sm'
                style={{
                  top: `${menuPosition.top}px`,
                  left: `${menuPosition.left}px`,
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
                        e.preventDefault() // evita blur do botão e perda do foco
                        changeOption(item) // muda a opção
                        setIsFilterOpen(false) // fecha o menu
                      }}
                      className={`px-3 py-2 rounded-full cursor-pointer text-center transition-all
                            hover:bg-gray-100 dark:hover:bg-zinc-700 hover:shadow-md 
                            hover:-translate-y-0.5 ${
                              sortOption === item
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

      {/* 🪄 Modal "Create new collection" (idêntico ao seu; mantive sem backend) */}
      {isCreating &&
        ReactDOM.createPortal(
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.12 }}
            className='fixed inset-0 bg-black/50 backdrop-blur-sm 
                       flex items-center justify-center z-9999'
            onClick={() => setIsCreating(false)}
          >
            <div
              className='bg-white dark:bg-zinc-900 text-black dark:text-zinc-100 
                         rounded-3xl p-6 w-80 shadow-2xl relative'
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className='text-lg font-semibold mb-4 text-center'>
                Create New Collection
              </h2>
              <input
                type='text'
                placeholder='Collection name'
                value={collectionName}
                onChange={(e) => setCollectionName(e.target.value)}
                className='w-full rounded-full border border-input bg-background 
                           px-4 py-2 text-sm shadow-sm outline-none 
                           focus-visible:ring-2 focus-visible:ring-blue-500 
                           dark:bg-zinc-800'
              />

              <div className='flex items-center px-4 mt-4'>
                <input
                  type='checkbox'
                  checked={isPublic}
                  onChange={(e) => setIsPublic(e.target.checked)}
                  className='w-4 h-4 accent-blue-600'
                />
                <label className='text-sm font-medium text-gray-700 dark:text-gray-400 ml-2'>
                  Is public
                </label>
              </div>

              <div className='flex justify-end mt-4 gap-2'>
                <button
                  onClick={() => setIsCreating(false)}
                  className='px-4 py-2 rounded-full text-sm bg-gray-200 
                             dark:bg-zinc-700 hover:opacity-80'
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    if (!collectionName.trim()) return
                    LocalDataCollection.create(collectionName, isPublic)
                    setIsCreating(false)
                    setCollectionName('')
                    window.dispatchEvent(new Event('collectionsUpdated'))
                  }}
                  className='px-4 py-2 rounded-full text-sm bg-blue-600 
                             text-white hover:opacity-90'
                >
                  Create
                </button>
              </div>
            </div>
          </motion.div>,
          document.body
        )}
    </div>
  )
}
