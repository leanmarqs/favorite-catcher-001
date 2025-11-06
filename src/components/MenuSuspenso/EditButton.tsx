import React from 'react'
import { IconEdit } from './icons'

interface EditButtonProps {
  onClick?: () => void
}

export function EditButton({ onClick }: EditButtonProps) {
  return (
    <button
      onClick={onClick}
      className='w-8 h-8 grid place-items-center rounded-full 
                 bg-white text-black dark:bg-zinc-800 dark:text-zinc-100 
                 shadow hover:scale-110 transition-transform duration-150'
      aria-label='Edit collection'
      title='Edit collection'
    >
      <IconEdit className='w-5 h-5 text-blue-500 dark:text-blue-400' />
    </button>
  )
}
