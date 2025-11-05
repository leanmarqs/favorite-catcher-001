import { LocalData } from '@/utils/LocalData'
import { useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'

// === SVG ICONS ===
function IconSort(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
      {...props}
    >
      <path d='M3 4h13M3 10h9M3 16h5M17 4v16l4-4' />
    </svg>
  )
}

function IconFilter(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
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
      strokeLinecap='round'
      strokeLinejoin='round'
      {...props}
    >
      <line x1='12' y1='5' x2='12' y2='19' />
      <line x1='5' y1='12' x2='19' y2='12' />
    </svg>
  )
}

// === COMPONENT ===
export default function MenuSuspenso() {
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [isCreating, setIsCreating] = useState(false)
  const [collectionName, setCollectionName] = useState('')
  const menuRef = useRef<HTMLDivElement>(null)

  const toggleFilter = () => setIsFilterOpen((v) => !v)
  const handleSort = () => console.log('🔤 Sorting collections...')
  const handleCreate = () => setIsCreating(true)

  // 💾 Create and save a new collection locally
  const handleCreateCollection = () => {
    if (!collectionName.trim()) return
    const newCollection = LocalData.add(collectionName.trim())
    console.log('✅ Created new collection:', newCollection)
    setIsCreating(false)
    setCollectionName('')
    // 🔔 Notify Home to update
    window.dispatchEvent(new Event('collectionsUpdated'))
  }

  // 👇 Close filter when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
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
      {/* ➕ Create Collection Button */}
      <button
        onClick={handleCreate}
        className='w-8 h-8 grid place-items-center rounded-full bg-white text-black 
                   dark:bg-zinc-800 dark:text-zinc-100 shadow 
                   hover:scale-110 transition-transform duration-150'
        aria-label='Create new collection'
      >
        <IconPlus className='w-5 h-5' />
      </button>

      {/* 🔤 Sort Button */}
      <button
        onClick={handleSort}
        className='w-8 h-8 grid place-items-center rounded-full bg-white text-black 
                   dark:bg-zinc-800 dark:text-zinc-100 shadow 
                   hover:scale-110 transition-transform duration-150'
        aria-label='Sort collections'
      >
        <IconSort className='w-5 h-5' />
      </button>

      {/* ⚙️ Filter Button */}
      <div className='relative'>
        <button
          onClick={toggleFilter}
          className='w-8 h-8 grid place-items-center rounded-full bg-white text-black 
                     dark:bg-zinc-800 dark:text-zinc-100 shadow 
                     hover:scale-110 transition-transform duration-150'
          aria-label='Filter collections'
        >
          <IconFilter className='w-5 h-5' />
        </button>

        {/* 🌙 Filter Dropdown */}
        {isFilterOpen && (
          <div
            className='absolute top-12 left-1/2 -translate-x-1/2 
                       bg-white dark:bg-zinc-800 text-black dark:text-zinc-100 
                       rounded-2xl shadow-xl border border-gray-200 dark:border-zinc-700 
                       w-52 p-2 z-10 backdrop-blur-sm'
          >
            <ul className='space-y-1 text-sm'>
              {['A-Z', 'Z-A', 'Item count', 'Creation date', 'Relevant'].map(
                (item) => (
                  <li
                    key={item}
                    className='hover:bg-gray-100 dark:hover:bg-zinc-700 
                             hover:shadow-md hover:-translate-y-0.5 
                             transition-all px-3 py-2 rounded-full 
                             cursor-pointer text-center'
                  >
                    {item}
                  </li>
                )
              )}
            </ul>
          </div>
        )}
      </div>

      {/* 🪄 Modal: Create new collection */}
      {isCreating &&
        ReactDOM.createPortal(
          <div
            className='fixed inset-0 bg-black/50 backdrop-blur-sm 
                       flex items-center justify-center z-[9999]'
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
              <div className='flex justify-end mt-4 gap-2'>
                <button
                  onClick={() => setIsCreating(false)}
                  className='px-4 py-2 rounded-full text-sm bg-gray-200 
                             dark:bg-zinc-700 hover:opacity-80'
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateCollection}
                  className='px-4 py-2 rounded-full text-sm bg-blue-600 
                             text-white hover:opacity-90'
                >
                  Create
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  )
}
