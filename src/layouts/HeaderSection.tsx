import SearchBar from './SearchBar'
import MenuSuspenso from './MenuSuspenso'

export default function HeaderSection() {
  return (
    <header
      className='
        fixed top-0 left-0 w-full z-20
        bg-background/80 backdrop-blur-md
        border-b border-border shadow-sm
      '
    >
      <div className='mx-auto w-full max-w-4xl p-4 space-y-4'>
        <SearchBar onSearch={(query) => console.log('Searching for', query)} />
        <MenuSuspenso />
      </div>
    </header>
  )
}
