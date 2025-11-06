import { useState } from 'react'
import { Label } from '@/components/ui/label'
import ReactDOM from 'react-dom'
import { LocalDataFavicon } from '@/utils/LocalDataFavicon'
import { LocalDataCollection } from '@/utils/LocalDataCollection'
import mockFavicon from '@/assets/favicons/mock-favicon.svg' // ícone padrão (adicione na pasta /assets)
import { motion } from 'framer-motion'
import { type FaviconItem } from '@/schemas/Favicon'
interface SearchBarProps {
  onSearch: (query: string) => void
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [selectedCollections, setSelectedCollections] = useState<string[]>([])
  const [isSelectOpen, setIsSelectOpen] = useState(false)
  const [collections, setCollections] = useState(LocalDataCollection.getAll())
  const [url, setUrl] = useState('')

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    handleSearch(query)
  }

  const handleInsert = async () => {
    if (!selectedCollections.length || !url.trim()) return

    // 🔹 Busca descrição simulada (ou real no futuro)
    const description = 'Site description'

    const newFavicon: FaviconItem = {
      key: crypto.randomUUID(),
      name: title?.trim() || 'New Favorite',
      src: 'https://cdn.simpleicons.org/appstore/007AFF', // ícone padrão
      bgClass: 'bg-white',
      imgClass: 'object-contain',
      url: url.trim(),
      description,
      createdAt: Date.now(),
      clicks: 0,
      lastTimeClicked: Date.now(),
    }

    // 💾 Adiciona o favicon nas coleções selecionadas
    LocalDataFavicon.addToCollections(newFavicon, selectedCollections)

    // 🔁 Atualiza a tela
    window.dispatchEvent(new Event('collectionsUpdated'))

    // ♻️ Reseta modal e campos
    setIsModalOpen(false)
    setQuery('')
    setTitle('')
    setUrl('')
  }

  const toggleCollection = (id: string) => {
    setSelectedCollections((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    )
  }

  const handleOpenSelect = () => {
    setCollections(LocalDataCollection.getAll())
    if (!selectedCollections.length && collections.length > 0) {
      const last = [...collections].sort((a, b) => b.createdAt - a.createdAt)[0]
      setSelectedCollections([last.id])
    }
    setIsSelectOpen(true)
  }

  // 🔍 Ícone de busca estilo favicon
  const IconFaviconSearch = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
      {...props}
    >
      <circle cx='11' cy='11' r='8' />
      <path d='M21 21l-4.3-4.3' />
      <path d='M11 7v4l3 3' />
    </svg>
  )

  const handleSearch = (input: string) => {
    if (!input.trim()) return

    try {
      onSearch(input)
    } catch {
      console.warn('⚠ onSearch not implemented in parent yet.')
    }

    setTitle(input)
    setIsModalOpen(true)
  }

  return (
    <>
      {/* 🔍 Search Bar */}
      <div className='mx-auto w-full max-w-2xl pt-6'>
        <form onSubmit={onSubmit} className='relative flex items-center gap-2'>
          <Label htmlFor='search' className='sr-only'>
            Add new favorite
          </Label>

          {/* Campo de busca */}
          <div className='relative flex-1'>
            <svg
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              aria-hidden='true'
              className='absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none'
            >
              <circle cx='11' cy='11' r='8' />
              <path d='m21 21-3.6-3.6' />
            </svg>

            <input
              id='search'
              type='text'
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder='Enter a URL or company name...'
              className='w-full rounded-full border border-input bg-background 
                         pl-10 pr-4 h-12 text-sm shadow-sm outline-none 
                         focus-visible:ring-2 focus-visible:ring-blue-500 
                         caret-current dark:caret-white'
            />
          </div>

          {/* 🧭 Botão de busca (abre modal também) */}
          <button
            type='button'
            onClick={() => handleSearch(query)}
            className='w-12 h-12 rounded-full bg-white dark:bg-zinc-800 
                       shadow-md flex items-center justify-center 
                       hover:shadow-lg hover:scale-105 transition-all duration-200 ease-out 
                       border border-gray-200 dark:border-zinc-700'
            aria-label='Add new favorite'
          >
            <IconFaviconSearch className='w-5 h-5 text-blue-500 dark:text-blue-400' />
          </button>
        </form>
      </div>

      {/* 🪄 Modal: Add New Favorite */}
      {isModalOpen &&
        ReactDOM.createPortal(
          <div
            className='fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[9999]'
            // onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.25 }}
              className='bg-white dark:bg-zinc-900 text-black dark:text-zinc-100 
             rounded-3xl p-6 w-96 relative
             shadow-[0_8px_30px_rgba(0,0,0,0.3)]'
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className='text-lg font-semibold mb-4 text-center'>
                Add New Favorite
              </h2>

              {/* Favicon Preview */}
              <div className='flex justify-center mb-4'>
                <div
                  className='cursor-pointer grid place-items-center w-full aspect-square max-w-16 rounded-2xl shadow-md bg-white'
                  onClick={() => {
                    const newUrl = prompt('Enter new favicon image URL:')
                    if (newUrl) {
                      const img = new Image()
                      img.src = newUrl
                      img.onload = () => {
                        setQuery((prev) => prev)
                      }
                    }
                  }}
                >
                  <img
                    src={mockFavicon}
                    alt='favicon'
                    className='w-1/2 h-1/2 transition-transform duration-200 ease-out object-contain'
                  />
                </div>
              </div>

              {/* Editable Title */}
              <div className='mb-3 text-left'>
                <label
                  htmlFor='title'
                  className='block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1 text-left ml-2'
                >
                  Title
                </label>
                <input
                  id='title'
                  type='text'
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className='w-full rounded-full border border-input bg-background 
               px-4 py-2 text-sm shadow-sm outline-none
               focus-visible:ring-2 focus-visible:ring-blue-500 
               dark:bg-zinc-800'
                />
              </div>
              {/* Editable Url */}
              <label
                htmlFor='title'
                className='block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1 text-left  ml-2'
              >
                URL
              </label>
              <input
                type='text'
                placeholder='URL do site'
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className='w-full rounded-full border border-input bg-background 
             px-4 py-2 text-sm shadow-sm outline-none mb-3
             focus-visible:ring-2 focus-visible:ring-blue-500 
             dark:bg-zinc-800'
              />

              {/* Collection Selector */}
              <label
                htmlFor='title'
                className='block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1 text-left  ml-2'
              >
                Collections
              </label>
              <div
                onClick={handleOpenSelect}
                className='w-full rounded-full border border-gray-300 
             px-4 py-2 text-sm cursor-pointer bg-gray-50 dark:bg-zinc-800
             hover:bg-gray-100 dark:hover:bg-zinc-700 transition
             whitespace-nowrap overflow-hidden text-ellipsis'
              >
                {selectedCollections.length
                  ? collections
                      .filter((col) => selectedCollections.includes(col.id))
                      .map((col) => col.title)
                      .join(', ')
                  : 'Select collections'}
              </div>

              <div className='flex justify-end mt-5 gap-2'>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className='px-4 py-2 rounded-full text-sm bg-gray-200 
                             dark:bg-zinc-700 hover:opacity-80'
                >
                  Cancel
                </button>
                <button
                  onClick={handleInsert}
                  className='px-4 py-2 rounded-full text-sm bg-blue-600 
                             text-white hover:opacity-90'
                >
                  Insert
                </button>
              </div>
            </motion.div>
          </div>,
          document.body
        )}

      {/* 📚 Modal: Select Collections */}
      {isSelectOpen &&
        ReactDOM.createPortal(
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.15 }}
            className='fixed inset-0 bg-black/50 backdrop-blur-sm 
                       flex items-center justify-center z-[9999]'
            onClick={() => setIsSelectOpen(false)}
          >
            <div
              className='bg-white dark:bg-zinc-900 text-black dark:text-zinc-100 
                         rounded-3xl p-6 w-80 shadow-2xl relative'
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className='text-lg font-semibold mb-4 text-center'>
                Select Collections
              </h2>

              <ul className='space-y-2 max-h-64 overflow-y-auto'>
                {collections.map((col) => (
                  <li
                    key={col.id}
                    className='flex items-center gap-2 px-2 py-1 rounded-md hover:bg-gray-100 dark:hover:bg-zinc-800'
                  >
                    <input
                      type='checkbox'
                      checked={selectedCollections.includes(col.id)}
                      onChange={() => toggleCollection(col.id)}
                      className='accent-blue-600 w-4 h-4'
                    />
                    <span>{col.title}</span>
                  </li>
                ))}
              </ul>

              <div className='flex justify-end mt-5 gap-2'>
                <button
                  onClick={() => setIsSelectOpen(false)}
                  className='px-4 py-2 rounded-full text-sm bg-gray-200 
                             dark:bg-zinc-700 hover:opacity-80'
                >
                  Done
                </button>
              </div>
            </div>
          </motion.div>,
          document.body
        )}
    </>
  )
}
