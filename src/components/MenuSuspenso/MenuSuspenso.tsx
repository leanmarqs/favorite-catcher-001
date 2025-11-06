// src/components/MenuSuspenso/MenuSuspenso.tsx
import { useState } from 'react'
import { SortButton } from './SortButton'
import { FilterButton } from './FilterButton'
import { CreateCollectionButton } from './CreateCollectionButton'
import { EditButton } from './EditButton'

export type SortOption = 'A-Z' | 'Amount' | 'Creation' | 'Relevant'
export type SortDirection = 'asc' | 'desc'

interface MenuSuspensoProps {
  sortOption?: SortOption
  sortDirection?: SortDirection
  onSortChange?: (option: SortOption) => void
  onDirectionToggle?: (next: SortDirection) => void
}

export default function MenuSuspenso({
  sortOption: controlledOption,
  sortDirection: controlledDirection,
  onSortChange,
  onDirectionToggle,
}: MenuSuspensoProps) {
  const [internalOption, setInternalOption] = useState<SortOption>('A-Z')
  const [internalDir, setInternalDir] = useState<SortDirection>('asc')

  const sortOption = controlledOption ?? internalOption
  const sortDirection = controlledDirection ?? internalDir

  const toggleDirection = () => {
    const next = sortDirection === 'asc' ? 'desc' : 'asc'
    onDirectionToggle?.(next)
    if (!controlledDirection) setInternalDir(next)
  }

  const changeOption = (opt: SortOption) => {
    onSortChange?.(opt)
    if (!controlledOption) setInternalOption(opt)
  }

  return (
    <div className='flex justify-center items-center gap-4 mt-2'>
      <CreateCollectionButton />
      <EditButton onClick={() => console.log('Editar coleção')} />
      <SortButton
        sortOption={sortOption}
        sortDirection={sortDirection}
        onToggle={toggleDirection}
      />
      <FilterButton current={sortOption} onChange={changeOption} />
    </div>
  )
}
