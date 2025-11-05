import { enUS } from './en-US'
import { ptBR } from './pt-BR'
import type { Messages } from './en-US'

export const messages: Record<'en-US' | 'pt-BR', Messages> = {
  'en-US': enUS,
  'pt-BR': ptBR,
}
