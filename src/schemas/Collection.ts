import type { FaviconItem } from './Favicon'

export interface Collection {
  id: string
  title: string
  createdAt: number // timestamp
  amount: number // número de favicons
  relevance: number // relevância (0–1 ou soma)
  favicons: FaviconItem[] // lista de favicons
}
