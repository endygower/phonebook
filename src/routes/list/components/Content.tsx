import { css } from '@mui/material'
import { useSearchValue } from '../contexts/search'
import List from './List'
import { useFavorite } from '../contexts/favorite'

export default function Content() {
  const search = useSearchValue()
  const favorite = useFavorite()

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
          <List
            title="Favorite Contacts"
            variables={{ where: { id: { _in: favorite.values } } }}
          />
          <List
            title="Contacts"
            variables={{ where: { id: { _nin: favorite.values } } }}
          />
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
    gap: 16
  }),
}
