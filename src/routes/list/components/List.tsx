import { Button, Typography, css, useMediaQuery } from '@mui/material'

import ContactCard from './Contact'
import {
  Order_By,
  useContactsQuery,
  ContactsQueryVariables,
} from '~/generated/graphql'

interface Props {
  title: string
  variables?: ContactsQueryVariables
}

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

  const isDesktopView = useMediaQuery('(min-width:900px)')

  const { loading, error, data } = useContactsQuery({
    variables: {
      order_by: { first_name: Order_By.Asc },
      ...variables,
    },
  })

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
      <Button variant="text" css={styles.button}>
        Load more...
      </Button>
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
