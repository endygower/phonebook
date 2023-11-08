import { Button, Typography, css } from '@mui/material'

import ContactCard from './Contact'

interface Props {
  title: string
}

const mock = [
  {
    id: 1,
    firstName: 'lorem',
    lastName: 'ipsum',
    phones: ['111122223333', '222233334444'],
  },
]

export default function ContactList(props: Props) {
  return (
    <>
      <Typography variant="h6" gutterBottom>
        {props.title}
      </Typography>
      <div css={styles.list}>
        {mock.map((item) => (
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
