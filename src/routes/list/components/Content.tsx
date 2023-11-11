import { css } from '@mui/material'
import { useSearchValue } from '../contexts/search'
import List from './List'

export default function Content() {
  const search = useSearchValue()

  return (
    <div css={styles.root}>
      {/* Display search list */}
      {!!search && (
        <List
          title="Search"
          variables={{
            where: {
              _or: [
                { first_name: { _ilike: `%${search}%` } },
                { last_name: { _ilike: `%${search}%` } },
              ],
            },
          }}
        />
      )}

      {/* Display contacts list */}
      {!search && (
        <>
          <List title="Favorite Contacts" />
          <List title="Contacts" />
        </>
      )}
    </div>
  )
}

const styles = {
  root: css({
    padding: 16,
    display: 'flex',
    flexDirection: 'column',
  }),
}
