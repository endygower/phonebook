import Content from './components/Content'
import Header from './components/Header'
import Search from './components/Search'
import { FavoriteProvider } from './contexts/favorite'
import { SearchProvider } from './contexts/search'

export function Component() {
  return (
    <SearchProvider>
      <FavoriteProvider>
        <Header />
        <Search />
        <Content />
      </FavoriteProvider>
    </SearchProvider>
  )
}
