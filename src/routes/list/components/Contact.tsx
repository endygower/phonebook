import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded'
import EditRoundedIcon from '@mui/icons-material/EditRounded'
import StarOutlineRoundedIcon from '@mui/icons-material/StarOutlineRounded'
import StarRateRoundedIcon from '@mui/icons-material/StarRateRounded'
import {
  Card,
  CardActions,
  CardContent,
  IconButton,
  Typography,
  css,
} from '@mui/material'

import { Link } from 'react-router-dom'
import { ContactFragment, useDeleteContactMutation } from '~/generated/graphql'

interface Props {
  contact: ContactFragment
  isFavorite: boolean
}

export default function ContactCard(props: Props) {
  const { contact, isFavorite } = props
  const fullname = `${contact.first_name} ${contact.last_name}`

  const [deleteContact, { loading }] = useDeleteContactMutation({
    variables: { id: contact.id },
    update(cache, { data }) {
      if (!data?.delete_contact_by_pk) return

      cache.evict({ id: cache.identify(data.delete_contact_by_pk) })
      cache.gc()
    },
  })

  return (
    <Card css={styles.root}>
      <CardContent>
        <Typography fontWeight={700}>{fullname}</Typography>
        <Typography variant="body2">
          {contact.phones.map((phone) => phone.number).join(', ')}
        </Typography>
      </CardContent>

      <CardActions css={styles.actions}>
        {!isFavorite && (
          <IconButton
            aria-label={`Add ${fullname} to favorite`}
            color="warning"
            disabled={loading}
          >
            <StarOutlineRoundedIcon />
          </IconButton>
        )}
        {isFavorite && (
          <IconButton
            aria-label={`Remove ${fullname} from favorite`}
            color="warning"
            disabled={loading}
          >
            <StarRateRoundedIcon />
          </IconButton>
        )}

        <IconButton
          component={Link}
          to={`/edit/${contact.id}`}
          aria-label={`Edit ${fullname}`}
          color="primary"
          disabled={loading}
        >
          <EditRoundedIcon />
        </IconButton>

        <IconButton
          aria-label={`Delete ${fullname}`}
          color="error"
          disabled={loading}
          onClick={() => deleteContact()}
        >
          <DeleteRoundedIcon />
        </IconButton>
      </CardActions>
    </Card>
  )
}

const styles = {
  root: css({
    display: 'flex',
    justifyContent: 'space-between',
  }),
  actions: css({
    justifyContent: 'flex-end',
  }),
}
