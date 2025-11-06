// src/utils/LocalDataFavicon.ts
import type { FaviconItem } from '@/schemas/Favicon'
import { LocalDataCollection } from './LocalDataCollection'

/** 🧱 CRUD para Favicons */
export const LocalDataFavicon = {
  /** ➕ Adiciona um favicon em uma ou mais coleções */
  addToCollections(favicon: FaviconItem, collectionIds: string[]) {
    const collections = LocalDataCollection.getAll()

    const updated = collections.map((col) => {
      if (collectionIds.includes(col.id)) {
        const exists = col.favicons.some((f) => f.key === favicon.key)
        if (!exists) {
          const newFavicons = [...col.favicons, favicon]
          return {
            ...col,
            favicons: newFavicons,
            amount: newFavicons.length,
          }
        }
      }
      return col
    })

    LocalDataCollection.overwrite(updated)
  },

  /** 🔍 Busca todos os favicons (de todas as coleções) */
  getAll(): FaviconItem[] {
    const collections = LocalDataCollection.getAll()
    return collections.flatMap((c) => c.favicons)
  },

  /** 🔍 Busca um favicon por key */
  getByKey(key: string): FaviconItem | undefined {
    return this.getAll().find((f) => f.key === key)
  },

  /** ✏️ Atualiza os dados de um favicon em todas as coleções */
  update(favicon: FaviconItem) {
    const collections = LocalDataCollection.getAll()

    const updated = collections.map((col) => {
      const favicons = col.favicons.map((f) =>
        f.key === favicon.key ? favicon : f
      )
      return { ...col, favicons }
    })

    LocalDataCollection.overwrite(updated)
  },

  /** ❌ Remove um favicon de todas as coleções */
  delete(key: string) {
    const collections = LocalDataCollection.getAll()

    const updated = collections.map((col) => {
      const filteredFavicons = col.favicons.filter((f) => f.key !== key)
      return {
        ...col,
        favicons: filteredFavicons,
        amount: filteredFavicons.length,
      }
    })

    LocalDataCollection.overwrite(updated)
  },
}
