import { useEffect, useState } from 'react'
import HeaderSection from '../layouts/HeaderSection'
import { LocalDataCollection } from '@/utils/LocalDataCollection'
import CollectionLayout from '@/layouts/CollectionLayout'
import type { Collection } from '@/schemas/Collection'
import type { SortOption, SortDirection } from '@/layouts/MenuSuspenso'

export default function Home() {
  const [collections, setCollections] = useState<Collection[]>([])
  const [sortOption, setSortOption] = useState<SortOption>('A-Z')
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc')

  // Carrega ordenado inicialmente
  useEffect(() => {
    setCollections(LocalDataCollection.getAllSorted(sortOption, sortDirection))
  }, [])

  // Recarrega quando algo mudar no storage (ex.: criar coleção)
  useEffect(() => {
    const onUpdate = () => {
      setCollections(
        LocalDataCollection.getAllSorted(sortOption, sortDirection)
      )
    }
    window.addEventListener('collectionsUpdated', onUpdate)
    return () => window.removeEventListener('collectionsUpdated', onUpdate)
  }, [sortOption, sortDirection])

  // Sempre que sortOption/direction mudar, reordena
  useEffect(() => {
    setCollections(LocalDataCollection.getAllSorted(sortOption, sortDirection))
  }, [sortOption, sortDirection])

  return (
    <main className='min-h-screen p-4 dark:bg-zinc-900 dark:text-zinc-100'>
      <HeaderSection
        sortOption={sortOption}
        sortDirection={sortDirection}
        onSortChange={(opt) => {
          // ao trocar de campo, resetamos para asc
          setSortOption(opt)
          setSortDirection('asc')
        }}
        onDirectionToggle={(dir) => setSortDirection(dir)}
      />

      <div className='w-full px-4 pt-40 space-y-6'>
        {collections.length > 0 ? (
          collections.map((c) => (
            <CollectionLayout
              key={c.id}
              id={c.id}
              title={c.title}
              items={c.favicons || []}
            />
          ))
        ) : (
          <p className='text-center text-gray-500 dark:text-gray-400'>
            No collections created yet.
          </p>
        )}
      </div>
    </main>
  )
}
