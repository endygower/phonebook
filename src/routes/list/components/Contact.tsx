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

interface Props {
  contact: {
    id: number
    firstName: string
    lastName: string
    phones: string[]
  }
  isFavorite: boolean
}

export default function ContactCard(props: Props) {
  const { contact, isFavorite } = props

  const fullname = `${contact.firstName} ${contact.lastName}`

  return (
    <Card>
      <CardContent>
        <Typography fontWeight={700}>{fullname}</Typography>
        <Typography variant="body2">{contact.phones.join(', ')}</Typography>
      </CardContent>

      <CardActions css={styles.actions}>
        {!isFavorite && (
          <IconButton
            aria-label={`Add ${fullname} to favorite`}
            color="warning"
          >
            <StarOutlineRoundedIcon />
          </IconButton>
        )}
        {isFavorite && (
          <IconButton
            aria-label={`Remove ${fullname} from favorite`}
            color="warning"
          >
            <StarRateRoundedIcon />
          </IconButton>
        )}

        <IconButton
          component={Link}
          to={`/edit/${contact.id}`}
          aria-label={`Edit ${fullname}`}
          color="primary"
        >
          <EditRoundedIcon />
        </IconButton>

        <IconButton
          aria-label={`Delete ${fullname}`}
          color="error"
        >
          <DeleteRoundedIcon />
        </IconButton>
      </CardActions>
    </Card>
  )
}

const styles = {
  actions: css({
    justifyContent: 'flex-end',
  }),
}
