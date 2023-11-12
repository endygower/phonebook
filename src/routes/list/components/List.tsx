import { useState } from 'react'
import {
  useContactsQuery,
  ContactsQueryVariables,
  Order_By,
} from '~/generated/graphql'

import { css, useMediaQuery, Button, Typography } from '@mui/material'

import ContactCard from './Contact'

interface Props {
  title: string
  variables?: ContactsQueryVariables
}

const NUMBER_OF_ITEMS = 10

export default function List(props: Props) {
  const { title } = props

  return (
    <div css={styles.root}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Inner {...props} />
    </div>
  )
}

function Inner(props: Props) {
  const { variables } = props

  const [reachingEnd, setReachingEnd] = useState(false)
  const isDesktopView = useMediaQuery('(min-width:900px)')

  const { loading, error, data, fetchMore } = useContactsQuery({
    variables: {
      limit: NUMBER_OF_ITEMS,
      order_by: { first_name: Order_By.Asc },
      ...variables,
    },
  })

  async function loadMore() {
    if (!data) return

    const res = await fetchMore({
      variables: { offset: data.contact.length },
    })

    setReachingEnd(res.data.contact.length < NUMBER_OF_ITEMS)
  }

  if (loading) return <Typography>Loading...</Typography>
  if (error) return <Typography>Something went wrong...</Typography>
  if (!data || !data.contact.length) return <Typography>No data</Typography>

  return (
    <>
      <div css={[isDesktopView ? styles.desktopList : styles.list]}>
        {data.contact.map((item) => (
          <ContactCard key={item.id} contact={item} />
        ))}
      </div>
      {!reachingEnd && (
        <Button variant="text" css={styles.button} onClick={loadMore}>
          Load more...
        </Button>
      )}
    </>
  )
}

const styles = {
  root: css({
    display: 'flex',
    flexDirection: 'column',
  }),
  list: css({
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  }),
  desktopList: css({
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 12,
  }),
  button: css({
    alignSelf: 'center',
    marginTop: 12,
  }),
}
