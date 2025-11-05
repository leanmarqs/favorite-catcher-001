import { useEffect, useState } from 'react'
import { LocalData } from '@/utils/LocalData'
import Collection from '@/layouts/Collection'
import HeaderSection from '@/layouts/HeaderSection'
import { allMockCollections } from '@/data/collectionsData'

function Home() {
  const [collections, setCollections] = useState(LocalData.getAll())

  useEffect(() => {
    const updateCollections = () => setCollections(LocalData.getAll())
    window.addEventListener('collectionsUpdated', updateCollections)
    return () =>
      window.removeEventListener('collectionsUpdated', updateCollections)
  }, [])

  return (
    <main className='min-h-screen p-4 dark:bg-zinc-900 dark:text-zinc-100'>
      <div>
        <HeaderSection />
      </div>

      <div className='w-full px-4 pt-40 space-y-6'>
        {/*{allMockCollections.map(({ title, items }) => (
          <Collection key={title} title={title} items={items} />
        ))} */}
        {collections.map((col) => (
          <Collection id={col.id} title={col.title} items={col.items} />
        ))}
      </div>
    </main>
  )
}

export default Home
