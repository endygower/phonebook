import { Button, Typography, css } from '@mui/material'

import ContactCard from './Contact'
import { Order_By, useContactsQuery } from '~/generated/graphql'

interface Props {
  title: string
}

export default function ContactList(props: Props) {
  const { loading, error, data } = useContactsQuery({
    variables: {
      limit: 10,
      order_by: { first_name: Order_By.Asc },
    },
  })

  if (loading) return <Typography>Loading...</Typography>
  if (error) return <Typography>Something went wrong...</Typography>

  return (
    <>
      <Typography variant="h6" gutterBottom>
        {props.title}
      </Typography>
      <div css={styles.list}>
        {data?.contact.map((item) => (
          <ContactCard key={item.id} contact={item} isFavorite={true} />
        ))}
      </div>
      <Button variant="text" css={styles.button}>
        Load more
      </Button>
    </>
  )
}

const styles = {
  list: css({
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  }),
  button: css({
    alignSelf: 'center',
    marginTop: 12,
  }),
}
