// src/utils/LocalDataCollection.ts
import type { Collection } from '@/schemas/Collection'

const STORAGE_KEY = 'collections'

// Tipos auxiliares
export type SortFilter = 'A-Z' | 'Amount' | 'Creation' | 'Relevant'
export type SortDirection = 'asc' | 'desc'

/** 🔹 Função utilitária para ler todas as coleções */
function load(): Collection[] {
  if (typeof window === 'undefined') return []
  const data = localStorage.getItem(STORAGE_KEY)
  return data ? JSON.parse(data) : []
}

/** 🔹 Função utilitária para salvar todas as coleções */
function save(collections: Collection[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(collections))
}

/** 🧠 Função utilitária de ordenação */
function sortCollections(
  collections: Collection[],
  filter: SortFilter,
  direction: SortDirection
): Collection[] {
  const sorted = [...collections]

  sorted.sort((a, b) => {
    let result = 0

    switch (filter) {
      case 'A-Z':
        result = a.title.localeCompare(b.title)
        break

      case 'Amount':
        result = a.amount - b.amount
        break

      case 'Creation':
        result = a.createdAt - b.createdAt
        break

      case 'Relevant':
        result = a.relevance - b.relevance
        break
    }

    return direction === 'asc' ? result : -result
  })

  return sorted
}

/** 🧱 CRUD + Ordenação */
export const LocalDataCollection = {
  /** ➕ Cria uma nova coleção */
  create(title: string): Collection {
    const collections = load()
    const newCollection: Collection = {
      id: crypto.randomUUID(),
      title,
      createdAt: Date.now(),
      amount: 0,
      relevance: 1,
      favicons: [],
    }

    collections.push(newCollection)
    save(collections)
    return newCollection
  },

  /** 🔍 Retorna todas as coleções */
  getAll(): Collection[] {
    return load()
  },

  /** 🔍 Retorna todas ordenadas */
  getAllSorted(filter: SortFilter, direction: SortDirection): Collection[] {
    const collections = load()
    return sortCollections(collections, filter, direction)
  },

  /** 🔍 Busca uma coleção específica por ID */
  getById(id: string): Collection | undefined {
    return load().find((c) => c.id === id)
  },

  /** ✏️ Atualiza uma coleção existente */
  update(updated: Collection): void {
    const collections = load()
    const index = collections.findIndex((c) => c.id === updated.id)
    if (index !== -1) {
      collections[index] = updated
      save(collections)
    }
  },

  /** ❌ Remove uma coleção pelo ID */
  delete(id: string): void {
    const filtered = load().filter((c) => c.id !== id)
    save(filtered)
  },

  /** 🔹 Substitui todas as coleções */
  overwrite(collections: Collection[]): void {
    save(collections)
  },
}
