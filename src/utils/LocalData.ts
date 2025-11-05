import type { FaviconItem } from '@/layouts/Favicon'

export interface CollectionData {
  id: string
  title: string
  items: FaviconItem[]
  createdAt: number
}

/**
 * Utilitário simples para simular um "banco de dados local"
 * com persistência no localStorage.
 */
const STORAGE_KEY = 'mock_collections'

function loadCollections(): CollectionData[] {
  if (typeof window === 'undefined') return []
  const data = localStorage.getItem(STORAGE_KEY)
  return data ? JSON.parse(data) : []
}

function saveCollections(collections: CollectionData[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(collections))
}

export const LocalData = {
  /** 🔹 Retorna todas as coleções salvas */
  getAll(): CollectionData[] {
    return loadCollections()
  },

  /** 🔹 Adiciona uma nova coleção vazia */
  add(title: string): CollectionData {
    const newCollection: CollectionData = {
      id: crypto.randomUUID(),
      title: title || 'Untitled Collection',
      items: [],
      createdAt: Date.now(),
    }
    const all = loadCollections()
    all.push(newCollection)
    saveCollections(all)
    return newCollection
  },

  /** 🔹 Adiciona um novo favicon dentro de uma ou mais coleções */
  addFaviconToCollections(favicon: FaviconItem, collectionIds: string[]) {
    const all = loadCollections()

    collectionIds.forEach((id) => {
      const index = all.findIndex((c) => c.id === id)
      if (index >= 0) {
        all[index].items.push(favicon)
      }
    })

    saveCollections(all)
  },

  /** 🔹 Substitui todas as coleções (usado em updates em massa) */
  saveAll(collections: CollectionData[]) {
    saveCollections(collections)
  },

  /** 🔹 Limpa o banco local */
  clear() {
    localStorage.removeItem(STORAGE_KEY)
  },
}

// import type { FaviconItem } from '@/layouts/Favicon'

// export interface CollectionData {
//   id: string
//   title: string
//   items: FaviconItem[]
//   createdAt: number
// }

// /**
//  * Utilitário simples para simular um "banco de dados local"
//  * com persistência no localStorage.
//  */
// const STORAGE_KEY = 'mock_collections'

// function loadCollections(): CollectionData[] {
//   if (typeof window === 'undefined') return []
//   const data = localStorage.getItem(STORAGE_KEY)
//   return data ? JSON.parse(data) : []
// }

// function saveCollections(collections: CollectionData[]) {
//   localStorage.setItem(STORAGE_KEY, JSON.stringify(collections))
// }

// export const LocalData = {
//   getAll(): CollectionData[] {
//     return loadCollections()
//   },

//   add(title: string): CollectionData {
//     const newCollection: CollectionData = {
//       id: crypto.randomUUID(),
//       title: title || 'Untitled Collection',
//       items: [], // começa vazia
//       createdAt: Date.now(),
//     }
//     const all = loadCollections()
//     all.push(newCollection)
//     saveCollections(all)
//     return newCollection
//   },

//   clear() {
//     localStorage.removeItem(STORAGE_KEY)
//   },
// }
