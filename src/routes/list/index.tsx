import Content from './components/Content'
import Header from './components/Header'
import Search from './components/Search'
import { SearchProvider } from './contexts/search'

export function Component() {
  return (
    <SearchProvider>
      <Header />
      <Search />
      <Content />
    </SearchProvider>
  )
}
