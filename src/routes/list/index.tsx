import { css } from '@mui/material'

import Header from './components/Header'
import Search from './components/Search'
import ContactList from './components/List'

export function Component() {
  return (
    <>
      <Header />
      <Search />

      <div css={styles.content}>
        <ContactList title="Favorite Contacts" />
        <ContactList title="Contacts" />
      </div>
    </>
  )
}

const styles = {
  content: css({
    padding: 16,
    display: 'flex',
    flexDirection: 'column',
  }),
}
