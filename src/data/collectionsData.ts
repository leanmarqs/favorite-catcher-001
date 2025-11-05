import type { FaviconItem } from '@/layouts/Favicon'

/**
 * Função utilitária para gerar coleções mock.
 * - @param name Nome base da coleção
 * - @param count Quantidade de itens
 */
function createMockCollection(name: string, count: number): FaviconItem[] {
  return Array.from({ length: count }).map((_, i) => ({
    key: `${name.toLowerCase()}-${i}`,
    name: `${name} App ${i + 1}`,
    src: `https://cdn.simpleicons.org/appstore/007AFF`,
    bgClass: i % 2 === 0 ? 'bg-[#E0E0E0]' : 'bg-[#C0C0C0]',
  }))
}

// ===== 10 Coleções Mock com tamanhos variados =====
export const mockCollection1 = createMockCollection('Mock A', 3)
export const mockCollection2 = createMockCollection('Mock B', 7)
export const mockCollection3 = createMockCollection('Mock C', 1)
export const mockCollection4 = createMockCollection('Mock D', 10)
export const mockCollection5 = createMockCollection('Mock E', 5)
export const mockCollection6 = createMockCollection('Mock F', 15)
export const mockCollection7 = createMockCollection('Mock G', 20)
export const mockCollection8 = createMockCollection('Mock H', 25)
export const mockCollection9 = createMockCollection('Mock I', 12)
export const mockCollection10 = createMockCollection('Mock J', 30)

// 🔹 Array com todas as coleções (útil para mapear dinamicamente na Home)
export const allMockCollections = [
  { title: 'Mock A', items: mockCollection1 },
  { title: 'Mock B', items: mockCollection2 },
  { title: 'Mock C', items: mockCollection3 },
  { title: 'Mock D', items: mockCollection4 },
  { title: 'Mock E', items: mockCollection5 },
  { title: 'Mock F', items: mockCollection6 },
  { title: 'Mock G', items: mockCollection7 },
  { title: 'Mock H', items: mockCollection8 },
  { title: 'Mock I', items: mockCollection9 },
  { title: 'Mock J', items: mockCollection10 },
]
