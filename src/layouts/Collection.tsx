import { useState } from 'react'
import { motion } from 'framer-motion'
import Favicon from './Favicon'
import type { FaviconItem } from './Favicon'

const leftArrowPng = new URL(
  '../assets/favicons/left-arrow.png',
  import.meta.url
).href
const rightArrowPng = new URL(
  '../assets/favicons/right-arrow.png',
  import.meta.url
).href

interface CollectionProps {
  id: string
  title: string
  items: FaviconItem[]
}

export default function Collection({ id, title, items }: CollectionProps) {
  const [index, setIndex] = useState(0)

  const total = items.length
  const maxVisible = 10 // limite visual na tela
  const visibleCount = Math.min(total, maxVisible)
  const hasPagination = total > maxVisible
  const step = 5 // quantos ícones deslizam por clique

  const move = (direction: number) => {
    if (!hasPagination) return
    setIndex((prev) => (prev + direction * step + total) % total)
  }

  const visible = hasPagination
    ? Array.from({ length: maxVisible }, (_, i) => items[(index + i) % total])
    : items

  return (
    <section className='space-y-3 w-full caret-transparent'>
      <h2 className='text-lg font-semibold text-center'>{title}</h2>

      <div className='mx-auto w-full flex items-center justify-center gap-3'>
        {/* seta esquerda */}
        <motion.button
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 300, damping: 18 }}
          type='button'
          onClick={() => move(-1)}
          disabled={!hasPagination}
          aria-label='Anterior'
          className='grid place-items-center w-9 h-9 rounded-full text-white shadow 
             focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring 
             disabled:opacity-30'
        >
          <img src={leftArrowPng} alt='Anterior' className='h-10 w-auto' />
        </motion.button>

        {/* container em pílula */}
        <div className='relative flex-1 max-w-full rounded-full border border-border p-6 min-h-[100px] overflow-visible shadow-sm bg-background/60 backdrop-blur-sm'>
          <motion.div
            key={`${index}-${visibleCount}`}
            initial={{ x: 0 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.5 }}
            className='flex justify-center gap-25'
          >
            {visible.map((item) => (
              <motion.div
                key={item.key}
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -50, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 180, damping: 22 }}
              >
                <Favicon key={item.key} item={item} collectionId={id} />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* seta direita */}
        <motion.button
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 300, damping: 18 }}
          type='button'
          onClick={() => move(1)}
          disabled={!hasPagination}
          aria-label='Próximo'
          className='grid place-items-center w-9 h-9 rounded-full text-white shadow 
             focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring 
             disabled:opacity-30'
        >
          <img src={rightArrowPng} alt='Próximo' className='h-10 w-auto' />
        </motion.button>
      </div>
    </section>
  )
}
