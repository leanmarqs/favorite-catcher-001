// src/components/MenuSuspenso/CreateCollectionButton.tsx
import { useState } from 'react'
import ReactDOM from 'react-dom'
import { motion } from 'framer-motion'
import { IconPlus } from './icons'
import { LocalDataCollection } from '@/utils/LocalDataCollection'

export function CreateCollectionButton() {
  const [isCreating, setIsCreating] = useState(false)
  const [collectionName, setCollectionName] = useState('')
  const [isPublic, setIsPublic] = useState(true)

  return (
    <>
      <button
        onClick={() => setIsCreating(true)}
        className='w-8 h-8 grid place-items-center rounded-full bg-white text-black 
                   dark:bg-zinc-800 dark:text-zinc-100 shadow 
                   hover:scale-110 transition-transform duration-150'
        aria-label='Create new collection'
      >
        <IconPlus className='w-5 h-5' />
      </button>

      {isCreating &&
        ReactDOM.createPortal(
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.12 }}
            className='fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[9999]'
            onClick={() => setIsCreating(false)}
          >
            <div
              className='bg-white dark:bg-zinc-900 text-black dark:text-zinc-100 rounded-3xl p-6 w-80 shadow-2xl relative'
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
                  className='px-4 py-2 rounded-full text-sm bg-gray-200 dark:bg-zinc-700 hover:opacity-80'
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
                  className='px-4 py-2 rounded-full text-sm bg-blue-600 text-white hover:opacity-90'
                >
                  Create
                </button>
              </div>
            </div>
          </motion.div>,
          document.body
        )}
    </>
  )
}
