import SearchBar from './SearchBar'
import MenuSuspenso, {
  type SortOption,
  type SortDirection,
} from './MenuSuspenso'

interface HeaderSectionProps {
  sortOption: SortOption
  sortDirection: SortDirection
  onSortChange: (option: SortOption) => void
  onDirectionToggle: (next: SortDirection) => void
}

export default function HeaderSection({
  sortOption,
  sortDirection,
  onSortChange,
  onDirectionToggle,
}: HeaderSectionProps) {
  return (
    <header
      className='
        fixed top-0 left-0 w-full z-20
        bg-background/80 backdrop-blur-xs
        border-b border-border shadow-sm
      '
    >
      <div className='mx-auto w-full max-w-4xl p-4 space-y-4'>
        <SearchBar onSearch={(query) => console.log('Searching for', query)} />
        <MenuSuspenso
          sortOption={sortOption}
          sortDirection={sortDirection}
          onSortChange={onSortChange}
          onDirectionToggle={onDirectionToggle}
        />
      </div>
    </header>
  )
}
