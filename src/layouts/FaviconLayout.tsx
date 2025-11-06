'use client'

import { motion, useAnimation } from 'framer-motion'
import { useRef, useState } from 'react'
import { Trash2 } from 'lucide-react'
import { LocalDataCollection } from '../utils/LocalDataCollection'
import type { Collection } from '@/schemas/Collection'
import type { FaviconItem } from '@/schemas/Favicon' // ✅ usa o schema global

interface FaviconProps {
  item: FaviconItem
  collectionId: string
  onDelete?: (id: string) => void
}

export default function FaviconLayout({
  item,
  collectionId,
  onDelete,
}: FaviconProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [isOverTrash, setIsOverTrash] = useState(false)
  const controls = useAnimation()

  const iconRef = useRef<HTMLDivElement>(null)
  const trashRef = useRef<HTMLDivElement>(null)

  const handleDelete = () => {
    if (onDelete) {
      onDelete(item.key)
    } else {
      const all = LocalDataCollection.getAll()
      const col = all.find((c: Collection) => c.id === collectionId)
      if (col) {
        col.favicons = col.favicons.filter((i) => i.key !== item.key)
        LocalDataCollection.overwrite(all)
        window.dispatchEvent(new Event('collectionsUpdated'))
      }
    }
  }

  const checkCollision = () => {
    if (!iconRef.current || !trashRef.current) return false
    const a = iconRef.current.getBoundingClientRect()
    const b = trashRef.current.getBoundingClientRect()
    return !(
      a.right < b.left ||
      a.left > b.right ||
      a.bottom < b.top ||
      a.top > b.bottom
    )
  }

  return (
    <div className='relative group flex flex-col items-center gap-2 justify-self-center select-none'>
      {/* 🗑️ Lixeira flutuante */}
      {isDragging && (
        <motion.div
          ref={trashRef}
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: -10, scale: isOverTrash ? 1.1 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 22 }}
          className={`absolute -top-3 left-1/2 -translate-x-1/2 -translate-y-full
                      flex items-center justify-center w-10 h-10 rounded-full
                      shadow-md z-40 pointer-events-none
                      ${
                        isOverTrash
                          ? 'bg-red-600 text-white'
                          : 'bg-zinc-800 text-zinc-100'
                      }`}
          aria-hidden='true'
        >
          <Trash2 className='h-5 w-5' />
        </motion.div>
      )}

      {/* 💎 Favicon arrastável */}
      <motion.div
        ref={iconRef}
        drag
        style={{ touchAction: 'none' }}
        onDragStart={() => {
          setIsDragging(true)
          setIsOverTrash(false)
        }}
        onDrag={() => setIsOverTrash(checkCollision())}
        onDragEnd={async () => {
          const hit = checkCollision()
          setIsDragging(false)
          setIsOverTrash(false)
          if (hit) {
            await controls.start({
              scale: 0.85,
              opacity: 0,
              transition: { duration: 0.15 },
            })
            handleDelete()
          } else {
            controls.start({
              x: 0,
              y: 0,
              transition: { type: 'spring', stiffness: 260, damping: 18 },
            })
          }
        }}
        animate={controls}
        className={`relative z-50 cursor-pointer grid place-items-center w-full aspect-square max-w-16 rounded-2xl shadow-md 
                    transition-all duration-200 ease-out hover:shadow-xl hover:-translate-y-0.5 
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${item.bgClass}`}
        aria-label={item.name}
      >
        <img
          src={item.src}
          alt={item.name}
          className={`w-1/2 h-1/2 transition-transform duration-200 ease-out group-hover:scale-110 object-contain ${
            item.imgClass ?? ''
          }`}
        />
      </motion.div>

      <span className='text-xs px-2 py-1 group-hover:underline'>
        {item.name}
      </span>
    </div>
  )
}
