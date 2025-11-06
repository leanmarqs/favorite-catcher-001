// src/schemas/Favicon.ts

export interface FaviconItem {
  key: string // identificador único
  name: string // nome do site / app
  public: boolean // 1 is public
  src: string // URL da imagem (favicon)
  bgClass: string // classe de fundo (tailwind)
  imgClass?: string // classe opcional pra imagem
  url?: string // URL do site associado
  description?: string // descrição do site
  createdAt?: number // timestamp de criação
  clicks?: number // contador de relevância futura
  lastTimeClicked?: number // timestamp do último uso
}
